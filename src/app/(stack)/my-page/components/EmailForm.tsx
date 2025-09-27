"use client";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import React, { FormEvent } from "react";

function EmailForm() {
  const changeEmail = (e: FormEvent) => {
    e.preventDefault();
    // 이메일 입력안하거나 똑같으면 alert
    // 이메일 등록, 수정 api 연동
  };
  return (
    <form onSubmit={changeEmail} className="flex-1 flex flex-col gap-5">
      <Input type="text" placeholder="이메일 입력"></Input>
      <label className="text-xl font-bold">
        이메일 알림 받기{" "}
        <input
          type="checkbox"
          name="emailNotification"
          id="emailNotification"
        />
      </label>

      <Button type="submit" className="mt-auto sticky bottom-0" fullWidth>
        이메일 설정하기
      </Button>
    </form>
  );
}

export default EmailForm;
