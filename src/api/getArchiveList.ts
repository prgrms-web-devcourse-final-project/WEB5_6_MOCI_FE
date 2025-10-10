import { ResponseCatKey } from "@/app/(root)/archive/[[...category]]/page";
import { BASE_URL } from "./constants/config";

export const getArchiveList = async ({
  page,
  keyword,
  category,
}: {
  page: string;
  keyword?: string;
  category?: ResponseCatKey;
}) => {
  const requestAPIUrl = category
    ? keyword // 카테고리 o
      ? `${BASE_URL}/api/v1/archive/public?category=${category}&keyword=${keyword}&page=${page}&size=10&sort=createdAt`
      : `${BASE_URL}/api/v1/archive/public?category=${category}&page=${page}&size=10&sort=createdAt`
    : keyword // 카테고리 x
    ? `${BASE_URL}/api/v1/archive/public?keyword=${keyword}&page=${page}&size=10&sort=createdAt`
    : `${BASE_URL}/api/v1/archive/public?page=${page}&size=10&sort=createdAt`;

  try {
    const res = await fetch(requestAPIUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        throw new Error(
          errorData.message ?? "교육자료실 목록 조회에 실패하였습니다"
        );
      } catch {
        throw new Error("교육자료실 목록 조회에 실패하였습니다");
      }
    }
    const data = await res.json();
    return data.data;
  } catch {}
};

export const getArchiveSearchList = async ({
  keyword,
  page,
}: {
  keyword: string;
  page: string;
}) => {
  getArchiveList({ keyword, page });
};
