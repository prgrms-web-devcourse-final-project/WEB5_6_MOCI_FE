/**
 * 관리자, 멘티 메인페이지 상단 탭바
 * 멘토 채팅방, AI 채팅방 탭으로 구성
 */
"use client";

import { TabType } from "./ManagerMain";

type TabBarProps = {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
  customLabels: Record<TabType, string>;
};

const tabs: TabType[] = ["MENTOR", "AI"];

function TabBar({ activeTab, onChange, customLabels }: TabBarProps) {
  return (
    <div className="flex border-b-2 border-gray">
      {tabs.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 py-2 text-center text-lg ${
            activeTab === key
              ? "border-b-2 border-darkgreen-default font-semibold"
              : "text-darkgray"
          }`}
          aria-label={`${customLabels[key]} 탭 ${
            activeTab === key ? "선택됨" : "선택되지 않음"
          }`}
        >
          {customLabels[key]}
        </button>
      ))}
    </div>
  );
}
export default TabBar;
