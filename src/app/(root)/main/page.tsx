"use client";
import { useAuthStore } from "@/store/authStore";
import ManagerMain from "./components/ManagerMain";
import MenteeMain from "./components/MenteeMain";
import MentorMain from "./components/MentorMain";
import NotFound from "@/app/not-found";

function Page() {
  const user = useAuthStore((s) => s.user);
  console.log(user);
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
