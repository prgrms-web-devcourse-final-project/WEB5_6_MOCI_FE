"use client";

import { deleteUser } from "@/api/deleteUser";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DeleteUserButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      "정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (!confirmed) return;

    try {
      await deleteUser(confirmed);
      alert("회원탈퇴가 완료되었습니다.");
      router.replace("/");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      fullWidth
      color="darkgreen"
      onClick={handleDeleteUser}
      disabled={isLoading}
    >
      {isLoading ? "처리중..." : "회원 탈퇴하기"}
    </Button>
  );
}
export default DeleteUserButton;
