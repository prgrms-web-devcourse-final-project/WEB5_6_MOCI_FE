"use client";

interface RequestDetailHeaderProps {
  onBack: () => void;
}

function RequestDetailHeader({ onBack }: RequestDetailHeaderProps) {
  return (
    <div className="px-6 py-4 border-b-2 border-darkgreen-default">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-lightgreen rounded-lg transition-colors"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">자료요청게시판</h1>
      </div>
    </div>
  );
}

export default RequestDetailHeader;
