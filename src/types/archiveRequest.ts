// BE DTO에 맞춘 타입 정의

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

// 요청자 정보
export interface Requester {
  id: number;
  name: string;
  profileImageUrl: string;
}

// 검토자 정보
export interface ReviewedBy {
  id: number;
  name: string;
}

// 생성, 수정, 상세 조회 시 응답
export interface ArchiveRequestResponseDto {
  id: number;
  requester: Requester;
  title: string;
  description: string;
  status: RequestStatus;
  reviewedBy?: ReviewedBy; // 승인/거절 시에만 존재
  createdAt: string;
  updatedAt: string;
  category?: string; // 카테고리 정보 추가
}

// 목록 조회 시 응답의 개별 요청
export interface ArchiveRequestListItem {
  id: number;
  title: string;
  requesterName: string;
  status: RequestStatus;
  createdAt: string;
  category?: string; // 카테고리 정보 추가
}

// 목록 조회 시 응답
export interface ArchiveRequestListResponseDto {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  requests: ArchiveRequestListItem[];
}

// 백엔드 실제 응답 구조 (data 래핑)
export interface ArchiveRequestListApiResponse {
  data: ArchiveRequestListResponseDto;
}

// 요청 생성/수정 시 요청 데이터
export interface CreateArchiveRequestDto {
  title: string;
  description: string;
  category?: string; // 카테고리 정보 추가
}

// 상태 수정 시 요청 데이터
export interface UpdateArchiveRequestStatusDto {
  status: RequestStatus;
}
