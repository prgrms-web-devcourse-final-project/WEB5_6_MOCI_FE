import HamburgerIcon from "@/assets/icons/HamburgerIcon";
import UserIcon from "@/assets/icons/UserIcon";
import Image from "next/image";
import Link from "next/link";

function MainHeader() {
  return (
    <header className="flex justify-between items-center px-4 bg-lightyellow h-12">
      <div>
        <HamburgerIcon />
      </div>

      <Link href={"/main"} aria-label="메인페이지로 이동">
        <Image
          src={"/logo.png"}
          aria-label="로고 이미지"
          alt="디딤돌 로고"
          width={50}
          height={40}
        />
      </Link>
      <Link
        href={"/my-page"}
        aria-label="내 정보 페이지로 이동"
        className="flex flex-col items-center"
      >
        <UserIcon />
        <span className="text-sm font-normal">내 정보</span>
      </Link>
    </header>
  );
}
export default MainHeader;
