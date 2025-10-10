// import { usePathname } from "next/navigation";
import StackHeader from "@/shared/components/StackHeader";
// import { useEffect, useRef, useState } from "react";

import ChatListMento from "../components/ChatListMento";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const id = param.id;
  // const pathName = usePathname();

  // const [containerHeight, setContainerHeight] = useState<string>("100%");
  // const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  // const wrapperRef = useRef<HTMLDivElement>(null);
  // const sectionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const initialHeight = window.innerHeight; // 초기 화면 높이 저장

  //   const updateContainerHeight = () => {
  //     if (window.visualViewport && wrapperRef.current) {
  //       // 현재 요소의 위치 정보를 가져옴
  //       const rect = wrapperRef.current.getBoundingClientRect();

  //       // visualViewport 높이에서 현재 요소의 top 위치를 빼면 사용 가능한 높이
  //       const availableHeight = window.visualViewport.height - rect.top;

  //       // 키보드 열림 감지: visualViewport 높이가 초기 높이보다 상당히 작아졌는지 확인
  //       const heightDiff = initialHeight - window.visualViewport.height;
  //       setIsKeyboardOpen(heightDiff > 150); // 150px 이상 차이나면 키보드가 열린 것으로 판단

  //       // 최소 높이 보장
  //       const finalHeight = Math.max(availableHeight, 200);

  //       setContainerHeight(`${finalHeight}px`);

  //       if (heightDiff > 150) {
  //         setTimeout(() => {
  //           window.scrollTo({ top: 0 });
  //           sectionRef.current?.scrollTo({
  //             top: sectionRef.current.scrollHeight,
  //           });
  //         }, 101);
  //       }
  //     }
  //   };

  //   // 초기 설정 (렌더링 완료 후)
  //   const timer = setTimeout(updateContainerHeight, 100);

  //   if (window.visualViewport) {
  //     window.visualViewport.addEventListener("resize", updateContainerHeight);
  //   }

  //   window.addEventListener("resize", updateContainerHeight);

  //   return () => {
  //     clearTimeout(timer);
  //     if (window.visualViewport) {
  //       window.visualViewport.removeEventListener(
  //         "resize",
  //         updateContainerHeight
  //       );
  //     }
  //     window.removeEventListener("resize", updateContainerHeight);
  //   };
  // }, []);

  return (
    <>
      <StackHeader />
      <main className="relative max-h-[calc(100dvh-48px)] flex flex-col flex-1 min-h-0">
        <ChatListMento id={id} />
      </main>
    </>
  );
}
export default Page;
