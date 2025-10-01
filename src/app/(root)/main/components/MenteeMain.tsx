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


// TODO : 임시 데이터 => 나중에 api로 바꾸기
 const myRoomsData = [
  {id: 1, question: "멘토링 질문입니다."},
  {id: 2, question: "두번째 질문입니다."},
  {id: 3, question: "세번째 질문입니다."},
  {id: 4, question: "세번째 질문입니다."},
  {id: 5, question: "세번째 질문입니다."},
  // {id: 6, question: "세번째 질문입니다."},
  // {id: 7, question: "세번째 질문입니다."},
  // {id: 8, question: "세번째 질문입니다."},
  // {id: 9, question: "세번째 질문입니다."},
  // {id: 10, question: "세번째 질문입니다."},
  // {id: 11, question: "세번째 질문입니다."},
  // {id: 12, question: "세번째 질문입니다."},
];

function MenteeMain() {
  const router = useRouter();

  const handleEnterRoom = (roomId: number) => {
    console.log("입장", roomId);
    router.push(`/chat/${roomId}`)
  };

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
      <h2 className="px-6 pb-4 text-xl font-bold border-b-2 border-darkgreen-default">나의 채팅방</h2>
      <ChatRoomList emptyMessage="참여중인 채팅방이 없습니다.">
        {myRoomsData.map(room => (
          <MyChatRoomCard
            key={room.id}
            question={room.question}
            onEnter={()=>handleEnterRoom(room.id)}
          />
        ))}
      </ChatRoomList>
    </div>
    </div>
    
  );
}
export default MenteeMain;
