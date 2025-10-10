"use client";
import { endChatByMento } from "@/api/endChatByMento";
import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";
import { createAIChatRoom } from "@/api/createAIChatRoom";
import { APIerror } from "@/api/getChatMsgMento";
import { deleteMentoChatRoom } from "@/api/deleteMentoChatRoom";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMentorChatRoomInfo } from "@/api/getMentorChatRoomInfo";

function ChatRoomButton({
  id,
  hasmento,
  end,
}: {
  id: string;
  hasmento: boolean;
  end: boolean;
}) {
  const router = useRouter();
  const role = useAuthStore((s) => s.user?.role);
  const [chatRoomInfo, setChatRoomInfo] = useState<{
    id: number;
    category: string;
    question: string;
  }>();

  useEffect(() => {
    async function getChatRoomInfo() {
      const res = await getMentorChatRoomInfo(id);
      setChatRoomInfo(res);
    }
    getChatRoomInfo();
  }, [id]);

  const endChat = async () => {
    await endChatByMento(id);
  };
  const askToAI = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (!chatRoomInfo) return;
      const aiChatRoom = await createAIChatRoom(
        chatRoomInfo.category,
        chatRoomInfo.question
      );

      router.push(`/chat/${aiChatRoom.id}/ai`);
      await deleteMentoChatRoom(id);
    } catch (e) {
      const error = e as APIerror;
      alert(error.message);
    }
  };

  const createNewChat = () => {
    router.push("/chat/create");
  };

  return (
    <>
      {role === "MENTOR" ? (
        <Button color="yellow" className="px-10 rounded-full" onClick={endChat}>
          채팅종료하기
        </Button>
      ) : end ? (
        <Button
          color="yellow"
          className="px-10 rounded-full"
          onClick={createNewChat}
        >
          새로운 채팅방 생성하기
        </Button>
      ) : (
        <Button
          color="yellow"
          className="px-15 rounded-full"
          onClick={askToAI}
          disabled={hasmento}
        >
          AI에게 물어보기
        </Button>
      )}
    </>
  );
}
export default ChatRoomButton;
