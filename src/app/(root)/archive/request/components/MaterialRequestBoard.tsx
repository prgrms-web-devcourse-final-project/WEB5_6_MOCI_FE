"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RequestStatus } from "@/types/archiveRequest";
import { FILTER_CATEGORY_OPTIONS } from "@/constants/archiveRequest";
import { useArchiveRequestList } from "../hooks/useArchiveRequest";
import RequestHeader from "./RequestHeader";
import RequestFilter from "./RequestFilter";
import RequestList from "./RequestList";
import RequestItem from "./RequestItem";

function MaterialRequestBoard() {
  const router = useRouter();
  const {
    requests,
    selectedCategory,
    isLoading,
    canAccess,
    isMentor,
    user,
    handleCategoryChange,
    fetchRequests
  } = useArchiveRequestList();

  //로그아웃 시 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

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

  const handleRequestCreate = () => {
    router.push("/archive/request/create");
  };

  const handleRequestEdit = (requestId: number) => {
    router.push(`/archive/request/${requestId}`);
  };

  const handleViewDetail = (requestId: number) => {
    router.push(`/archive/request/${requestId}`);
  };

  const handleRequestDelete = async (requestId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      const { deleteArchiveRequest } = await import("@/api/archiveRequest");
      await deleteArchiveRequest(requestId);
      // 현재 선택된 카테고리로 새로고침
      await fetchRequests(0, selectedCategory);
      alert("삭제가 완료되었습니다.");
    } catch{
      alert("삭제에 실패했습니다.");
    }
  };

  const handleStatusChange = async (requestId: number, newStatus: RequestStatus) => {
    try {
      const { updateArchiveRequestStatus } = await import("@/api/archiveRequest");
      await updateArchiveRequestStatus(requestId, newStatus);
      // 현재 선택된 카테고리로 새로고침
      await fetchRequests(0, selectedCategory);
      alert(`${newStatus === "APPROVED" ? "승인" : "거절"}이 완료되었습니다.`);
    } catch{
      alert("상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <RequestHeader />
      
      <div className="px-6 py-4">
        <RequestFilter
          categories={FILTER_CATEGORY_OPTIONS}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onRequestCreate={handleRequestCreate}
          canCreateRequest={isMentor}
        />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <RequestList>
          {requests.map(request => (
            <RequestItem
              key={request.id}
              request={request}
              onViewDetail={handleViewDetail}
            />
          ))}
        </RequestList>
      </div>
    </div>
  );
}

export default MaterialRequestBoard;
