import React from "react";
import EmailForm from "../components/EmailForm";

function page() {
  return (
    <div className="flex-1 p-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">이메일 등록/수정</h1>
      <EmailForm />
    </div>
  );
}

export default page;
