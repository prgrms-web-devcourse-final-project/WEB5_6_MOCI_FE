/**
 * 멘토 메인 페이지 컴포넌트
 * - 탭 바와 탭 콘텐츠를 포함
 */
"use client";
import { useState } from "react";
import MentorTabBar from "./MentorTabBar";
import MentorTabContent from "./MentorTabContent";

export type MentorTabType = "myRooms" | "findMentee" | "allRooms";

function MentorMain() {
  const [activeTab, setActiveTab] = useState<MentorTabType>("myRooms");

  return (
    <div className="w-full flex flex-col">
      {/*탭 이동*/}
      <MentorTabBar activeTab={activeTab} onChange={setActiveTab} />
      {/*각 탭의 콘텐츠*/}
      <div>
        <MentorTabContent activeTab={activeTab} />
      </div>
    </div>
  )
}
export default MentorMain;
