"use client";
import { useAuthStore } from "@/store/authStore";
import Button from "@/shared/components/Button";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";

function MyPageButtons() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <>
      <Button fullWidth className="p-0">
        <Link href="/my-page/email-setting" className="w-full h-full px-4 py-3">
          이메일 설정
        </Link>
      </Button>
      {user?.socialId ? (
        ""
      ) : (
        <Button fullWidth className="p-0">
          <Link href="/my-page/change-pw" className="w-full h-full px-4 py-3">
            비밀번호 변경
          </Link>
        </Button>
      )}
      <DeleteUserButton />
    </>
  );
}
export default MyPageButtons;
