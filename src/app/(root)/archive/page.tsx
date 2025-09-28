import KaKaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import Delivery from "@/assets/logos/Delivery_logo.svg";
import RightArrow from "@/assets/icons/rightArrow.svg";
import ButtonGroup from "@/shared/components/ButtonGroup";
import Button from "@/shared/components/Button";
import ArchiveCard from "./components/ArchiveCard";
import Input from "@/shared/components/Input";
import Pagination from "@/shared/components/Pagination";

function Page({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page || 1);
  const items = [
    { icon: <KaKaoIcon />, label: "카카오톡", href: "/archive" },
    { icon: <KTXLogo />, label: "KTX", href: "/archive" },
    {
      icon: (
        <YouTubeLogo className="rounded-lg border border-gray-100 object-contain" />
      ),
      label: "유튜브",
      href: "/archive",
    },
    {
      icon: (
        <CoupangLogo className="bg-white rounded-lg border border-gray-100 object-contain" />
      ),
      label: "쿠팡",
      href: "/archive",
    },
    { icon: <BusLogo />, label: "버스", href: "/archive" },
    {
      icon: <Delivery className="rounded-lg w-[50px] h-[50px]" />,
      label: "배달",
      href: "/archive",
    },
  ];
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Button
        fullWidth
        hasIcon
        color="darkgreen"
        className="w-[calc(100%-8px)] self-center mt-2"
      >
        <RightArrow />
        홈으로 이동
      </Button>
      <div className="h-[calc(100dvh-110px)] overflow-y-auto">
        <h1 className="text-3xl text-darkgreen-default font-bold px-3 py-2">
          자주 찾는 서비스
        </h1>
        <div className="bg-lightyellow p-3 h-80">
          <ButtonGroup items={items} />
        </div>
        <form className="flex justify-between items-center gap-3 p-3">
          <label htmlFor="searchArchive" className="sr-only">
            검색
          </label>
          <Input
            type="text"
            name="searchArchive"
            id="searchArchive"
            placeholder="검색어를 입력하세요"
          />
          <Button color="darkgreen">검색</Button>
        </form>
        <h1 className="text-3xl text-darkgreen-default font-bold px-3 py-2">
          전체 자료
        </h1>
        <ul className="p-5 pt-0 flex flex-col gap-2">
          {/* example */}
          <ArchiveCard
            cardInfo={{
              imgsrc: null,
              title: "카카오톡 사진 전송 방법",
              category: "카카오톡",
              createdAt: "9월 28일",
            }}
          />
        </ul>
        <Pagination totalPages={18} currentPage={currentPage} />
      </div>
    </div>
  );
}
export default Page;
