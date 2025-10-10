"use client";
import { endChatByMento } from "@/api/endChatByMento";
import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";
import { createAIChatRoom } from "@/api/createAIChatRoom";
import { APIerror } from "@/api/getChatMsgMento";
import { deleteMentoChatRoom } from "@/api/deleteMentoChatRoom";
import { useRouter } from "next/navigation";

function ChatRoomButton({
  id,
  category,
  question,
  hasmento,
  end,
}: {
  id: string;
  category: string;
  question: string;
  hasmento: boolean;
  end: boolean;
}) {
  const router = useRouter();
  const role = useAuthStore((s) => s.user?.role);
  const formData = {
    category,
    question,
    target: "ai",
  };
  const endChat = async () => {
    await endChatByMento(id);
  };
  const askToAI = async () => {
    try {
      const aiChatRoom = await createAIChatRoom(
        formData.category,
        formData.question
      );

      await deleteMentoChatRoom(id);
      router.push(`/chat/${aiChatRoom.id}/ai`);
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
