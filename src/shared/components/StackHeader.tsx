"use client";

import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";
import { usePathname, useRouter } from "next/navigation";

const pageTitle: Record<string, string> = {
  "/login": "로그인",
  register: "회원가입",
  "/my-page": "내 정보",
};

function SubHeader() {
  const router = useRouter();
  const pathName = usePathname();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  const headerTitle = pageTitle[pathName];

  return (
    <header className="flex items-center px-4 bg-lightyellow h-12">
      <button onClick={handleBack}>
        <LeftArrowIcon />
      </button>
      <span className="ml-4">{headerTitle}</span>
    </header>
  );
}
export default SubHeader;
