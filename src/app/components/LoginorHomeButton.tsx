"use client";

import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

function LoginOrHomeButton() {
  const user = useAuthStore((s) => s.user);

  // 로그인 안 된 경우: 안내문 + 로그인 버튼
  if (!user) {
    return (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-center w-full text-xl font-bold mb-3">
          로그인 후 채팅기능을 이용할 수 있습니다
        </h2>
        <Link href="/login" className="w-full" aria-label="로그인 하러가기">
          <Button color="darkgreen" className="w-full">
            로그인 하러가기
          </Button>
        </Link>
      </div>
    );
  }

  // 로그인 된 경우: 바로 홈으로 이동 버튼(채팅목록 보기)
  return (
    <Link href="/main" className="w-full" aria-label="채팅목록 보기">
      <Button color="darkgreen" className="w-full">
        채팅목록 보기
      </Button>
    </Link>
  );
}

export default LoginOrHomeButton;