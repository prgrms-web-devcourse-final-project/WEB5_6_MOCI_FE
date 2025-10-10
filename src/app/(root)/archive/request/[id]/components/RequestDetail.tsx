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
import { STATUS_STYLES, STATUS_LABELS } from "@/constants/archiveRequest";
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
        const response = await getArchiveRequest(requestId);
        console.log("RequestDetail - requestId:", requestId);
        console.log("RequestDetail - response:", response);
        console.log("RequestDetail - user:", user);
        
        // 백엔드 응답 구조에 맞춰 데이터 추출
        const requestData = response?.data || response;
        console.log("RequestDetail - requestData:", requestData);
        
        setRequest(requestData);
      } catch (error) {
        console.error("요청 상세 정보 로딩 실패:", error);
        console.error("에러 상세:", error);
        
        // API 연결 실패 시 mock 데이터 사용
        console.log("API 연결 실패, mock 데이터 사용");
        const mockRequest: ArchiveRequestResponseDto = {
          id: requestId,
          requester: {
            id: user?.id || 1,
            name: user?.name || "김멘토",
            profileImageUrl: "",
          },
          title: "카카오톡 사용법 자료",
          description: "어르신들을 위한 카카오톡 기본 사용법에 대한 교육 자료가 필요합니다.\n\n주요 내용:\n1. 카카오톡 설치 방법\n2. 친구 추가하기\n3. 메시지 보내기\n4. 사진 전송하기\n5. 영상통화 사용법\n\n가능하면 스크린샷과 함께 단계별로 설명된 자료면 좋겠습니다.",
          status: "PENDING",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
          category: "KAKAO",
        };
        setRequest(mockRequest);
        
        // alert("요청 정보를 불러오는데 실패했습니다. 임시 데이터를 표시합니다.");
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
      const response = await updateArchiveRequest(requestId, editData);
      console.log("요청 수정:", { id: requestId, ...editData });
      console.log("수정 응답:", response);
      
      // 백엔드 응답 구조에 맞춰 데이터 추출
      const updatedRequest = response?.data || response;
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
      router.push("/archive/request");
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
      const response = await updateArchiveRequestStatus(requestId, "APPROVED");
      console.log("요청 승인:", requestId);
      console.log("승인 응답:", response);
      
      // 백엔드 응답 구조에 맞춰 데이터 추출
      const updatedRequest = response?.data || response;
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
      const response = await updateArchiveRequestStatus(requestId, "REJECTED");
      console.log("요청 거절:", requestId);
      console.log("거절 응답:", response);
      
      // 백엔드 응답 구조에 맞춰 데이터 추출
      const updatedRequest = response?.data || response;
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

  // 카테고리별 아이콘 선택
  const getCategoryIcon = (category?: string, title?: string) => {
    // 1. 백엔드에서 카테고리 정보가 있으면 사용
    if (category) {
      const upperCategory = category.toUpperCase();
      return categoryIcons[upperCategory] || KakaoTalkLogo;
    }
    
    // 2. 제목에서 카테고리 추출
    if (title) {
      const upperTitle = title.toUpperCase();
      
      if (upperTitle.includes('카카오톡') || upperTitle.includes('KAKAO')) {
        return KakaoTalkLogo;
      } else if (upperTitle.includes('유튜브') || upperTitle.includes('YOUTUBE')) {
        return YouTubeLogo;
      } else if (upperTitle.includes('KTX')) {
        return KTXLogo;
      } else if (upperTitle.includes('쿠팡') || upperTitle.includes('COUPANG')) {
        return CoupangLogo;
      } else if (upperTitle.includes('버스') || upperTitle.includes('BUS')) {
        return BusLogo;
      } else if (upperTitle.includes('배달') || upperTitle.includes('DELIVERY')) {
        return DeliveryLogo;
      } else {
        // 기타 카테고리 (다른 카테고리에 해당하지 않는 경우)
        return KakaoTalkLogo;
      }
    }
    
    return KakaoTalkLogo; // 기본값
  };
  
  const CategoryIcon = getCategoryIcon(request.category, request.title);

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
            <span className={`px-2 py-1 text-sm font-medium rounded-full ${STATUS_STYLES[request.status]}`}>
              {STATUS_LABELS[request.status]}
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
              className="w-full h-[48px] px-3 border border-black rounded-lg text-xl focus:outline-none focus:border-green-default focus:border-2 placeholder:text-gray"
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
              className="w-full h-64 px-3 py-2 border border-black rounded-lg text-xl focus:outline-none focus:border-green-default focus:border-2 resize-none placeholder:text-gray"
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
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              color="green"
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="button"
              color="darkgreen"
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "저장 중..." : "저장"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            {/* 관리자 버튼 */}
            {isAdmin && (
              <div className="flex gap-3 w-full">
                <Button
                  type="button"
                  color="green"
                  onClick={handleApprove}
                  disabled={isLoading || request.status === "APPROVED"}
                  className="flex-1"
                >
                  승인
                </Button>
                <Button
                  type="button"
                  color="red"
                  onClick={handleReject}
                  disabled={isLoading || request.status === "REJECTED"}
                  className="flex-1"
                >
                  거절
                </Button>
              </div>
            )}
            
            {/* 멘토 버튼 */}
            {isMentor && (
              <div className="flex gap-3 w-full">
                <Button
                  type="button"
                  color="green"
                  onClick={handleEdit}
                  disabled={isLoading || !isAuthor || !canEdit}
                  className="flex-1"
                >
                  수정
                </Button>
                <Button
                  type="button"
                  color="red"
                  onClick={handleDelete}
                  disabled={isLoading || !isAuthor || request.status === "APPROVED"}
                  className="flex-1"
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestDetail;
