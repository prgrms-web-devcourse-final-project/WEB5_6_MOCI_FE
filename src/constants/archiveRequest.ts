// 자료요청 관련 상수들
import { RequestStatus } from "@/types/archiveRequest";

// 카테고리 옵션
export const CATEGORY_OPTIONS = [
  { value: "", label: "카테고리를 선택해주세요" },
  { value: "KAKAO", label: "카카오톡" },
  { value: "YOUTUBE", label: "유튜브" },
  { value: "KTX", label: "KTX" },
  { value: "COUPANG", label: "쿠팡" },
  { value: "BUS", label: "버스" },
  { value: "DELIVERY", label: "배달" },
  { value: "ETC", label: "기타" },
] as const;

// 필터용 카테고리 옵션 (전체 포함)
export const FILTER_CATEGORY_OPTIONS = [
  { value: "ALL", label: "전체" },
  { value: "KAKAO", label: "카카오톡" },
  { value: "YOUTUBE", label: "유튜브" },
  { value: "KTX", label: "KTX" },
  { value: "COUPANG", label: "쿠팡" },
  { value: "BUS", label: "버스" },
  { value: "DELIVERY", label: "배달" },
  { value: "ETC", label: "기타" },
];

// 카테고리 타입
export type Category = typeof CATEGORY_OPTIONS[number]["value"];
export type FilterCategory = typeof FILTER_CATEGORY_OPTIONS[number]["value"];

// 상태별 스타일 매핑
export const STATUS_STYLES: Record<RequestStatus, string> = {
  PENDING: "bg-lightyellow text-black",
  APPROVED: "bg-yellow-default text-black", 
  REJECTED: "bg-darkgreen-default text-white",
};

// 상태별 라벨 매핑
export const STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: "대기",
  APPROVED: "승인", 
  REJECTED: "거절",
};
