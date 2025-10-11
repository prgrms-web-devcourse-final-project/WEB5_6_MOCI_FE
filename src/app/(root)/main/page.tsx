"use client";
import { useAuthStore } from "@/store/authStore";
import ManagerMain from "./components/ManagerMain";
import MenteeMain from "./components/MenteeMain";
import MentorMain from "./components/MentorMain";
import NotFound from "@/app/not-found";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.digitalLevel === null) {
      alert("서비스를 사용하기 위해서는 디지털 역량평가가 필요합니다.");
      router.push("/register/ox-test");
    }
  }, [user, router]);

  return (
    <div>
      {user ? (
        user.role === "USER" ? (
          <MenteeMain />
        ) : user.role === "MENTOR" ? (
          <MentorMain />
        ) : (
          <ManagerMain />
        )
      ) : (
        NotFound()
      )}
    </div>
  );
}
export default Page;
