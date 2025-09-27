import React from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";

function page() {
  return (
    <div className="flex-1 p-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">비밀번호 변경</h1>
      <ChangePasswordForm />
    </div>
  );
}

export default page;
