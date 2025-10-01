import Button from "@/shared/components/Button";
import StackHeader from "@/shared/components/StackHeader";
import Plus from "@/assets/icons/plus.svg";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <StackHeader />
      <main className="relative max-h-[calc(100dvh-48px)] flex flex-col flex-1 min-h-0">
        {children}

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

export default layout;
