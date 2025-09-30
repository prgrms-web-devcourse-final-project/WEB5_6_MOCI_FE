"use server";

import KaKaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import Delivery from "@/assets/logos/Delivery_logo.svg";
import RightArrow from "@/assets/icons/rightArrow.svg";
import ButtonGroup from "@/shared/components/ButtonGroup";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Pagination from "@/shared/components/Pagination";
import Link from "next/link";
import { getArchiveList } from "@/api/getArchiveList";
import { notFound } from "next/navigation";
import ArchiveCard from "../components/ArchiveCard";

const matchCategory = {
  kakaotalk: "카카오톡",
  ktx: "교통",
  youtube: "유튜브",
  coupang: "쿠팡",
  delivery: "배달",
  bus: "버스",
  all: "전체자료",
} as const;

type CategoryKey = keyof typeof matchCategory;
// type CategoryValue = (typeof matchCategory)[CategoryKey];

interface ArchiveType {
  id: number;
  title: string;
  thumbnail: string | null;
  createdAt: string;
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
  console.log(category);
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
    keyword: keyword,
    page: String(currentPage - 1),
  });
  console.log(archiveList);
  if (!archiveList) notFound();
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Button
        fullWidth
        hasIcon
        color="darkgreen"
        className="w-[calc(100%-8px)] self-center mt-2 p-0"
      >
        <Link
          href="/main"
          className="flex items-center gap-2.5 w-full h-full px-4 py-3"
        >
          <RightArrow />
          홈으로 이동
        </Link>
      </Button>
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-3xl text-darkgreen-default font-bold px-3 py-2">
          자주 찾는 서비스
        </h1>
        <div className="bg-lightyellow p-3 h-80">
          <ButtonGroup items={items} />
        </div>
        <form
          className="flex justify-between items-center gap-3 px-5 py-3"
          // onSubmit={searchArchive}
        >
          <label htmlFor="keyword" className="sr-only">
            검색
          </label>
          <Input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="검색어를 입력하세요"
          />
          <Button color="darkgreen">검색</Button>
        </form>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-darkgreen-default font-bold px-5 py-3">
            {matchCategory[category]}
          </h1>
        </div>
        <ul className="p-5 pt-0 flex flex-col gap-5">
          {archiveList.archives.map(({ id, title, thumbnail, createdAt }) => (
            <ArchiveCard
              key={id}
              cardInfo={{
                imgsrc: thumbnail,
                title: title,
                category: "카카오톡",
                createdAt: createdAt.slice(0, 10),
              }}
            />
          ))}
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
