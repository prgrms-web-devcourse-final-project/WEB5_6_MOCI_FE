/**
 * 매니저 메인 컴포넌트
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

const publicRoomsData = [
  {id: 1, mentee_nickname: "멘티1", title: "제목1", category: "KTX", digital_level: "1"},
  {id: 2, mentee_nickname: "멘티2", title: "제목2", category: "버스", digital_level: "5"},
  {id: 3, mentee_nickname: "멘티3", title: "제목3", category: "쿠팡", digital_level: "2"},
];

function ManagerMain() { 
  const router = useRouter();
  
  const handleEnterRoom = (roomId:number) => {
    console.log("채팅방 입장", roomId);
    router.push(`/chat/${roomId}`)
  }

  return (
  <div className="flex flex-col">
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
    </div>

    {/*전체 채팅방*/}
    <div className="mt-6">
      <h2 className="px-6 pb-4 text-xl font-bold border-b-2 border-darkgreen-default">전체 채팅방</h2>
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
    </div>
  </div>
  );
}
export default ManagerMain;
