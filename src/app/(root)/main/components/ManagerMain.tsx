/**
 * 관리자 메인 컴포넌트
 * - 교육 자료실로 이동 버튼
 * - 전체 채팅방 리스트
 */

"use client";
import Button from "@/shared/components/Button";
import Link from "next/link";
import RightArrow from "@/assets/icons/rightArrow.svg";
import ChatRoomList from "./chatroom/ChatRoomList";
import PublicChatRoomCard from "./chatroom/PublicChatRoomCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllChatrooms, getPublicAIChatrooms } from "@/api/getChatrooms";
import { APIerror } from "@/api/getChatMsgMento";
import { handleEnterRoomAI } from "./MenteeMain";

function ManagerMain() {
  const router = useRouter();
  const [publicAIRoomsData, setPublicAIRoomsData] =
    useState<{ id: number; title: string; category: string }[]>();
  const [allRoomsData, setAllRoomsData] = useState<
    {
      id: number;
      title: string;
      digital_level: number;
      category: string;
    }[]
  >();

  useEffect(() => {
    const getAIChatroom = async () => {
      const res = await getPublicAIChatrooms();
      setPublicAIRoomsData(res.rooms);
    };
    try {
      getAIChatroom();
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
      setPublicAIRoomsData([]);
    }
  }, []);

  useEffect(() => {
    const getAllChatroom = async () => {
      const res = await getAllChatrooms();
      setAllRoomsData(res);
    };
    try {
      getAllChatroom();
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
      setAllRoomsData([]);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
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

      {/*전체 채팅방*/}
      <div className="flex-1 overflow-y-auto min-h-0">
        <h2 className="px-6 pb-4 text-xl font-bold border-b-2 border-darkgreen-default">
          전체 채팅방
        </h2>
        <ChatRoomList emptyMessage="생성된 채팅방이 없습니다.">
          {allRoomsData &&
            allRoomsData.length !== 0 &&
            allRoomsData.map((room) => (
              <PublicChatRoomCard
                key={room.id}
                mentee_nickname=""
                title={room.title}
                category={room.category}
                digital_level={String(room.digital_level ?? "")}
              />
            ))}
          {publicAIRoomsData &&
            publicAIRoomsData.length !== 0 &&
            publicAIRoomsData.map((room) => (
              <PublicChatRoomCard
                key={room.id}
                mentee_nickname=""
                title={room.title}
                category={room.category}
                digital_level=""
                onEnter={() => handleEnterRoomAI(room.id, router)}
              />
            ))}
        </ChatRoomList>
      </div>
    </div>
  );
}
export default ManagerMain;
