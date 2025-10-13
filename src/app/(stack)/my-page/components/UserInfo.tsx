"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

function UserInfo() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const router = useRouter();
  const emailLength = user?.email?.length ?? 0;
  const fontsize =
    emailLength >= 24
      ? emailLength >= 28
        ? emailLength >= 32
          ? emailLength > 36
            ? ""
            : "text-sm"
          : ""
        : "text-lg"
      : "text-xl";
  const [id, domain] = (user?.email ?? "@").split("@");

  useEffect(() => {
    if (!user && !isLoading) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [user, router, isLoading]);

  return (
    <div className="w-full flex flex-col items-center rounded-xl border px-5 py-10 gap-10">
      <Image
        width={120}
        height={120}
        src="/logo.png" // : //   ? "mentoProfile.png" //   : user?.role === "MENTOR" //   ? "userProfile.png" // user?.role === "USER"
        alt="프로필이미지"
      ></Image>
      <section aria-label="사용자정보" className="flex-center flex-col gap-2">
        <p className="text-xl">{user?.name ?? "사용자 정보가 없습니다"}</p>
        <p className={`${fontsize} text-center`}>
          {emailLength > 36
            ? id + "\n@" + domain
            : user?.email ?? "이메일 정보가 없습니다"}
        </p>
      </section>
    </div>
  );
}

export default UserInfo;
