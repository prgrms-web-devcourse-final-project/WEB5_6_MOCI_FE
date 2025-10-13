"use client";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItems({ closeNav }: { closeNav: () => void }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const currentPath = pathname.split("/")[1];
  const navItem = [
    {
      href: "/chat/create",
      show: user !== null && user.role === "USER",
      itemName: "새 채팅방 만들기",
      selected: "/chat/create" === pathname,
    },
    {
      href: "/main",
      show: user !== null,
      itemName: "채팅목록 보기",
      selected: "main" === currentPath,
    },
    {
      href: "/my-page",
      show: user !== null && user.role === "USER",
      itemName: "내정보 보기",
      selected: "mypage" === currentPath,
    },
    {
      href: "/archive",
      show: true,
      itemName: "교육자료실로 이동",
      selected: "archive" === currentPath && !pathname.startsWith("/archive/request"),
    },
    {
      href: "/archive/request",
      show: user !== null && user.role !== "USER",
      itemName: "자료요청게시판",
      selected: pathname.startsWith("/archive/request"),
    },
  ];
  const moveTo = () => {
    closeNav();
  };
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmOK = confirm("로그아웃 하시겠습니까?");
    if (confirmOK) {
      logout();
      closeNav();
    }
  };
  return (
    <>
      {navItem.map(
        ({ href, show, itemName, selected }) =>
          show && (
            <li key={itemName} className={`flex flex-col`}>
              <Link
                className={`w-full h-fit px-5 py-6 my-2 text-3xl hover:bg-darkgreen-hover rounded-lg hover:text-white font-bold ${
                  selected && "bg-darkgreen-default text-white"
                }`}
                href={href}
                onClick={moveTo}
              >
                {itemName}
              </Link>
              <hr className="border-1 border-gray-200" />
            </li>
          )
      )}
      {user && (
        <li className={`flex flex-col`}>
          <button
            type="button"
            className={`w-full h-fit px-5 py-6 my-2 text-3xl hover:bg-darkgreen-hover rounded-lg hover:text-white font-bold text-start`}
            onClick={handleLogout}
          >
            로그아웃하기
          </button>
        </li>
      )}
    </>
  );
}

export default NavItems;
