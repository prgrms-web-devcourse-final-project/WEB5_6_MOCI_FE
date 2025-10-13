"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { CreateArchiveRequestDto } from "@/types/archiveRequest";
import { createArchiveRequest } from "@/api/archiveRequest";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

function RequestCreateForm() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateArchiveRequestDto>({
    title: "",
    description: "",
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
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const newRequest = await createArchiveRequest(formData);
      console.log("요청 생성:", newRequest);
      
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

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      // TODO: API 호출
      console.log("요청 삭제");
      
      alert("삭제되었습니다.");
      router.push("/material-request");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
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
          <div className="flex-1 space-y-6">
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
                className="flex-1 w-full px-3 py-2 border border-black rounded-lg text-xl focus:outline-none focus:border-green-default focus:border-2 resize-none"
                required
              />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="space-y-4 pt-6">
            <div className="flex gap-4">
              <Button
                type="button"
                color="green"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 h-12"
              >
                취소
              </Button>
              <Button
                type="submit"
                color="darkgreen"
                disabled={isLoading}
                className="flex-1 h-12"
              >
                {isLoading ? "등록 중..." : "등록하기"}
              </Button>
            </div>
            
            <div className="flex gap-4">
              <Button
                type="button"
                color="green"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 h-12"
              >
                수정
              </Button>
              <Button
                type="button"
                color="darkgreen"
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 h-12"
              >
                {isLoading ? "처리 중..." : "삭제"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestCreateForm;
