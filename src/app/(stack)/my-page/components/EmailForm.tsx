"use client";
import { changeEmail } from "@/api/changeEmail";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

function EmailForm() {
  const { user, setUser } = useAuthStore();

  const [email, setEmail] = useState(user?.email ?? "");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changeEmail(email);

      setUser({ ...user, email });
      router.push("/my-page");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        alert(error);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
        alert(error);
      }
    }
  };

  const [keyboardPadding, setKeyboardPadding] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const diff = window.innerHeight - window.visualViewport.height;
        setKeyboardPadding(diff > 0 ? diff : 0);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  if (user?.email) {
    return (
      <>
        <h1 className="text-2xl font-bold">이메일 변경하기</h1>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
          <Input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <div
            className="mt-auto sticky bottom-0 transition-[padding] duration-300"
            style={{ paddingBottom: keyboardPadding }}
          >
            <Button type="submit" fullWidth>
              이메일 바꾸기
            </Button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold">이메일 등록하기</h1>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
        <Input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <div
          className="mt-auto sticky bottom-0 transition-[padding] duration-300"
          style={{ paddingBottom: keyboardPadding }}
        >
          <Button type="submit" fullWidth>
            이메일 등록하기
          </Button>
        </div>
      </form>
    </>
  );
}

export default EmailForm;
