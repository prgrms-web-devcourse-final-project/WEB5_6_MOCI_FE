"use client";

import { getChatMsgAi } from "@/api/getChatMsgAi";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Button from "@/shared/components/Button";
import Plus from "@/assets/icons/plus.svg";
import { useRouter } from "next/navigation";


type AiMessage = {
  id: number;
  roomId: number;
  senderType: "HUMAN" | "AI";
  content: string;
  createdAt: string;
};


function ChatListAi({ id }: { id: number }) {
  const [chatList, setChatList] = useState<AiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


   useEffect(() => {
    const getChats = async () => {
      try {
        const chats = await getChatMsgAi(id);
        setChatList(chats || []);
      } catch (err) {
        // if ((err as APIerror).status === 500) {
        //         alert("채팅방 조회 권한이 없습니다");
        //         router.push("/main");
        //       }
        //       if ((err as APIerror).status === 404) {
        //         alert("채팅방이 존재하지 않습니다");
        //         router.push("/main");
        //       }
        console.error("채팅 불러오기 실패",err); //추후 console 지우기
        setChatList([]); 
      } finally {
        setLoading(false);
      }
    };
    getChats();
  }, [id, router]);

  if (loading) {
    return <p className="text-xl">메시지 불러오는 중...</p> }

  return (
    <>
    <section className="my-20 min-h-0 flex-1 flex flex-col overflow-y-auto">
      {!chatList || chatList.length === 0 ? (
        <p className="text-xl">채팅이 없습니다</p>
      ) : (
        chatList.map((msg) => (
          <Chat
            key={msg.id}
            text={msg.content}
            sender={msg.senderType === "HUMAN" ? "me" : "others"}
          />
        ))
      )}
    </section>
    <form className="bg-lightyellow h-20 flex  justify-between items-center p-3 shrink-0 absolute bottom-0 left-0 right-0 gap-3">
        <Plus className="top-auto cursor-pointer" />
        <textarea
          name="chatInputField"
          id="chatInputField"
          className="flex-1 bg-white rounded-full border-2 text-xl p-3 resize-none h-fit"
          rows={1}
          placeholder="질문을 입력하세요"
        />
        <Button type="submit" className="cursor-pointer">
          보내기
        </Button>
      </form>
    </>
  );
}

export default ChatListAi