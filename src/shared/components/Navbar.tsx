import CloseIcon from "@/assets/icons/close.svg";
import { RefObject, useEffect, useRef } from "react";
import NavItems from "./NavItems";

interface Props {
  openNav: boolean;
  navRef: RefObject<HTMLDivElement | null>;
  closeNav: () => void;
}

function Navbar({ navRef: outRef, closeNav, openNav }: Props) {
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  //navbar tap focus trap 설정
  useEffect(() => {
    if (openNav && outRef.current) {
      lastFocusedElement.current = document.activeElement as HTMLElement;

      const focusableElements = outRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (focusableElements.length === 0) return;

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            // Tab
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
        if (e.key === "Escape") {
          closeNav();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      first?.focus();

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        lastFocusedElement.current?.focus();
      };
    }
  }, [closeNav, openNav, outRef]);
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
        <button
          className="flex-center w-6 h-6"
          onClick={closeNav}
          aria-label="사이드바 닫기"
        >
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
