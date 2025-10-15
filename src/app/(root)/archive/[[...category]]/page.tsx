
import KaKaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import Delivery from "@/assets/logos/Delivery_logo.svg";
import ButtonGroup from "@/shared/components/ButtonGroup";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Pagination from "@/shared/components/Pagination";
import { getArchiveList } from "@/api/getArchiveList";
import { notFound } from "next/navigation";
import ArchiveCard from "../components/ArchiveCard";
import ArchiveButtons from "../components/ArchiveButtons";
import HomeButton from "../components/HomeButton";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "교육 자료실",
  description: "교육 자료실 페이지",
};

const matchCategory = {
  kakaotalk: { text: "카카오톡", cat: "KAKAO_TALK" },
  ktx: { text: "기차", cat: "KTX" },
  youtube: { text: "유튜브", cat: "YOUTUBE" },
  coupang: { text: "쿠팡", cat: "COUPANG" },
  delivery: { text: "배달", cat: "BAEMIN" },
  bus: { text: "버스", cat: "INTERCITY_BUS" },
  all: { text: "전체자료", cat: undefined },
} as const;

const matchCatResponse = {
  KAKAO_TALK: "kakaotalk",
  YOUTUBE: "youtube",
  KTX: "ktx",
  INTERCITY_BUS: "bus",
  BAEMIN: "delivery",
  COUPANG: "coupang",
};

type CategoryKey = keyof typeof matchCategory;
export type ResponseCatKey = keyof typeof matchCatResponse;
// type CategoryValue = (typeof matchCategory)[CategoryKey];

interface ArchiveType {
  id: number;
  title: string;
  thumbnail: { file_url: string }; // 파일업로드 기능 완료되면 수정필요
  createdAt: string;
  category: ResponseCatKey;
}

interface ArchiveResponseType {
  archives: ArchiveType[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
}

async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
  params?: Promise<{ category: CategoryKey }>;
}) {
  const { page, keyword } = await searchParams;
  const param = await params;
  const category = param?.category ?? "all";
  const currentPage = Number(page || 1);
  const items = [
    {
      icon: <KaKaoIcon />,
      label: "카카오톡",
      href: "/archive/kakaotalk",
      className: `${
        category[0] === "kakaotalk" && "bg-yellow-default border-4"
      }`,
    },
    {
      icon: <KTXLogo />,
      label: "KTX",
      href: "/archive/ktx",
      className: `${category[0] === "ktx" && "bg-yellow-default border-4"}`,
    },
    {
      icon: (
        <YouTubeLogo className="rounded-lg border border-gray-100 object-contain" />
      ),
      label: "유튜브",
      href: "/archive/youtube",
      className: `${category[0] === "youtube" && "bg-yellow-default border-4"}`,
    },
    {
      icon: (
        <CoupangLogo className="bg-white rounded-lg border border-gray-100 object-contain " />
      ),
      label: "쿠팡",
      href: "/archive/coupang",
      className: `${category[0] === "coupang" && "bg-yellow-default border-4"}`,
    },
    {
      icon: <BusLogo />,
      label: "버스",
      href: "/archive/bus",
      className: `${category[0] === "bus" && "bg-yellow-default border-4"}`,
    },
    {
      icon: <Delivery className="rounded-lg w-[50px] h-[50px]" />,
      label: "배달",
      href: "/archive/delivery",
      className: `${
        category[0] === "delivery" && "bg-yellow-default border-4"
      }`,
    },
  ];

  const archiveList: ArchiveResponseType = await getArchiveList({
    category: matchCategory[category].cat,
    keyword: keyword,
    page: String(currentPage - 1),
  });

  const categoryIcons: Record<CategoryKey, React.ReactNode> = {
    kakaotalk: <KaKaoIcon className="w-9 h-9" />,
    ktx: <KTXLogo className="w-9 h-9" />,
    youtube: <YouTubeLogo className="w-9 h-9 rounded-lg border border-gray-100" />,
    coupang: <CoupangLogo className="w-9 h-9 rounded-lg border border-gray-100" />,
    bus: <BusLogo className="w-9 h-9" />,
    delivery: <Delivery className="w-9 h-9 rounded-lg" />,
    all: (
      <Image
        src="/logo.png"
        alt="디딤돌 로고"
        width={36}
        height={36}
      />
    ),
  };

  if (!archiveList) notFound();
  return (
    <div className="flex flex-col gap-2 h-[calc(100dvh-48px)]">
      <HomeButton />
      <div className="flex-1 overflow-y-auto min-h-0">
        <h1 className="text-3xl text-darkgreen-default font-bold px-3 py-2">
          자주 찾는 서비스
        </h1>
        <div className="bg-lightyellow p-3 h-80">
          <ButtonGroup items={items} />
        </div>
        <form className="flex justify-between items-center gap-3 px-5 py-3">
          <label htmlFor="keyword" className="sr-only">
            검색
          </label>
          <Input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="검색어를 입력하세요"
            defaultValue={keyword}
          />
          <Button type="submit" color="darkgreen">
            검색
          </Button>
        </form>
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-3">
            {categoryIcons[category]}
            <h1 className="text-3xl text-darkgreen-default font-bold">
              {matchCategory[category].text}
            </h1>
          </div>
          <ArchiveButtons />
        </div>
        <ul className="p-5 pt-0 flex flex-col gap-5">
          {archiveList.archives ? (
            archiveList.archives.map(
              ({ id, title, thumbnail, createdAt, category }) => (
                <ArchiveCard
                  key={id}
                  cardInfo={{
                    id,
                    imgsrc: thumbnail?.file_url ?? undefined,
                    title: title,
                    category:
                      matchCategory[matchCatResponse[category] as CategoryKey]
                        .text,
                    createdAt: createdAt.slice(0, 10),
                  }}
                />
              )
            )
          ) : (
            <p className="flex-center">자료가 없습니다</p>
          )}
        </ul>
        <Pagination
          totalPages={archiveList.totalPages}
          currentPage={currentPage}
          keyword={keyword}
        />
      </div>
    </div>
  );
}
export default Page;
