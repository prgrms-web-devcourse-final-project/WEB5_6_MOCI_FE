"use client";

import { ArchiveRequestResponseDto, CreateArchiveRequestDto } from "@/types/archiveRequest";
import { STATUS_STYLES, STATUS_LABELS, CATEGORY_OPTIONS } from "@/constants/archiveRequest";
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

interface RequestDetailContentProps {
  request: ArchiveRequestResponseDto;
  isEditing: boolean;
  editData: CreateArchiveRequestDto;
  onEditDataChange: (data: CreateArchiveRequestDto) => void;
}

function RequestDetailContent({
  request,
  isEditing,
  editData,
  onEditDataChange
}: RequestDetailContentProps) {
  const CategoryIcon = getCategoryIcon(request.category);

  return (
    <div className="flex-1 px-6 py-4 overflow-y-auto">
      {/* 요청 정보 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <CategoryIcon className="w-10 h-10" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-medium">{request.requester.name}</h2>
            <span className="text-sm text-gray">{new Date(request.createdAt).toLocaleDateString()}</span>
          </div>
          <span className={`px-2 py-1 text-sm font-medium rounded-full ${STATUS_STYLES[request.status]}`}>
            {STATUS_LABELS[request.status]}
          </span>
        </div>
      </div>

      {/* 카테고리 */}
      {isEditing && (
        <div className="mb-6">
          <label htmlFor="category" className="block text-lg font-medium mb-2">
            카테고리
          </label>
          <div className="flex items-center gap-3">
            {editData.category && getCategoryIcon(editData.category) && (
              <div className="flex-shrink-0">
                {(() => {
                  const IconComponent = getCategoryIcon(editData.category);
                  return <IconComponent className="w-8 h-8" />;
                })()}
              </div>
            )}
            
            <select
              id="category"
              name="category"
              value={editData.category}
              onChange={(e) => onEditDataChange({ ...editData, category: e.target.value })}
              className="flex-1 h-[48px] px-3 border border-black rounded-lg text-xl focus:outline-none focus:border-green-default focus:border-2"
              required
            >
              {CATEGORY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* 제목 */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">제목</label>
        {isEditing ? (
          <input
            type="text"
            value={editData.title}
            onChange={(e) => onEditDataChange({ ...editData, title: e.target.value })}
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
            onChange={(e) => onEditDataChange({ ...editData, description: e.target.value })}
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
  );
}

export default RequestDetailContent;
