import HamburgerIcon from "@/assets/icons/HamburgerIcon";
import UserIcon from "@/assets/icons/UserIcon";
import Image from "next/image";

function MainHeader() {
  return (
    <header className="flex justify-between items-center px-4 bg-lightyellow h-12">
      <div>
        <HamburgerIcon />
      </div>

      <div>
        <Image src={"/logo.png"} alt="디딤돌 로고" width={50} height={40} />
      </div>
      <div className="flex flex-col items-center">
        <UserIcon />
        <span className="text-sm font-normal">내 정보</span>
      </div>
    </header>
  );
}
export default MainHeader;
