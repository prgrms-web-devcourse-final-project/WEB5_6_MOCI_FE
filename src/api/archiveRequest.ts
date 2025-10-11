import {
  ArchiveRequestResponseDto,
  ArchiveRequestListResponseDto,
  ArchiveRequestListApiResponse,
  CreateArchiveRequestDto,
  UpdateArchiveRequestStatusDto,
  RequestStatus
} from "@/types/archiveRequest";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// 요청 목록 조회
export async function getArchiveRequestList(
  page: number = 0, 
  size: number = 10, 
  category?: string
): Promise<ArchiveRequestListApiResponse> {
  // 카테고리 파라미터 추가 (ALL이면 파라미터 제외)
  let url = `${BASE_URL}/api/v1/archive-requests?page=${page}&size=${size}`;
  if (category && category !== 'ALL') {
    url += `&category=${category}`;
  }
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키 포함
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API 에러 응답:", errorText);
    throw new Error(`요청 목록을 불러오는데 실패했습니다. (${response.status}: ${response.statusText})`);
  }

  const data = await response.json();
  return data;
}

// 요청 상세 조회
export async function getArchiveRequest(id: number): Promise<ArchiveRequestResponseDto> {
  const response = await fetch(`${BASE_URL}/api/v1/archive-requests/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('요청 상세 정보를 불러오는데 실패했습니다.');
  }

  return response.json();
}

// 요청 생성
export async function createArchiveRequest(data: CreateArchiveRequestDto): Promise<ArchiveRequestResponseDto> {
  const response = await fetch(`${BASE_URL}/api/v1/archive-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('요청 생성에 실패했습니다.');
  }

  return response.json();
}

// 요청 수정
export async function updateArchiveRequest(id: number, data: CreateArchiveRequestDto): Promise<ArchiveRequestResponseDto> {
  console.log("요청 수정 API 호출:", { id, data });
  
  const response = await fetch(`${BASE_URL}/api/v1/archive-requests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  console.log("수정 API 응답 상태:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("수정 API 에러 응답:", errorText);
    throw new Error(`요청 수정에 실패했습니다. (${response.status}: ${errorText})`);
  }

  return response.json();
}

// 요청 상태 수정 (승인/거절)
export async function updateArchiveRequestStatus(id: number, status: RequestStatus): Promise<ArchiveRequestResponseDto> {
  const response = await fetch(`${BASE_URL}/api/v1/archive-requests/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('요청 상태 변경에 실패했습니다.');
  }

  return response.json();
}

// 요청 삭제
export async function deleteArchiveRequest(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/archive-requests/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('요청 삭제에 실패했습니다.');
  }
}

// 대기중 요청 개수 조회
export async function getPendingRequestCount(): Promise<number> {
  const response = await fetch(`${BASE_URL}/api/v1/archive-requests/pending/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('대기중 요청 개수를 불러오는데 실패했습니다.');
  }

  return response.json();
}
