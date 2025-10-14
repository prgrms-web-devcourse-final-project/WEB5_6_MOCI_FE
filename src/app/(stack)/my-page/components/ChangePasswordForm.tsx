"use client";
import React, { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import EyeClose from "@/assets/icons/eyeClose.svg";
import EyeOpen from "@/assets/icons/eyeOpen.svg";
import { changePW } from "@/api/changePW";
import { useRouter } from "next/navigation";

function ChangeButtonForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePW, setHidePW] = useState(true);
  const [hidePWValidate, setHidePWValidate] = useState(true);

  const route = useRouter();

  const [keyboardPadding, setKeyboardPadding] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const diff = window.innerHeight - window.visualViewport.height;
        setKeyboardPadding(
          diff > 0 ? (window.innerHeight > 240 ? diff - 35 : diff) : 0
        );
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    if (!password.trim() || !confirmPassword.trim()) {
      return alert("비밀번호를 입력해주세요!");
    }
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    try {
      await changePW(password, confirmPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      route.push("/my-page");
    } catch (e) {
      alert(e instanceof Error ? e.message : "에러 발생");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHidePW = () => {
    setHidePW(!hidePW);
  };
  const toggleHidePWValidate = () => {
    setHidePWValidate(!hidePWValidate);
  };

  const isPasswordValidLength = password.length !== 0 && password.length < 8;

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const isValid =
    password.trim().length >= 8 &&
    confirmPassword.trim().length >= 8 &&
    !passwordsMismatch;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
        <input
          type="text"
          name="username"
          autoComplete="username"
          style={{ position: "absolute", left: "-9999px" }}
          tabIndex={-1}
          aria-hidden="true"
          readOnly
        />
        <div>
          <div className="flex gap-2">
            <Input
              type={hidePW ? "password" : "text"}
              placeholder="비밀번호"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
            ></Input>
            <button
              type="button"
              onClick={toggleHidePW}
              aria-label="비밀번호 표시/숨기기"
              aria-pressed={hidePW}
            >
              {hidePW ? <EyeClose /> : <EyeOpen />}
            </button>
          </div>
          {isPasswordValidLength && (
            <p id="confirmPassword-error" className="mt-2 text-sm text-red-500">
              비밀번호는 8자 이상으로 입력해주세요.
            </p>
          )}
        </div>
        <div>
          <div className="flex gap-2">
            <Input
              type={hidePWValidate ? "password" : "text"}
              placeholder="비밀번호확인"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-describedby="confirmPassword-error"
              minLength={8}
              autoComplete="new-password"
            ></Input>
            <button
              type="button"
              onClick={toggleHidePWValidate}
              aria-label="비밀번호 표시/숨기기"
              aria-pressed={hidePWValidate}
            >
              {hidePWValidate ? <EyeClose /> : <EyeOpen />}
            </button>
          </div>
          {passwordsMismatch && (
            <p id="confirmPassword-error" className="mt-2 text-sm text-red-500">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        <div
          className="mt-auto sticky bottom-0 transition-[padding] duration-300"
          style={{ paddingBottom: keyboardPadding }}
        >
          <Button
            type="submit"
            className="mt-auto"
            fullWidth
            disabled={!isValid || isLoading}
            aria-disabled={!isValid || isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "처리중..." : "비밀번호 바꾸기"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default ChangeButtonForm;
