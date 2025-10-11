"use client";
import { changeEmail } from "@/api/changeEmail";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { user, setUser } = useAuthStore();

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 이메일 입력안하거나 똑같으면 alert
    // 이메일 등록, 수정 api 연동
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
  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
      <Input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <div>
        <label className="text-xl font-bold">
          이메일 알림 받기
          <input
            type="checkbox"
            name="emailNotification"
            id="emailNotification"
            disabled
          />
        </label>
        <p id="confirmPassword-error" className="mt-2 text-sm text-gray">
          * 이메일 알림은 현재 지원하지않는 서비스입니다.
        </p>
      </div>

      <Button type="submit" className="mt-auto sticky bottom-0" fullWidth>
        이메일 설정하기
      </Button>
    </form>
  );
}

export default EmailForm;
