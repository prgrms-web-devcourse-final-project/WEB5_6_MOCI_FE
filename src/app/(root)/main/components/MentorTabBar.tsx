/**
 * 멘토 탭 바 컴포넌트
 * - 나의 채팅방, 멘티 찾기, 전체 채팅방 탭 제공
 */
"use client";

import { MentorTabType } from "./MentorMain";

type MentorTabBarProps = {
  activeTab: MentorTabType;
  onChange: (tab: MentorTabType) => void;
}

const tabs: { key: MentorTabType; label: string }[] = [
  { key: "myRooms", label: "나의 채팅방" },
  { key: "findMentee", label: "멘티 찾기" },
  { key: "allRooms", label: "전체 채팅방" },
]

function MentorTabBar({ activeTab, onChange }: MentorTabBarProps) {
  return (
    <div className="flex border-b-2 border-gray">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-4 text-center text-lg ${
            activeTab === tab.key
              ? "border-b-2 border-darkgreen-default font-semibold"
              : "text-darkgray"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
export default MentorTabBar