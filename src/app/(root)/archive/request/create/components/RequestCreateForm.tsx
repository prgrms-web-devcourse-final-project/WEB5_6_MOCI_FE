"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { CreateArchiveRequestDto } from "@/types/archiveRequest";
import { createArchiveRequest } from "@/api/archiveRequest";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { CATEGORY_OPTIONS } from "@/constants/archiveRequest";
import KakaoTalkLogo from "@/assets/logos/KakaoTalk_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import DeliveryLogo from "@/assets/logos/Delivery_logo.svg";

interface SvgProps {
  className?: string;
}

// 카테고리별 아이콘 매핑 (백엔드 RequestCategory enum에 맞춤)
const categoryIcons: Record<string, React.ComponentType<SvgProps>> = {
  KAKAO_TALK: KakaoTalkLogo,
  YOUTUBE: YouTubeLogo,
  KTX: KTXLogo,
  INTERCITY_BUS: BusLogo,
  BAEMIN: DeliveryLogo,
  COUPANG: CoupangLogo,
  ETC: KakaoTalkLogo, // 기타는 기본 아이콘 사용
};

function RequestCreateForm() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateArchiveRequestDto>({
    title: "",
    description: "",
    category: "",
  });

  // 권한 체크
  if (user?.role !== "MENTOR") {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray">멘토만 요청을 작성할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      alert("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createArchiveRequest(formData);
      console.log("요청 생성 응답:", response);
      
      // 성공 시 목록으로 이동
      alert("요청이 성공적으로 등록되었습니다.");
      router.push("/archive/request");
    } catch (error) {
      console.error("요청 생성 실패:", error);
      alert("요청 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleBack = () => {
    router.back();
  };

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

      {/* 폼 영역 */}
      <div className="flex-1 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-5">
            {/* 카테고리 */}
            <div>
              <label htmlFor="category" className="block text-lg font-medium mb-2">
                카테고리
              </label>
              <div className="flex items-center gap-3">
                {/* 카테고리 아이콘 미리보기 */}
                {formData.category && categoryIcons[formData.category] && (
                  <div className="flex-shrink-0">
                    {(() => {
                      const IconComponent = categoryIcons[formData.category];
                      return <IconComponent className="w-8 h-8" />;
                    })()}
                  </div>
                )}
                
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
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

            {/* 제목 */}
            <div>
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                제목
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="요청 제목을 입력해주세요"
                required
              />
            </div>


            {/* 내용 */}
            <div className="flex-1 flex flex-col">
              <label htmlFor="description" className="block text-lg font-medium mb-2">
                내용
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="요청 내용을 자세히 입력해주세요"
                className="flex-1 w-full px-3 py-2 border border-black rounded-lg text-xl focus:outline-none focus:border-green-default focus:border-2 resize-none placeholder:text-gray"
                required
              />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="pt-6">
            <div className="flex gap-3 w-full">
              <Button
                type="button"
                color="green"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                type="submit"
                color="darkgreen"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestCreateForm;
