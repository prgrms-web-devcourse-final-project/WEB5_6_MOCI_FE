"use client";

import { useEffect, useRef, useState } from "react";
import RegisterNameForm from "./RegisterNameForm";
import RegisterPhoneForm from "./RegisterPhoneForm";
import RegisterPasswordForm from "./RegisterPasswordForm";
import { useRouter } from "next/navigation";

type RegisterUserInfo = {
  name: string;
  phone: string;
  password: string;
};

type Step = 1 | 2 | 3;

function RegisterForm() {
  const [containerHeight, setContainerHeight] = useState<string>("100%");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registerUserInfo, setRegisterUserInfo] = useState<RegisterUserInfo>({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const initialHeight = window.innerHeight; // 초기 화면 높이 저장

    const updateContainerHeight = () => {
      if (window.visualViewport && wrapperRef.current) {
        // 현재 요소의 위치 정보를 가져옴
        const rect = wrapperRef.current.getBoundingClientRect();

        // visualViewport 높이에서 현재 요소의 top 위치를 빼면 사용 가능한 높이
        const availableHeight = window.visualViewport.height - rect.top;

        // 키보드 열림 감지: visualViewport 높이가 초기 높이보다 상당히 작아졌는지 확인
        const heightDiff = initialHeight - window.visualViewport.height;
        setIsKeyboardOpen(heightDiff > 150); // 150px 이상 차이나면 키보드가 열린 것으로 판단

        // 최소 높이 보장
        const finalHeight = Math.max(availableHeight, 200);

        setContainerHeight(`${finalHeight}px`);
      }
    };

    // 초기 설정 (렌더링 완료 후)
    const timer = setTimeout(updateContainerHeight, 100);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateContainerHeight);
    }

    window.addEventListener("resize", updateContainerHeight);

    return () => {
      clearTimeout(timer);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          updateContainerHeight
        );
      }
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const handleNameSubmit = (name: string) => {
    setRegisterUserInfo((prev) => ({ ...prev, name }));
    setStep(2);
  };

  const handlePhoneSubmit = async (phone: string) => {
    if (isLoading) return;
    setIsLoading(true);
    // api 통신 중복검사
    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/${phone}`, {
        method: "GET",
      });
      if (res.status === 200) {
        // ✅ 이미 DB에 있는 번호
        alert("이미 존재하는 전화번호입니다.");
        return; // 다음 단계로 진행하지 않음
      }
      if (res.status === 404) {
        // ✅ DB에 없는 번호 → 다음 단계 진행
        setRegisterUserInfo((prev) => ({ ...prev, phone }));
        setStep(3);
        return;
      }
      throw new Error("전화번호 중복 확인 실패");
    } catch (error) {
      console.error(error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (isLoading) return;
    setIsLoading(true);

    //api 통신

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginType: "PHONE",
          digitalLevelAnswers: [false, false, false, false, false],
          name: registerUserInfo.name,
          email: "",
          userId: registerUserInfo.phone,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("회원가입 실패");
      }

      //TODO: 회원가입 성공 알림창 띄우고 테스트 페이지로 이동한다고 유저에게 알려주기
      const data = await res.json();
      console.log("회원가입 성공:", data);

      //로그인 페이지로 이동
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RegisterNameForm
            isKeyboardOpen={isKeyboardOpen}
            onSubmit={handleNameSubmit}
          />
        );

      case 2:
        return (
          <RegisterPhoneForm
            isKeyboardOpen={isKeyboardOpen}
            onSubmit={handlePhoneSubmit}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <RegisterPasswordForm
            isKeyboardOpen={isKeyboardOpen}
            onSubmit={handlePasswordSubmit}
            isLoading={isLoading}
          />
        );

      default:
        break;
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col"
      style={{ height: containerHeight }}
    >
      {renderStep()}
    </div>
  );
}
export default RegisterForm;
