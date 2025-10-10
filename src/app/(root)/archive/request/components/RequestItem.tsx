"use client";

import { ArchiveRequestListItem, RequestStatus } from "@/types/archiveRequest";
import { STATUS_STYLES, STATUS_LABELS } from "@/constants/archiveRequest";
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
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${STATUS_STYLES[request.status]}`}>
            {STATUS_LABELS[request.status]}
          </span>
        </div>

      </div>
    </div>
  );
}

export default RequestItem;
