"use client";
import { useAuthStore } from "@/store/authStore";
import ManagerMain from "./components/ManagerMain";
import MenteeMain from "./components/MenteeMain";
import MentorMain from "./components/MentorMain";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/shared/components/Spinner";

function Page() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      setRedirecting(true);
      alert("로그인이 필요합니다.");
      router.replace("/login");
      return;
    }
    if (user?.digitalLevel === null && !isLoading) {
      alert("서비스를 사용하기 위해서는 디지털 역량평가가 필요합니다.");
      router.replace("/register/ox-test");
    }
  }, [user, router, isLoading]);

  return (
    <div className="flex flex-col h-[calc(100dvh-48px)]">
      {isLoading || redirecting ? (
        <Spinner />
      ) : (
        user &&
        (user.role === "USER" ? (
          <MenteeMain />
        ) : user.role === "MENTOR" ? (
          <MentorMain />
        ) : (
          <ManagerMain />
        ))
      )}
    </div>
  );
}
export default Page;
