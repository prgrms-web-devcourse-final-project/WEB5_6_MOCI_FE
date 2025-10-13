"use client";

import Hamburger from "@/assets/icons/hamburger.svg";
import UserIcon from "@/assets/icons/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import gsap from "gsap";
import Button from "./Button";
import { useAuthStore } from "@/store/authStore";

function MainHeader() {
  const [openNav, setOpenNav] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (openNav) {
      gsap.to(navRef.current, {
        x: "100%",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        x: 0,
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [openNav]);

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[650px] min-w-[350px] flex justify-between items-center px-4 h-12 z-10 shadow-md bg-white">
        <button
          type="button"
          className="px-2 h-full"
          onClick={() => setOpenNav(!openNav)}
        >
          <Hamburger />
        </button>

        <Link
          href={"/main"}
          aria-label="메인페이지로 이동"
          className="h-full absolute top-auto right-1/2 translate-x-1/2"
        >
          <Image
            src={"/logo.png"}
            aria-label="로고 이미지"
            alt="디딤돌 로고"
            width={50}
            height={40}
          />
        </Link>
        {user ? (
          <Link
            href={"/my-page"}
            aria-label="내 정보 페이지로 이동"
            className="flex flex-col justify-center items-center h-full px-2"
          >
            <UserIcon />
            <span className="text-sm font-normal">내 정보</span>
          </Link>
        ) : (
          <Button className="px-2.5 py-1.5 hover:scale-y-100 active:scale-y-100">
            <Link href={"/login"} aria-label="로그인페이지로 이동">
              로그인
            </Link>
          </Button>
        )}
      </header>
      <Navbar
        navRef={navRef}
        closeNav={() => setOpenNav(false)}
        openNav={openNav}
      />
    </>
  );
}
export default MainHeader;
