import CloseIcon from "@/assets/icons/CloseIcon";
import { RefObject } from "react";
import tw from "@/utils/tw";

interface Props {
  ref: RefObject<HTMLDivElement | null>;
  closeNav: () => void;
}

function Navbar({ ref: outRef, closeNav }: Props) {
  return (
    <aside
      ref={outRef}
      className={tw(
        "fixed top-12 right-1/2 -translate-x-1/2 w-full h-full max-w-[650px] min-w-[350px] bg-white inset-shadow-sm px-4 flex flex-col gap-4 insert-0 z-10 opacity-0"
      )}
    >
      <div className="flex justify-between items-center mt-3.5">
        <span className="text-3xl font-bold select-none">바로가기</span>
        <button className="flex-center w-6 h-6" onClick={closeNav}>
          <CloseIcon />
        </button>
      </div>
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </aside>
  );
}
export default Navbar;
