"use client";

import LeftArrowIcon from "@/assets/icons/leftArrow.svg";
import { usePathname, useRouter } from "next/navigation";

const pageTitleList: Record<string, string> = {
  "/login": "로그인",
  "/register": "회원가입",
  "/my-page": "내 정보",
  "/chat": "새로운 채팅 만들기",
  "/archive/write": "교육자료실 새 글 작성",
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
    for (const key in pageTitleList) {
      if (pathName.startsWith(key)) {
        headerTitle = pageTitleList[key];
        break;
      }
    }
  }

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[650px] min-w-[350px] flex items-center px-4 h-12 shadow-md z-50">
      <button
        type="button"
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
