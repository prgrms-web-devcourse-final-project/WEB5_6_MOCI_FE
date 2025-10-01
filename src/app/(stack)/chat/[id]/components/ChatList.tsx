"use client";
import { getChatMsgMento } from "@/api/getChatMsgMento";
import Chat from "./Chat";
import Plus from "@/assets/icons/plus.svg";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/shared/components/Button";

function ChatListMento({ id }: { id: number }) {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const getChats = async () => {
      const chats = await getChatMsgMento(id);
      setChatList(chats);
    };
    getChats();
  }, [id]);

  const user = useAuthStore((s) => s.user);
  const name = user?.name;

  return (
    <>
      <section
        // ref={sectionRef}
        className="my-20 min-h-0 flex-1 flex flex-col overflow-y-auto"
      >
        {!chatList || chatList.length === 0 ? (
          <p className="text-xl">채팅이 없습니다</p>
        ) : (
          chatList.map(({ sender, content, _attachmentId }, i) => (
            <Chat
              key={i} // messageId로 수정해야될 것 같음
              text={content}
              sender={name === sender ? "me" : "others"}
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

export default ChatListMento;
