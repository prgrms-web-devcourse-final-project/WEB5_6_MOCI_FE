import UserIcon from "@/assets/icons/user.svg";
import Button from "@/shared/components/Button";
import ButtonGroup from "@/shared/components/ButtonGroup";
import Image from "next/image";
import Link from "next/link";
import KaKaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";

/*TODO : href 수정 필요 */
const items = [
  {icon: <KaKaoIcon />, label:"카카오톡" , href:"/archive"},
  {icon: <KTXLogo />, label:"KTX", href:"/archive"},
  {icon: <YouTubeLogo className="rounded-lg border border-gray-100 object-contain"/>, label:"유튜브", href:"/archive"},
  {icon: <CoupangLogo className="bg-white rounded-lg border border-gray-100 object-contain"/>, label:"쿠팡", href:"/archive"},
]

export default function Home() {
  return(
    <div className="flex flex-col h-screen">
      <section className="min-w-[15rem] flex-[2] flex justify-center items-center px-6 py-6">
        <div className="w-full h-full border border-darkgreen-default rounded-lg flex flex-col justify-center items-center">
          <Image src="/logo.png" alt="디딤돌 로고" className="opacity-50" width={100} height={100} priority/>
          <p className="text-sm">멘토 매칭 서비스</p>
        </div>
      </section>

      <section className="bg-lightyellow flex-[3] flex flex-col px-6 py-6"> 
        <h2 className="text-left w-full text-lg font-bold mb-3">사용법 안내</h2>
        <div className="flex-1 mb-6">
          <ButtonGroup items={items}/>
        </div>
        <Link href="/archive" className="px-8 w-full" aria-label="교육 자료실로 이동하기">
          <Button className="w-full">교육 자료실로 이동</Button>
        </Link>
      </section>

      <section className="flex-[1] flex justify-center items-center px-6 w-full">
        <Link href="/login" className="w-full" aria-label="로그인 페이지로 이동">
          <Button color="darkgreen" className="w-full">로그인 하러가기</Button>
        </Link>
      </section>
    </div>
  )
}