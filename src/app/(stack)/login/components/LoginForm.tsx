"use client";

import { login } from "@/api/login";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useAuthStore } from "@/store/authStore";
// import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EyeClose from "@/assets/icons/eyeClose.svg";
import EyeOpen from "@/assets/icons/eyeOpen.svg";
import { APIerror } from "@/api/getChatMsgMento";

function LoginForm() {
  const [hidePW, setHidePW] = useState(true);
  const [form, setForm] = useState({ userId: "", password: "" });
  const [errorMessage /*setErrorMessage*/] =
    useState("전화번호는 숫자만 입력해주세요");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const toggleHidePW = () => {
    setHidePW(!hidePW);
  };

  useEffect(() => {
    if (user && !isLoading) {
      router.replace("/main");
    }
  }, [user, router, isLoading]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "userId") {
      // 숫자만 입력받고 자동 하이픈 추가
      let value = e.target.value.replace(/[^0-9]/g, "");
      if (value.length > 3 && value.length <= 7) {
        value = value.slice(0, 3) + "-" + value.slice(3);
      } else if (value.length > 7) {
        value =
          value.slice(0, 3) +
          "-" +
          value.slice(3, 7) +
          "-" +
          value.slice(7, 11);
      }
      setForm((prev) => ({ ...prev, [name]: value.trim() }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value.trim() }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.userId.trim() === "" || form.password.trim() === "") {
      // TODO : sweetAlert으로 바꾸기
      alert("로그인 정보를 입력해주세요");
    } else {
      try {
        const result = await login(form);
        setUser(result);
        router.replace("/main");
      } catch (e) {
        const error = e as APIerror;
        alert(error.message);
      }
    }
  };

  return (
    <>
      <p className="text-xl text-darkgray">{errorMessage}</p>
      <form onSubmit={handleLogin} className="w-9/10 flex flex-col gap-5">
        <Input
          placeholder="전화번호"
          name="userId"
          value={form.userId}
          onChange={handleForm}
          autoComplete="userId"
        ></Input>
        <div className="relative">
          <Input
            placeholder="비밀번호"
            name="password"
            type={hidePW ? "password" : "text"}
            value={form.password}
            onChange={handleForm}
            className="pr-10"
            autoComplete="password"
          ></Input>
          <button
            type="button"
            onClick={toggleHidePW}
            aria-label="비밀번호 표시/숨기기"
            aria-pressed={hidePW}
            className="absolute right-2 bottom-0 top-0 flex-center p-2"
          >
            {hidePW ? <EyeClose /> : <EyeOpen />}
          </button>
        </div>
        <nav
          aria-label="로그인, 회원가입 버튼"
          className="w-full flex flex-col gap-2.5"
        >
          <Button fullWidth type="submit">
            로그인
          </Button>
        </nav>
      </form>
    </>
  );
}

export default LoginForm;
