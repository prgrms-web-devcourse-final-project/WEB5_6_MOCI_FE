"use client";
import React, { FormEvent, useState } from "react";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import EyeClose from "@/assets/icons/eyeClose.svg";
import EyeOpen from "@/assets/icons/eyeOpen.svg";

function ChangeButtonForm() {
  const [hidePW, setHidePW] = useState(true);
  const [hidePWValidate, setHidePWValidate] = useState(true);

  const toggleHidePW = () => {
    setHidePW(!hidePW);
  };
  const toggleHidePWValidate = () => {
    setHidePWValidate(!hidePWValidate);
  };

  const changePassword = (e: FormEvent) => {
    e.preventDefault();
    // 입력값 없으면 alert
    // 일치하지 않아도 alert
    // api 통신
  };
  return (
    <form onSubmit={changePassword} className="flex-1 flex flex-col gap-5">
      <div className="flex gap-2">
        <Input
          type={hidePW ? "password" : "text"}
          placeholder="비밀번호"
        ></Input>
        <button type="button" onClick={toggleHidePW}>
          {hidePW ? <EyeOpen /> : <EyeClose />}
        </button>
      </div>
      <div className="flex gap-2">
        <Input
          type={hidePWValidate ? "password" : "text"}
          placeholder="비밀번호확인"
        ></Input>
        <button type="button" onClick={toggleHidePWValidate}>
          {hidePWValidate ? <EyeOpen /> : <EyeClose />}
        </button>
      </div>
      <Button type="submit" className="mt-auto" fullWidth>
        비밀번호 바꾸기
      </Button>
    </form>
  );
}

export default ChangeButtonForm;
