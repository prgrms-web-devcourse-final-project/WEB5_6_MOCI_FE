"use client";
import Button from "@/shared/components/Button";
import React from "react";
import RightArrow from "@/assets/icons/rightArrow.svg";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function HomeButton() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  const moveToHome = () => {
    if (isLoading) return;
    router.replace(user ? "/main" : "/");
  };

  return (
    <Button
      fullWidth
      hasIcon
      color="darkgreen"
      className="w-[calc(100%-8px)] self-center mt-2 shrink-0"
      onClick={moveToHome}
    >
      <RightArrow />
      {isLoading ? "홈으로 이동" : user ? "채팅목록 보기" : "홈으로 이동"}
    </Button>
  );
}

export default HomeButton;
