"use client";

import { ArchiveRequestListItem, RequestStatus } from "@/types/archiveRequest";
import { STATUS_STYLES, STATUS_LABELS } from "@/constants/archiveRequest";
// 임시로 직접 import
import KakaoTalkLogo from "@/assets/logos/KakaoTalk_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import DeliveryLogo from "@/assets/logos/Delivery_logo.svg";

const categoryIcons: Record<string, React.ComponentType<any>> = {
  KAKAO_TALK: KakaoTalkLogo,
  YOUTUBE: YouTubeLogo,
  KTX: KTXLogo,
  INTERCITY_BUS: BusLogo,
  BAEMIN: DeliveryLogo,
  COUPANG: CoupangLogo,
  ETC: KakaoTalkLogo, // 기타는 기본 아이콘 사용
};

function getCategoryIcon(category?: string) {
  if (category) {
    const upperCategory = category.toUpperCase();
    return categoryIcons[upperCategory] || KakaoTalkLogo;
  }
  return KakaoTalkLogo;
}
import RequestActions from "./RequestActions";

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
  const CategoryIcon = getCategoryIcon(request.category);

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors border-b">
      <div className="flex items-center gap-4">
        {/* 카테고리 아이콘 */}
        <div className="flex-shrink-0">
          <CategoryIcon className="w-8 h-8" />
        </div>

        {/* 요청 정보 */}
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => onViewDetail(request.id)}
        >
          <h3 className="text-lg font-medium text-black truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray mt-1">
            {request.requesterName} • {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* 상태 배지 */}
        <div className="flex-shrink-0">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${STATUS_STYLES[request.status]}`}>
            {STATUS_LABELS[request.status]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RequestItem;
