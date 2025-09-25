/**
 * 교육자료실로 이동할 수 있는 ButtonGroup 컴포넌트
 */
import tw from "@/utils/tw";
import Link from "next/link";

type ButtonItem = {
  icon?: React.ReactNode;
  label:string;
  href:string;
  className?:string;
}

type ButtonGroupProps = {
  items: ButtonItem[];
}

function ButtonGroup({items}: ButtonGroupProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      {items.map(({icon, label, href, className},i)=>(
        <Link
          key={i}
          href={href}
          className={tw(
            "border-2 border-yellow-default rounded-lg",
            "flex items-center justify-center px-1",
            "bg-white hover:bg-yellow-hover active:bg-yellow-hover hover:font-semibold",
            "transition-colors duration-150",
            "min-h-[60px]",
            className
          )}
          role="button" 
          aria-label={`${label}사용법으로 이동`}
      >
           <div className="flex items-center gap-3">
            <span aria-hidden="true">{icon}</span>
            <span className="text-xl">{label}</span>
          </div>
        </Link>
      ))} 
    </div>
  )
}
export default ButtonGroup