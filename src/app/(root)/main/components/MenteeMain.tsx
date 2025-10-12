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

export const handleEnterRoomMentor = (
  roomId: number,
  router: AppRouterInstance
) => {
  console.log("입장", roomId);
  router.push(`/chat/${roomId}/mentor`);
};

export const handleEnterRoomAI = (
  roomId: number,
  router: AppRouterInstance
) => {
  console.log("입장", roomId);
  router.push(`/chat/${roomId}/ai`);
};


function MenteeMain() {
  const router = useRouter();
  const [myRoomsData, setMyRoomsData] =
    useState<{ id: number; question: string }[]>();
  const [myAIRoomsData, setMyAIRoomsData] =
    useState<{ id: number; title: string }[]>();

  useEffect(() => {
    const getMenteeChatroom = async () => {
      const res = await getChatrooms();
      setMyRoomsData(res);
    };
    try {
      getMenteeChatroom();
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
      setMyRoomsData([]);
    }
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
    <div className="flex flex-col">
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

      {/*나의 채팅방 리스트 */}
      <div className="mt-6">
        <h2 className="px-6 pb-4 text-xl font-bold border-b-2 border-darkgreen-default">
          나의 채팅방
        </h2>
        <ChatRoomList emptyMessage="참여중인 채팅방이 없습니다.">
          {myRoomsData &&
            myRoomsData.length !== 0 &&
            myRoomsData.map((room) => (
              <MyChatRoomCard
                key={room.id}
                question={room.question}
                onEnter={() => handleEnterRoomMentor(room.id, router)}
              />
            ))}
          {myAIRoomsData &&
            myAIRoomsData.length !== 0 &&
            myAIRoomsData.map((room) => (
              <MyChatRoomCard
                key={room.id}
                question={room.title}
                onEnter={() => handleEnterRoomAI(room.id, router)}
              />
            ))}
        </ChatRoomList>
      </div>
    </div>
  );
}
export default MenteeMain;
