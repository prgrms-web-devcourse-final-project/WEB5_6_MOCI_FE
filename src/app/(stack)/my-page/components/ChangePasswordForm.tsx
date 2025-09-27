"use client";
import React, { FormEvent, useState } from "react";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import EyeClose from "@/assets/icons/eyeClose.svg";
import EyeOpen from "@/assets/icons/eyeOpen.svg";

function ChangeButtonForm() {
  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePW = () => {
    setHidePassword(!hidePassword);
  };

  const changePassword = (e: FormEvent) => {
    e.preventDefault();
    // 입력값 없으면 alert
    // 일치하지 않아도 alert
    // api 통신
  };
  return (
    <form onSubmit={changePassword} className="flex-1 flex flex-col gap-5">
      <Input
        type={hidePassword ? "password" : "text"}
        placeholder="비밀번호"
      ></Input>
      <Input
        type={hidePassword ? "password" : "text"}
        placeholder="비밀번호확인"
      ></Input>
      <Button
        color="yellow"
        hasIcon
        className="w-fit self-end"
        onClick={toggleHidePW}
      >
        {hidePassword ? "비밀번호보기" : "비밀번호 가리기"}
        {hidePassword ? <EyeOpen /> : <EyeClose />}
      </Button>
      <Button type="submit" className="mt-auto" fullWidth>
        비밀번호 바꾸기
      </Button>
    </form>
  );
}

export default ChangeButtonForm;
