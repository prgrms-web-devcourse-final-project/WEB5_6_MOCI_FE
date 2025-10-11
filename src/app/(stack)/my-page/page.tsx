"use client";

import Button from "@/shared/components/Button";
import UserInfo from "./components/UserInfo";
import Link from "next/link";
import DeleteUserButton from "./components/DeleteUserButton";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="w-4/5 min-w-[350px] flex-1  p-10 flex flex-col gap-5 self-center">
      <UserInfo />
      <Button fullWidth className="p-0">
        <Link href="/my-page/email-setting" className="w-full h-full px-4 py-3">
          이메일 설정
        </Link>
      </Button>
      {user.socialId ? (
        ""
      ) : (
        <Button fullWidth className="p-0">
          <Link href="/my-page/change-pw" className="w-full h-full px-4 py-3">
            비밀번호 변경
          </Link>
        </Button>
      )}
      <DeleteUserButton />
    </div>
  );
}
export default Page;
