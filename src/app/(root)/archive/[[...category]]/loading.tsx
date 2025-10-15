import KaKaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import Delivery from "@/assets/logos/Delivery_logo.svg";
import ButtonGroup from "@/shared/components/ButtonGroup";
import HomeButton from "../components/HomeButton";
import { matchCategory, matchCatResponse } from "../components/ArchiveList";
import Spinner from "@/shared/components/Spinner";

export type CategoryKey = keyof typeof matchCategory;
export type ResponseCatKey = keyof typeof matchCatResponse;
// type CategoryValue = (typeof matchCategory)[CategoryKey];

function Loading() {
  const items = [
    {
      icon: <KaKaoIcon />,
      label: "카카오톡",
      href: "/archive/kakaotalk",
    },
    {
      icon: <KTXLogo />,
      label: "KTX",
      href: "/archive/ktx",
    },
    {
      icon: (
        <YouTubeLogo className="rounded-lg border border-gray-100 object-contain" />
      ),
      label: "유튜브",
      href: "/archive/youtube",
    },
    {
      icon: (
        <CoupangLogo className="bg-white rounded-lg border border-gray-100 object-contain " />
      ),
      label: "쿠팡",
      href: "/archive/coupang",
    },
    {
      icon: <BusLogo />,
      label: "버스",
      href: "/archive/bus",
    },
    {
      icon: <Delivery className="rounded-lg w-[50px] h-[50px]" />,
      label: "배달",
      href: "/archive/delivery",
    },
  ];

  return (
    <div className="flex flex-col gap-2 h-[calc(100dvh-48px)]">
      <HomeButton />
      <div
        className="flex-1 overflow-y-scroll min-h-0"
        id="archive-scroll-container"
      >
        <h1 className="text-3xl text-darkgreen-default font-bold px-3 py-2">
          자주 찾는 서비스
        </h1>
        <div className="bg-lightyellow p-3 h-80">
          <ButtonGroup items={items} />
        </div>
        <Spinner />
      </div>
    </div>
  );
}
export default Loading;
