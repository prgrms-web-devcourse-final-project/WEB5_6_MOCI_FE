"use client";

import Hamburger from "@/assets/icons/hamburger.svg";
import UserIcon from "@/assets/icons/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import gsap from "gsap";

function MainHeader() {
  const [openNav, setOpenNav] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (openNav) {
      gsap.to(navRef.current, {
        x: "100%",
        opacity: 100,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    if (!openNav) {
      gsap.to(navRef.current, {
        x: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [openNav]);

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[650px] min-w-[350px] flex justify-between items-center px-4 h-12 z-10 shadow-md">
        <button
          type="button"
          className="px-2 h-full"
          onClick={() => setOpenNav(!openNav)}
        >
          <Hamburger />
        </button>

        <Link href={"/main"} aria-label="메인페이지로 이동" className="h-full">
          <Image
            src={"/logo.png"}
            aria-label="로고 이미지"
            alt="디딤돌 로고"
            width={50}
            height={40}
          />
        </Link>
        <Link
          href={"/my-page"}
          aria-label="내 정보 페이지로 이동"
          className="flex flex-col justify-center items-center h-full px-2"
        >
          <UserIcon />
          <span className="text-sm font-normal">내 정보</span>
        </Link>
      </header>
      <Navbar ref={navRef} closeNav={() => setOpenNav(false)} />
    </>
  );
}
export default MainHeader;
