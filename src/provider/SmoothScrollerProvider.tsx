"use client";

import { useEffect, useRef } from "react";

function SmoothScrollerProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    let smoother: { kill(): void };

    (async () => {
      if (typeof window === "undefined") return;

      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
        const { ScrollSmoother } = await import("gsap/dist/ScrollSmoother");

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        await new Promise((resolve) => {
          if (document.readyState === "complete") {
            resolve(true);
          } else {
            window.addEventListener("load", () => resolve(true));
          }
        });

        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        initialized.current = true;
      } catch {
        console.error("ScrollSmoother 초기화 실패");
      }
    })();

    return () => {
      if (smoother) {
        smoother.kill();
        initialized.current = false;
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
export default SmoothScrollerProvider;
