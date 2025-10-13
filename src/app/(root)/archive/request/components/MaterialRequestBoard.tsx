"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { 
  ArchiveRequestListItem, 
  ArchiveRequestListResponseDto,
  RequestStatus 
} from "@/types/archiveRequest";
import { getArchiveRequestList } from "@/api/archiveRequest";
import RequestFilter from "./RequestFilter";
import RequestList from "./RequestList";
import RequestItem from "./RequestItem";

// 카테고리 옵션 (실제로는 BE에서 카테고리 정보를 받아와야 할 수도 있음)
const categoryOptions = [
  { value: "ALL", label: "전체" },
  { value: "KAKAO", label: "카카오톡" },
  { value: "YOUTUBE", label: "유튜브" },
  { value: "KTX", label: "KTX" },
  { value: "COUPANG", label: "쿠팡" },
  { value: "BUS", label: "버스" },
  { value: "DELIVERY", label: "배달" },
];

type Category = "ALL" | "KAKAO" | "YOUTUBE" | "KTX" | "COUPANG" | "BUS" | "DELIVERY";

function MaterialRequestBoard() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [requests, setRequests] = useState<ArchiveRequestListItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 권한 체크
  const isAdmin = user?.role === "ADMIN";
  const isMentor = user?.role === "MENTOR";
  const canAccess = isAdmin || isMentor;

  // 임시 mock 데이터 (API 연결 전까지 사용)
  const mockRequests: ArchiveRequestListItem[] = [
    {
      id: 1,
      title: "카카오톡 사용법 자료",
      requesterName: "김멘토",
      status: "PENDING",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      title: "유튜브 영상 시청 방법",
      requesterName: "이멘토",
      status: "APPROVED",
      createdAt: "2024-01-14T14:20:00Z",
    },
    {
      id: 3,
      title: "KTX 예약 시스템 사용법",
      requesterName: "박멘토",
      status: "REJECTED",
      createdAt: "2024-01-13T09:15:00Z",
    },
  ];

  // 데이터 로딩
  const fetchRequests = async (page: number = 0) => {
    if (!canAccess) return;
    
    console.log("fetchRequests 시작 - page:", page, "canAccess:", canAccess);
    setIsLoading(true);
    try {
      const response = await getArchiveRequestList(page, 10);
      console.log("API 응답:", response);
      setRequests(response.requests);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      console.log("상태 업데이트 완료 - requests:", response.requests);
    } catch (error) {
      console.error("요청 목록 로딩 실패:", error);
      console.error("에러 상세:", error);
      
      // API 연결 실패 시 mock 데이터 사용
      console.log("API 연결 실패, mock 데이터 사용");
      setRequests(mockRequests);
      setCurrentPage(0);
      setTotalPages(1);
      setTotalElements(mockRequests.length);
      
      // alert("요청 목록을 불러오는데 실패했습니다. 임시 데이터를 표시합니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("MaterialRequestBoard useEffect - user:", user);
    console.log("MaterialRequestBoard useEffect - canAccess:", canAccess);
    fetchRequests();
  }, [canAccess, user]);

  // 권한이 없는 경우
  if (!canAccess) {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray">멘토 또는 관리자만 접근할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  // 카테고리 필터링 (클라이언트 사이드 필터링, 실제로는 서버 사이드 필터링이 필요할 수 있음)
  const filteredRequests = selectedCategory === "ALL" 
    ? requests 
    : requests.filter(request => {
        // BE DTO에는 category 필드가 없으므로, 임시로 title에서 카테고리 추출
        // 실제로는 BE에서 카테고리 정보를 제공해야 함
        return true; // 임시로 모든 요청 표시
      });

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleRequestCreate = () => {
    console.log("요청하기 버튼 클릭");
    router.push("/archive/request/create");
  };

  const handleRequestEdit = (requestId: number) => {
    router.push(`/archive/request/${requestId}`);
  };

  const handleViewDetail = (requestId: number) => {
    console.log("상세 보기 클릭:", requestId);
    router.push(`/archive/request/${requestId}`);
  };

  const handleRequestDelete = async (requestId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      const { deleteArchiveRequest } = await import("@/api/archiveRequest");
      await deleteArchiveRequest(requestId);
      
      // 삭제 후 목록 새로고침
      await fetchRequests(currentPage);
      alert("삭제가 완료되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (requestId: number, newStatus: RequestStatus) => {
    setIsLoading(true);
    try {
      const { updateArchiveRequestStatus } = await import("@/api/archiveRequest");
      await updateArchiveRequestStatus(requestId, newStatus);
      
      // 상태 변경 후 목록 새로고침
      await fetchRequests(currentPage);
      alert(`${newStatus === "APPROVED" ? "승인" : "거절"}이 완료되었습니다.`);
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 페이지 제목 */}
      <div className="px-6 py-4 border-b border-purple-200">
        <h1 className="text-2xl font-bold text-center">자료요청게시판</h1>
      </div>

      {/* 필터 및 액션 영역 */}
      <div className="px-6 py-4">
        <RequestFilter
          categories={categoryOptions}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => handleCategoryChange(category as Category)}
          onRequestCreate={handleRequestCreate}
          canCreateRequest={isMentor}
        />
      </div>

      {/* 요청 목록 */}
      <div className="flex-1 overflow-y-auto">
        <RequestList>
          {filteredRequests.map(request => (
            <RequestItem
              key={request.id}
              request={request}
              userRole={user?.role}
              currentUserId={user?.id}
              onEdit={handleRequestEdit}
              onDelete={handleRequestDelete}
              onStatusChange={handleStatusChange}
              onViewDetail={handleViewDetail}
              isLoading={isLoading}
            />
          ))}
        </RequestList>
      </div>
    </div>
  );
}

export default MaterialRequestBoard;
