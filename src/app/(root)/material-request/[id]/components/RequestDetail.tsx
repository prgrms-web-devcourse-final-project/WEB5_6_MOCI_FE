"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { 
  ArchiveRequestResponseDto, 
  CreateArchiveRequestDto,
  RequestStatus 
} from "@/types/archiveRequest";
import { 
  getArchiveRequest, 
  updateArchiveRequest, 
  updateArchiveRequestStatus, 
  deleteArchiveRequest 
} from "@/api/archiveRequest";
import Button from "@/shared/components/Button";
import KakaoTalkLogo from "@/assets/logos/KakaoTalk_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import DeliveryLogo from "@/assets/logos/Delivery_logo.svg";

interface RequestDetailProps {
  requestId: number;
}

// 카테고리별 아이콘 매핑
const categoryIcons: Record<string, React.ComponentType<any>> = {
  KAKAO: KakaoTalkLogo,
  YOUTUBE: YouTubeLogo,
  KTX: KTXLogo,
  COUPANG: CoupangLogo,
  BUS: BusLogo,
  DELIVERY: DeliveryLogo,
};

// 상태별 스타일 매핑
const statusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-lightyellow text-black",
  APPROVED: "bg-yellow-default text-black", 
  REJECTED: "bg-darkgreen-default text-white",
};

const statusLabels: Record<RequestStatus, string> = {
  PENDING: "대기",
  APPROVED: "승인", 
  REJECTED: "거절",
};

function RequestDetail({ requestId }: RequestDetailProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [request, setRequest] = useState<ArchiveRequestResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<CreateArchiveRequestDto>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const requestData = await getArchiveRequest(requestId);
        console.log("RequestDetail - requestId:", requestId);
        console.log("RequestDetail - requestData:", requestData);
        console.log("RequestDetail - user:", user);
        setRequest(requestData);
      } catch (error) {
        console.error("요청 상세 정보 로딩 실패:", error);
        alert("요청 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [requestId, user]);

  const isMentor = user?.role === "MENTOR";
  const isAdmin = user?.role === "ADMIN";
  const canAccess = isMentor || isAdmin;
  
  // 작성자 본인 확인 (BE DTO에서는 requester.id로 확인)
  const isAuthor = request && isMentor && user?.id === request.requester.id;
  
  // 수정 가능한 상태인지 확인 (대기 또는 거절 상태)
  const canEdit = request && (request.status === "PENDING" || request.status === "REJECTED");

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (request) {
      setEditData({
        title: request.title,
        description: request.description,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!request) return;
    
    setIsLoading(true);
    try {
      const updatedRequest = await updateArchiveRequest(requestId, editData);
      console.log("요청 수정:", { id: requestId, ...editData });
      
      // 성공 시 상태 업데이트
      setRequest(updatedRequest);
      setIsEditing(false);
      alert("수정이 완료되었습니다.");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      await deleteArchiveRequest(requestId);
      console.log("요청 삭제:", requestId);
      
      alert("삭제가 완료되었습니다.");
      router.push("/material-request");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!request) return;
    
    setIsLoading(true);
    try {
      const updatedRequest = await updateArchiveRequestStatus(requestId, "APPROVED");
      console.log("요청 승인:", requestId);
      
      setRequest(updatedRequest);
      alert("승인되었습니다.");
    } catch (error) {
      console.error("승인 실패:", error);
      alert("승인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("정말 거절하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      const updatedRequest = await updateArchiveRequestStatus(requestId, "REJECTED");
      console.log("요청 거절:", requestId);
      
      setRequest(updatedRequest);
      alert("거절되었습니다.");
    } catch (error) {
      console.error("거절 실패:", error);
      alert("거절에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ title: "", description: "" });
  };

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

  if (isLoading) {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <p className="text-xl">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">요청을 찾을 수 없습니다</h2>
          <Button onClick={handleBack}>목록으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  // BE DTO에는 category 필드가 없으므로 임시로 기본 아이콘 사용
  const CategoryIcon = KakaoTalkLogo;

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="뒤로가기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">자료요청게시판</h1>
        </div>
      </div>

      {/* 내용 영역 */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* 요청 정보 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <CategoryIcon className="w-10 h-10" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-medium">{request.requester.name}</h2>
              <span className="text-sm text-gray">{request.createdAt}</span>
            </div>
            <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusStyles[request.status]}`}>
              {statusLabels[request.status]}
            </span>
          </div>
        </div>

        {/* 제목 */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">제목</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full h-12 px-3 border border-black rounded-lg text-xl focus:outline-none focus:border-green-default focus:border-2"
              placeholder="제목을 입력해주세요"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg text-lg">
              {request.title}
            </div>
          )}
        </div>

        {/* 내용 */}
        <div className="flex-1">
          <label className="block text-lg font-medium mb-2">내용</label>
          {isEditing ? (
            <textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full h-64 px-3 py-2 border border-black rounded-lg text-lg focus:outline-none focus:border-green-default focus:border-2 resize-none"
              placeholder="내용을 입력해주세요"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg text-lg whitespace-pre-wrap min-h-64">
              {request.description}
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="px-6 py-4 border-t border-gray-200">
        {isEditing ? (
          <div className="flex gap-3">
            <Button
              type="button"
              color="green"
              fullWidth
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="h-10"
            >
              취소
            </Button>
            <Button
              type="button"
              color="darkgreen"
              fullWidth
              onClick={handleSave}
              disabled={isLoading}
              className="h-10"
            >
              {isLoading ? "저장 중..." : "저장"}
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            {/* 관리자 버튼 */}
            {isAdmin && (
              <>
                <Button
                  type="button"
                  color="green"
                  onClick={handleApprove}
                  disabled={isLoading || request.status === "APPROVED"}
                  className="flex-1 h-10"
                >
                  승인
                </Button>
                <Button
                  type="button"
                  color="red"
                  onClick={handleReject}
                  disabled={isLoading || request.status === "REJECTED"}
                  className="flex-1 h-10"
                >
                  거절
                </Button>
              </>
            )}
            
            {/* 멘토 버튼 */}
            {isMentor && (
              <>
                <Button
                  type="button"
                  color="green"
                  onClick={handleEdit}
                  disabled={isLoading || !isAuthor || !canEdit}
                  className="flex-1 h-10"
                >
                  수정
                </Button>
                <Button
                  type="button"
                  color="red"
                  onClick={handleDelete}
                  disabled={isLoading || !isAuthor || request.status === "APPROVED"}
                  className="flex-1 h-10"
                >
                  삭제
                </Button>
                <Button
                  type="button"
                  color="darkgreen"
                  onClick={() => router.push("/material-request/create")}
                  disabled={isLoading}
                  className="flex-1 h-10"
                >
                  등록
                </Button>
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="취소"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestDetail;
