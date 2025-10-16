"use client";
import Button from "@/shared/components/Button";
import KakaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import SearchLogo from "@/assets/icons/search.svg";

type StepCategoryProps = {
  value: string;
  onSelect: (category: string) => void;
  onNext: () => void;
};

export default function StepCategory({
  value,
  onSelect,
  onNext,
}: StepCategoryProps) {
  const categories = [
    { name: "카카오톡", icon: <KakaoIcon /> },
    { name: "KTX", icon: <KTXLogo /> },
    {
      name: "유튜브",
      icon: (
        <YouTubeLogo className="rounded-lg border border-gray-100 object-contain" />
      ),
    },
    {
      name: "쿠팡",
      icon: (
        <CoupangLogo className="bg-white rounded-lg border border-gray-100 object-contain" />
      ),
    },
    { name: "버스", icon: <BusLogo /> },
    { name: "기타", icon: <SearchLogo className="w-[50px] h-[50px]" /> },
  ];

  const handleNext = () => {
    if (value) {
      onNext();
    }
  };

  return (
    <div className="w-full flex-1 overflow-hidden px-[10vw] sm:px-16 flex flex-col justify-center items-center">
      <h2
        className="text-2xl sm:text-3xl font-bold mb-15"
        aria-label="무엇을 질문하고 싶으신가요 ?"
      >
        무엇을 질문하고 싶으신가요?
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {categories.map((category) => {
          const isSelected = value === category.name;
          return (
            <Button
              key={category.name}
              onClick={() => onSelect(isSelected ? "" : category.name)}
              hasIcon
              color="white"
              className={`text-xl whitespace-nowrap ${
                isSelected ? " bg-yellow-hover" : ""
              }`}
              aria-label={`${category.name}${isSelected && "선택됨"}`}
            >
              {category.icon} {category.name}
            </Button>
          );
        })}
      </div>
      <Button onClick={handleNext} disabled={!value} fullWidth>
        다음
      </Button>
    </div>
  );
}
