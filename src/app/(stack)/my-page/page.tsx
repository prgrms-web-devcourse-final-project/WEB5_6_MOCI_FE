"use client";

import MyPageButtons from "./components/MyPageButtons";
import UserInfo from "./components/UserInfo";

function Page() {
  return (
    <div className="w-4/5 min-w-[350px] flex-1  p-10 flex flex-col gap-5 self-center">
      <UserInfo />
      <MyPageButtons />
    </div>
  );
}
export default Page;
