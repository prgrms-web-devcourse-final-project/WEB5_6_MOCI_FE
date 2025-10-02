"use client";
// import { usePathname } from "next/navigation";
import Help from "@/assets/icons/help.svg";
import Button from "@/shared/components/Button";
import StackHeader from "@/shared/components/StackHeader";
import Plus from "@/assets/icons/plus.svg";

// import { useEffect, useRef, useState } from "react";
import Chat from "../components/Chat";

function Page() {
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
        {" "}
        <div className="h-20 p-3 flex-center absolute left-0 right-0 shrink-0">
          <button
            type="button"
            className="bg-lightgreen p-2 rounded-full absolute top-auto right-2 hover:bg-lightyellow hover:scale-105 hover:ring-4 hover:ring-yellow-default active:bg-lightyellow active:scale-105 active:ring-4 active:ring-yellow-default  peer cursor-pointer"
          >
            <Help />
          </button>
          <p className="absolute top-auto right-20 p-2 bg-yellow-hover text-xl rounded-lg font-bold hidden peer-hover:block peer-active:block">
            채팅방 이용방법을 확인하려면 클릭하세요
          </p>
        </div>
        <section
          // ref={sectionRef}
          className="my-20 min-h-0 flex-1 flex flex-col overflow-y-auto"
        >
          <Chat text="안녕하세요" sender="me" />
          <Chat text="안녕하세요" sender="others" />
          <Chat text="안녕하세요" sender="me" />
          <Chat text="안녕하세요" sender="others" />
          <Chat text="안녕하세요" sender="me" />
          <Chat text="안녕하세요" sender="others" />
          <Chat text="안녕하세요" sender="me" />
          <Chat text="안녕하세요" sender="others" />
          <Chat text="안녕하세요" sender="me" />
          <Chat text="안녕하세요" sender="others" />
          <Chat text="안녕하세요" sender="me" />
          <Chat text="안녕하세요" sender="others" />
        </section>
        <form className="bg-lightyellow h-20 flex  justify-between items-center p-3 shrink-0 absolute bottom-0 left-0 right-0 gap-3">
          <Plus className="top-auto cursor-pointer" />
          <textarea
            name="chatInputField"
            id="chatInputField"
            className="flex-1 bg-white rounded-full border-2 text-xl p-3 resize-none h-fit"
            rows={1}
            placeholder="질문을 입력하세요"
          />
          <Button type="submit" className="cursor-pointer">
            보내기
          </Button>
        </form>
      </main>
    </>
  );
}
export default Page;
