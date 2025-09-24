import tw from "@/utils/tw";
import { cva, VariantProps } from "class-variance-authority";

// 버튼컴포넌트
// variants : size [ sm, md ] , color [ green , darkGreen , yellow ] -> 중앙정렬
// fullWidth : w-full
// hasIcon : 왼쪽정렬 + gap 주기

const buttonVariants = cva(
  /* 공통스타일지정 
    rounded 8px, inline-flex, 가운데정렬, disabled : 커서🚫 color 변할 때 자연스럽게 변하도록(duration-150) 드래그 x 기본커서 : pointer 포커스되면 ring-2 disabled 색 gray&폰트 dark-gray font-bold*/
  "rounded-lg  inline-flex shrink-0 items-center justify-center disabled:cursor-not-allowed transition-colors duration-150 select-none cursor-pointer focus-visible:ring-2 disabled:bg-gray disabled:text-darkgray font-bold enabled:hover:shadow-2xl enabled:hover:scale-y-105 enabled:hover:ring-4 enabled:hover:ring-darkgreen-default enabled:active:shadow-2xl enabled:active:scale-y-105 enabled:active:ring-4 enabled:active:ring-darkgreen-default",
  {
    variants: {
      size: {
        sm: "w-fit h-fit px-1.5 py-1 text-xs", // sm 사이즈 : padding 4px 6px font-size 12px
        md: "w-fit h-fit px-4 py-3 text-xl", // md 사이즈 : padding 12px 16px font-size 20px
      },
      color: {
        green:
          "bg-green-default text-white hover:bg-green-hover active:bg-green-hover", // 초록색 - 글자 흰색
        darkgreen:
          "bg-darkgreen-default text-white hover:bg-darkgreen-hover active:bg-darkgreen-hover", // 짙은초록색 - 글자흰색
        yellow:
          "bg-yellow-default text-black hover:bg-yellow-hover active:bg-yellow-hover", // 노란색 - 글자 검정색
      },
    },
    // 기본값 : 초록 md 사이즈 버튼
    defaultVariants: {
      size: "md",
      color: "green",
    },
  }
);

// button 기본속성 + hasIcon + fullWidth 받음
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    hasIcon?: boolean;
    fullWidth?: boolean;
  };

function Button({
  children,
  size,
  color,
  hasIcon = false, // 아이콘 포함여부
  fullWidth = false, // 전체너비 차지 여부
  className, // 사용자지정 클래스이름
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={tw(
        buttonVariants({ size, color }),
        hasIcon && "w-full gap-2.5 justify-start", // 아이콘 포함 시 전체너비, gap 10px, 왼쪽정렬
        fullWidth && "w-full", // 전체너비
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
