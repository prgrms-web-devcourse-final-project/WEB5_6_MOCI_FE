/**
 * 멘토 메인 페이지 컴포넌트
 * - 탭 바와 탭 콘텐츠를 포함
 */
"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/shared/components/Button";
import RightArrow from "@/assets/icons/rightArrow.svg";
import MentorTabBar from "./MentorTabBar";
import MentorTabContent from "./MentorTabContent";

export type MentorTabType = "myRooms" | "findMentee" | "allRooms";

function MentorMain() {
  const [activeTab, setActiveTab] = useState<MentorTabType>("myRooms");

  return (
    <div className="w-full flex flex-col h-full">
      {/* 액션 버튼들 */}
      <div className="flex flex-col gap-4 p-6">
        <Button color="darkgreen" fullWidth hasIcon className="p-0">
          <Link
            href="/archive"
            className="flex items-center gap-2.5 w-full h-full px-4 py-3"
          >
            <RightArrow />
            교육 자료실로 이동
          </Link>
        </Button>
        
        <Button color="yellow" fullWidth hasIcon className="p-0">
          <Link
            href="/archive/request"
            className="flex items-center gap-2.5 w-full h-full px-4 py-3"
          >
            <RightArrow className="text-black" />
            자료요청게시판
          </Link>
        </Button>
      </div>

      {/*탭 이동*/}
      <MentorTabBar activeTab={activeTab} onChange={setActiveTab} />
      {/*각 탭의 콘텐츠*/}
      <div className="flex-1 overflow-y-auto min-h-0">
        <MentorTabContent activeTab={activeTab} />
      </div>
    </div>
  )
}
export default MentorMain;
