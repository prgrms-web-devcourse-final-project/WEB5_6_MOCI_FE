"use client";
import { useAuthStore } from "@/store/authStore";
import Button from "@/shared/components/Button";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";
import LogoutButton from "./LogoutButton";

function MyPageButtons() {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <>
      <Button fullWidth className="p-0">
        <Link href="/my-page/email-setting" className="w-full h-full px-4 py-3">
          {user?.email ? "이메일 변경하기" : "이메일 등록하기"}
        </Link>
      </Button>
      {user?.socialId ? (
        ""
      ) : (
        <Button fullWidth className="p-0">
          <Link href="/my-page/change-pw" className="w-full h-full px-4 py-3">
            비밀번호 변경하기
          </Link>
        </Button>
      )}
      <LogoutButton />
      <DeleteUserButton />
    </>
  );
}
export default MyPageButtons;
