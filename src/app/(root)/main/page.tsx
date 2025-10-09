// "use client";
// import { useAuthStore } from "@/store/authStore";
// import ManagerMain from "./components/ManagerMain";
// import MenteeMain from "./components/MenteeMain";
import MentorMain from "./components/MentorMain";

function Page() {
  // 테스트용코드
  // const logout = useAuthStore((s) => s.logout);
  // console.log(logout());
  // const user = useAuthStore((s) => s.user);
  // console.log(user);
  return (
    <div>
      <MentorMain />
      {/* <MenteeMain/> */}
      {/* <ManagerMain/> */}
    </div>
  );
}
export default Page;
