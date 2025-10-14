/**
 * 멘티 메인 페이지 컴포넌트
 * - 교육 자료실 이동 버튼
 * - 새로운 질문하기 버튼
 * - 나의 채팅방 리스트
 */
"use client";
import Button from "@/shared/components/Button";
import RightArrow from "@/assets/icons/rightArrow.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChatRoomList from "./chatroom/ChatRoomList";
import MyChatRoomCard from "./chatroom/MyChatRoomCard";
import { useEffect, useState } from "react";
import { getAIChatrooms, getChatrooms } from "@/api/getChatrooms";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { APIerror } from "@/api/getChatMsgMento";
import { TabType } from "./ManagerMain";
import TabBar from "./TabBar";

export const handleEnterRoomMentor = (
  roomId: number,
  router: AppRouterInstance
) => {
  router.push(`/chat/${roomId}/mentor`);
};

export const handleEnterRoomAI = (
  roomId: number,
  router: AppRouterInstance
) => {
  router.push(`/chat/${roomId}/ai`);
};

function MenteeMain() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("MENTOR");
  

  const [myRoomsData, setMyRoomsData] =
    useState<{ id: number; question: string; unread_count: number }[]>();
  const [myAIRoomsData, setMyAIRoomsData] =
    useState<{ id: number; title: string }[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await getChatrooms();
        setMyRoomsData(res);
      } catch (e) {
        const error = e as APIerror;
        alert(error.message);
        setMyRoomsData([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getAIChatroom = async () => {
      const res = await getAIChatrooms();
      setMyAIRoomsData(res.rooms);
    };
    try {
      getAIChatroom();
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
      setMyAIRoomsData([]);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 p-6">
        {/*교육 자료실 이동 버튼 */}
        <Button color="darkgreen" fullWidth hasIcon className="p-0">
          <Link
            href="/archive"
            className="flex items-center gap-2.5 w-full h-full px-4 py-3"
          >
            <RightArrow />
            교육 자료실로 이동
          </Link>
        </Button>

        {/*새로운 질문하기 버튼 */}
        <Button color="yellow" fullWidth hasIcon className="p-0">
          <Link
            href="/chat/create"
            className="flex items-center gap-2.5 w-full h-full px-4 py-3"
          >
            <RightArrow className="text-black" />
            새로운 질문하기
          </Link>
        </Button>
      </div>

      {/* 탭바 */}
      <TabBar
        activeTab={activeTab}
        onChange={setActiveTab}
        customLabels={{
          MENTOR: "나의 멘토 채팅방",
          AI: "나의 AI 채팅방",
        }}
      />

      {/* 탭별 콘텐츠 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === "MENTOR" ? (
          <>
            <ChatRoomList
              emptyMessage="참여중인 멘토 채팅방이 없습니다."
              isLoading={isLoading}
            >
              {myRoomsData &&
                myRoomsData.length > 0 &&
                myRoomsData.map((room) => (
                  <MyChatRoomCard
                    key={room.id}
                    question={room.question}
                    onEnter={() => handleEnterRoomMentor(room.id, router)}
                    unreadCount={room.unread_count}
                  />
                ))}
            </ChatRoomList>
          </>
        ) : (
          <>
            <ChatRoomList
              emptyMessage="참여중인 AI 채팅방이 없습니다."
              isLoading={isLoading}
            >
              {myAIRoomsData &&
                myAIRoomsData.length > 0 &&
                myAIRoomsData.map((room) => (
                  <MyChatRoomCard
                    key={room.id}
                    question={room.title}
                    onEnter={() => handleEnterRoomAI(room.id, router)}
                  />
                ))}
            </ChatRoomList>
          </>
        )}
      </div>
    </div>
  );
}
export default MenteeMain;
