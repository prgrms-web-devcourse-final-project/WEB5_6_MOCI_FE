"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import PlusIcon from "@/assets/icons/plus.svg";

interface CategoryOption {
  value: string;
  label: string;
}

interface RequestFilterProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onRequestCreate: () => void;
  canCreateRequest: boolean;
}

function RequestFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  onRequestCreate,
  canCreateRequest,
}: RequestFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedCategoryLabel = categories.find(
    cat => cat.value === selectedCategory
  )?.label || "전체";

  return (
    <div className="flex items-center gap-4">
      {/* 카테고리 드롭다운 */}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full h-12 px-4 bg-white border border-black rounded-lg flex items-center justify-between text-left focus:outline-none focus:border-green-default focus:border-2"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <span className="text-xl">{selectedCategoryLabel}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-lg shadow-lg z-10">
            {categories.map(category => (
              <button
                key={category.value}
                type="button"
                onClick={() => {
                  onCategoryChange(category.value);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-xl hover:bg-lightgreen transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  category.value === selectedCategory ? "bg-lightgreen" : ""
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 요청하기 버튼 */}
      {canCreateRequest && (
        <Button
          color="darkgreen"
          onClick={onRequestCreate}
          className="h-12 px-4 flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          요청하기
        </Button>
      )}
    </div>
  );
}

export default RequestFilter;
