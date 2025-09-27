"use client";

import { login } from "@/hooks/auth";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useAuthStore } from "@/store/authStore";
// import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginForm() {
  const [form, setForm] = useState({ userId: "", password: "" });
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.userId.trim() === "" || form.password.trim() === "") {
      // TODO : sweetAlert으로 바꾸기
      alert("로그인 정보를 입력해주세요");
    } else {
      try {
        const result = await login(form);
        // localStorage.setItem("userId", result.userId);
        setUser(result.user);
        router.push("/main");
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-9/10 flex flex-col gap-5">
      <Input
        placeholder="전화번호"
        name="userId"
        value={form.userId}
        onChange={handleForm}
      ></Input>
      <Input
        placeholder="비밀번호"
        name="password"
        type="password"
        value={form.password}
        onChange={handleForm}
      ></Input>
      <nav
        aria-label="로그인, 회원가입 버튼"
        className="w-full flex flex-col gap-2.5"
      >
        <Button fullWidth type="submit">
          로그인
        </Button>
      </nav>
    </form>
  );
}

export default LoginForm;
