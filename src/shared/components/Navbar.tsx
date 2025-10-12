import CloseIcon from "@/assets/icons/close.svg";
import { RefObject } from "react";
import NavItems from "./NavItems";

interface Props {
  openNav: boolean;
  navRef: RefObject<HTMLDivElement | null>;
  closeNav: () => void;
}

function Navbar({ navRef: outRef, closeNav, openNav }: Props) {
  return (
    <aside
      ref={outRef}
      className={`fixed top-12 right-1/2 -translate-x-1/2 w-full h-[calc(100dvh-48px)] max-w-[650px] min-w-[350px] bg-white inset-shadow-sm px-4 flex flex-col gap-5  z-10 ${
        openNav
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 pointer-events-none invisible"
      }`}
    >
      <div className="flex justify-between items-center mt-3.5">
        <span className="text-3xl font-bold select-none">바로가기</span>
        <button className="flex-center w-6 h-6" onClick={closeNav}>
          <CloseIcon />
        </button>
      </div>
      <ul>
        <NavItems closeNav={closeNav} />
      </ul>
    </aside>
  );
}
export default Navbar;
