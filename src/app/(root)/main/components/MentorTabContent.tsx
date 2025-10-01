/**
 * 멘토 탭 콘텐츠 컴포넌트
 * - 선택된 탭에 따라 다른 콘텐츠를 렌더링
 */

import { useRouter } from "next/navigation";
import ChatRoomList from "./chatroom/ChatRoomList";
import MyChatRoomCard from "./chatroom/MyChatRoomCard";
import PublicChatRoomCard from "./chatroom/PublicChatRoomCard";
import { MentorTabType } from "./MentorMain"

// TODO : 임시 데이터 => 나중에 api로 바꾸기
 const myRoomsData = [
  {id: 1, question: "멘토링 질문입니다."},
  {id: 2, question: "두번째 질문입니다."},
  {id: 3, question: "세번째 질문입니다."},
];
 
 const publicRoomsData = [
  {id: 1, mentee_nickname: "멘티1", title: "제목1", category: "KTX", digital_level: "1"},
  {id: 2, mentee_nickname: "멘티2", title: "제목2", category: "버스", digital_level: "5"},
  {id: 3, mentee_nickname: "멘티3", title: "제목3", category: "쿠팡", digital_level: "2"},
];
 

function MentorTabContent({activeTab}:{activeTab:MentorTabType}) {
  const router = useRouter();

  const handleEnterRoom = (roomId:number) => {
    console.log("채팅방 입장", roomId);
    router.push(`/chat/${roomId}`)
  }

  switch(activeTab){
    case "myRooms":
      return (
        <ChatRoomList emptyMessage="참여중인 채팅방이 없습니다.">
          {myRoomsData.map(room => (
            <MyChatRoomCard 
              key={room.id}
              question={room.question}
              onEnter={()=>handleEnterRoom(room.id)}
            />
          ))}
        </ChatRoomList>
      );
    case "findMentee":
      return (
        <ChatRoomList emptyMessage="생성된 채팅방이 없습니다.">
          {publicRoomsData.map(room => (
            <PublicChatRoomCard
              key={room.id}
              mentee_nickname={room.mentee_nickname}
              title={room.title}
              category={room.category}
              digital_level={room.digital_level}
              onEnter={()=>handleEnterRoom(room.id)}
            />
          ))}
        </ChatRoomList>
      );
    case "allRooms":
      return (
        <ChatRoomList emptyMessage="생성된 채팅방이 없습니다.">
          {publicRoomsData.map(room => (
            <PublicChatRoomCard
              key={room.id}
              mentee_nickname={room.mentee_nickname}
              title={room.title}
              category={room.category}
              digital_level={room.digital_level}
              onEnter={()=>handleEnterRoom(room.id)}
            />
          ))}
        </ChatRoomList>
      );
    default:
      return null;
  }
}
export default MentorTabContent