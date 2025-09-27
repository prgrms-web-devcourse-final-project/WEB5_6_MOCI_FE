"use client";
import React from "react";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

function ChangeButtonForm() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          type="password"
          placeholder="비밀번호"
          className="flex-1"
        ></Input>
        <button type="button"></button>
      </div>
      <Input type="password" placeholder="비밀번호확인"></Input>
      <Button type="submit" className="mt-auto" fullWidth>
        비밀번호 바꾸기
      </Button>
    </>
  );
}

export default ChangeButtonForm;
