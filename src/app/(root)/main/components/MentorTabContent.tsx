/**
 * 멘토 탭 콘텐츠 컴포넌트
 * - 선택된 탭에 따라 다른 콘텐츠를 렌더링
 */

import { useRouter } from "next/navigation";
import ChatRoomList from "./chatroom/ChatRoomList";
import MyChatRoomCard from "./chatroom/MyChatRoomCard";
import PublicChatRoomCard from "./chatroom/PublicChatRoomCard";
import { MentorTabType } from "./MentorMain";
import { useEffect, useState } from "react";
import { handleEnterRoomMentor } from "./MenteeMain";
import {
  getAllChatrooms,
  getMentorChatrooms,
  getNoMentorChatrooms,
} from "@/api/getChatrooms";
import { APIerror } from "@/api/getChatMsgMento";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { joinChatRoom } from "@/api/joinChatRoom";

// TODO : 임시 데이터 => 나중에 api로 바꾸기
//  const myRoomsData = [
//   {id: 1, question: "멘토링 질문입니다."},
//   {id: 2, question: "두번째 질문입니다."},
//   {id: 3, question: "세번째 질문입니다."},
// ];

//  const publicRoomsData = [
//   {id: 1, mentee_nickname: "멘티1", title: "제목1", category: "KTX", digital_level: "1"},
//   {id: 2, mentee_nickname: "멘티2", title: "제목2", category: "버스", digital_level: "5"},
//   {id: 3, mentee_nickname: "멘티3", title: "제목3", category: "쿠팡", digital_level: "2"},
// ];

function MentorTabContent({ activeTab }: { activeTab: MentorTabType }) {
  const router = useRouter();
  const [mentorRoomsData, setMentorRoomsData] =
    useState<{ id: number; question: string; category: string }[]>();
  const [noMentorRoomsData, setNoMentorRoomsData] =
    useState<
      { id: number; title: string; digital_level: number; category: string }[]
    >();
  const [allRoomsData, setAllRoomsData] = useState<
    {
      id: number;
      title: string;
      digital_level: number;
      category: string;
    }[]
  >();

  useEffect(() => {
    const getMentorChatroom = async () => {
      const res = await getMentorChatrooms();
      setMentorRoomsData(res);
    };
    try {
      getMentorChatroom();
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
      setMentorRoomsData([]);
    }
  }, []);
  useEffect(() => {
    const getNoMentorChatroom = async () => {
      const res = await getNoMentorChatrooms();
      setNoMentorRoomsData(res);
    };
    try {
      getNoMentorChatroom();
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
      setNoMentorRoomsData([]);
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

  const mentorJoinChatRoom = async (id: number, router: AppRouterInstance) => {
    try {
      await joinChatRoom(id);
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
    }
    handleEnterRoomMentor(id, router);
  };

  switch (activeTab) {
    case "myRooms":
      return (
        <ChatRoomList emptyMessage="참여중인 채팅방이 없습니다.">
          {mentorRoomsData &&
            mentorRoomsData.length !== 0 &&
            mentorRoomsData.map((room) => (
              <MyChatRoomCard
                key={room.id}
                question={room.question}
                onEnter={() => handleEnterRoomMentor(room.id, router)}
              />
            ))}
        </ChatRoomList>
      );
    case "findMentee":
      return (
        <ChatRoomList emptyMessage="생성된 채팅방이 없습니다.">
          {noMentorRoomsData &&
            noMentorRoomsData.length > 0 &&
            noMentorRoomsData.map((room) => (
              <PublicChatRoomCard
                key={room.id}
                mentee_nickname=""
                title={room.title}
                category={room.category}
                digital_level={String(room.digital_level)}
                onEnter={() => mentorJoinChatRoom(room.id, router)}
              />
            ))}
        </ChatRoomList>
      );
    case "allRooms":
      return (
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
        </ChatRoomList>
      );
    default:
      return null;
  }
}
export default MentorTabContent;
