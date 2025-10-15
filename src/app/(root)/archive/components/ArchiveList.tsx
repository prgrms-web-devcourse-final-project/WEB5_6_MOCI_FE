"use client";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Pagination from "@/shared/components/Pagination";
import ArchiveCard from "../components/ArchiveCard";

import { getArchiveList } from "@/api/getArchiveList";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import Spinner from "@/shared/components/Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryIcons, ResponseCatKey } from "../[[...category]]/page";
import { CategoryKey } from "../[[...category]]/loading";
import ArchiveButtons from "./ArchiveButtons";

interface ArchiveResponseType {
  archives: ArchiveType[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
}

interface ArchiveType {
  id: number;
  title: string;
  thumbnail: { file_url: string }; // 파일업로드 기능 완료되면 수정필요
  createdAt: string;
  category: ResponseCatKey;
}

export const matchCategory = {
  kakaotalk: { text: "카카오톡", cat: "KAKAO_TALK" },
  ktx: { text: "교통", cat: "KTX" },
  youtube: { text: "유튜브", cat: "YOUTUBE" },
  coupang: { text: "쿠팡", cat: "COUPANG" },
  delivery: { text: "배달", cat: "BAEMIN" },
  bus: { text: "버스", cat: "INTERCITY_BUS" },
  all: { text: "전체자료", cat: undefined },
} as const;

export const matchCatResponse = {
  KAKAO_TALK: "kakaotalk",
  YOUTUBE: "youtube",
  KTX: "ktx",
  INTERCITY_BUS: "bus",
  BAEMIN: "delivery",
  COUPANG: "coupang",
};

function ArchiveList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") || 1)
  );

  const pathname = usePathname();
  const [category, setCategory] = useState(
    (pathname.split("/").pop() === "archive"
      ? "all"
      : pathname.split("/").pop()) as CategoryKey
  );
  const [keyword, setKeyword] = useState("");
  const [text, setText] = useState("");
  const [archiveList, setArchiveList] = useState<ArchiveResponseType | null>(
    null
  );
  const [shouldScrollTop, setShouldScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getArchives = useCallback(
    async (category: CategoryKey, keyword: string, page: string) => {
      try {
        setIsLoading(true);

        const res = await getArchiveList({
          category: matchCategory[category].cat,
          keyword,
          page,
        });
        setArchiveList(res);
      } catch (e) {
        alert("자료를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetSearch = () => {
    setShouldScrollTop(true);
    setKeyword("");
    setText("");
    setCategory("all");
    setCurrentPage(1);
  };

  useEffect(() => {
    resetSearch();
  }, [category]);

  useEffect(() => {
    const scrollContainer = document.getElementById("archive-scroll-container");
    if (!scrollContainer || isLoading) return;

    if (shouldScrollTop) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      setShouldScrollTop(false);
    }
  }, [isLoading, shouldScrollTop]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedSetKeyword.cancel();
    setShouldScrollTop(true);
    setKeyword(text);
    if (currentPage !== 1) {
      router.replace(pathname);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    getArchives(category, keyword, String(currentPage - 1));
  }, [category, currentPage, getArchives, keyword]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  const debouncedSetKeyword = useMemo(
    () =>
      debounce(
        (value: string) => {
          setShouldScrollTop(true);
          setKeyword(value);
          if (currentPage !== 1) {
            router.replace(pathname);
            setCurrentPage(1);
          }
        },

        400
      ),
    [currentPage, pathname, router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    debouncedSetKeyword(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetKeyword.cancel();
    };
  }, [debouncedSetKeyword]);

  return (
    <>
      <form
        className="flex justify-between items-center gap-3 px-5 py-3"
        onSubmit={handleSearch}
      >
        <label htmlFor="keyword" className="sr-only">
          검색
        </label>
        <Input
          type="search"
          inputMode="search"
          enterKeyHint="search"
          name="keyword"
          id="keyword"
          placeholder="검색어를 입력하세요"
          value={text}
          onChange={handleChange}
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
        <ArchiveButtons resetSearch={resetSearch} />
      </div>
      <ul className="p-5 pt-0 flex flex-col gap-5">
        {!archiveList || !archiveList.archives || isLoading ? (
          <Spinner paddingSmall />
        ) : archiveList.archives.length === 0 ? (
          <p className="flex-center text-xl">자료가 없습니다</p>
        ) : (
          <>
            {archiveList.archives.map(
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
            )}
          </>
        )}
      </ul>
      <Pagination
        totalPages={archiveList?.totalPages ?? 0}
        currentPage={currentPage}
      />
    </>
  );
}

export default ArchiveList;
