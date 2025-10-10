"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import { ArchiveRequestListItem, RequestStatus } from "@/types/archiveRequest";
import KakaoTalkLogo from "@/assets/logos/KakaoTalk_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import DeliveryLogo from "@/assets/logos/Delivery_logo.svg";

interface RequestItemProps {
  request: ArchiveRequestListItem;
  userRole?: string;
  currentUserId?: number;
  onEdit: (requestId: number) => void;
  onDelete: (requestId: number) => void;
  onStatusChange: (requestId: number, status: RequestStatus) => void;
  onViewDetail: (requestId: number) => void;
  isLoading: boolean;
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

function RequestItem({
  request,
  userRole,
  currentUserId,
  onEdit,
  onDelete,
  onStatusChange,
  onViewDetail,
  isLoading,
}: RequestItemProps) {
  const [showActions, setShowActions] = useState(false);
  
  // BE DTO에는 category 필드가 없으므로 임시로 기본 아이콘 사용
  const CategoryIcon = KakaoTalkLogo;
  
  const isMentor = userRole === "MENTOR";
  const isAdmin = userRole === "ADMIN";
  // BE DTO에서는 requesterName만 제공되므로, 작성자 확인 로직 수정 필요
  const isOwner = isMentor; // 임시로 모든 멘토가 수정 가능하도록 설정

  const handleEdit = () => {
    onEdit(request.id);
    setShowActions(false);
  };

  const handleDelete = () => {
    onDelete(request.id);
    setShowActions(false);
  };

  const handleApprove = () => {
    onStatusChange(request.id, "APPROVED");
    setShowActions(false);
  };

  const handleReject = () => {
    onStatusChange(request.id, "REJECTED");
    setShowActions(false);
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div 
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => onViewDetail(request.id)}
      >
        {/* 카테고리 아이콘 */}
        <div className="flex-shrink-0">
          <CategoryIcon className="w-8 h-8" />
        </div>

        {/* 요청 정보 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-black truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray mt-1">
            {request.requesterName} • {request.createdAt}
          </p>
        </div>

        {/* 상태 배지 */}
        <div className="flex-shrink-0">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[request.status]}`}>
            {statusLabels[request.status]}
          </span>
        </div>

        {/* 액션 버튼 */}
        <div className="flex-shrink-0 relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {/* 액션 메뉴 */}
          {showActions && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {isMentor && isOwner && (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    disabled={request.status === "APPROVED" || (request.status !== "PENDING" && request.status !== "REJECTED")}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    수정하기
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={request.status === "APPROVED"}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    삭제하기
                  </button>
                </>
              )}
              
              {isAdmin && request.status === "PENDING" && (
                <>
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg text-green-600"
                  >
                    승인하기
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 last:rounded-b-lg text-red-600"
                  >
                    거절하기
                  </button>
                </>
              )}
              
              {!isMentor && !isAdmin && (
                <div className="px-4 py-2 text-sm text-gray">
                  권한이 없습니다
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestItem;
