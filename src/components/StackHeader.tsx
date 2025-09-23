"use client";

import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";
import { usePathname, useRouter } from "next/navigation";

const pageTitleList: Record<string, string> = {
  "/login": "로그인",
  "/register": "회원가입",
  "/my-page": "내 정보",
};

function SubHeader({ pageTitle }: { pageTitle?: string }) {
  const router = useRouter();
  const pathName = usePathname();
  let headerTitle;

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  if (pageTitle) {
    headerTitle = pageTitle;
  } else {
    headerTitle = pageTitleList[pathName];
  }

  return (
    <header className="flex items-center px-4 bg-lightyellow h-12">
      <button
        onClick={handleBack}
        className="flex justify-center items-center w-8 h-full"
        aria-label="뒤로가기"
      >
        <LeftArrowIcon />
      </button>
      <span className="m-2 font-bold select-none">{headerTitle}</span>
    </header>
  );
}
export default SubHeader;
