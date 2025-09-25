import type { Metadata } from "next";
import NaverLogo from "@/assets/Naver-logo.svg";
import LoginForm from "./components/LoginForm";
import Button from "@/shared/components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로그인",
  description: "로그인 페이지",
};

function Page() {
  return (
    <div className="w-full flex-1 overflow-hidden px-10 pb-10 flex-center flex-col scroll-auto gap-2.5">
      <h2 className="text-4xl font-bold self-center mb-15">로그인</h2>
      <LoginForm />
      <Button color="darkgreen" fullWidth className="w-9/10 p-0">
        <Link href="/register" className="w-full h-full px-4 py-3">
          회원가입하기
        </Link>
      </Button>
      <nav aria-label="소셜로그인 버튼" className="flex-center gap-10 py-5">
        <button type="button">카카오톡</button>
        <button type="button">
          <NaverLogo />
        </button>
      </nav>
    </div>
  );
}
export default Page;
