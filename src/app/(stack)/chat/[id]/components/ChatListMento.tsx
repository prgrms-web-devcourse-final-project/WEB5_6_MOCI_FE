"use client";
import Chat from "./Chat";
import Plus from "@/assets/icons/plus.svg";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/shared/components/Button";
import useChatMento from "../hooks/useChatMento";

function ChatListMento({ id }: { id: string }) {
  const [text, setText] = useState("");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { messages, connect, disconnect, sendMessage, connectionStatus } =
    useChatMento();

  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 연결된 상태에서 메시지 새로 올라오면 맨밑으로 스크롤
  useEffect(() => {
    if (connectionStatus === "연결되었습니다") scrollToBottom();
  }, [messages, connectionStatus]);

  // // 클라이언트 없으면 연결해제
  // useEffect(() => {
  //   if (clientRef.current) {
  //     clientRef.current.deactivate();
  //   }
  // }, []);

  useEffect(() => {
    connect(id);

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSendMessage = () => {
    sendMessage(text, id);
    setText("");
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    onSendMessage();
  };

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const user = useAuthStore((s) => s.user);
  const name = user?.name;

  return (
    <>
      <section
        ref={sectionRef}
        className="my-20 min-h-0 flex-1 flex flex-col overflow-y-auto"
      >
        {connectionStatus === "연결되었습니다" ? (
          !messages || messages.length === 0 ? (
            <p className="text-xl text-center">채팅이 없습니다</p>
          ) : (
            messages.map(({ sender, content }, i) => (
              <Chat
                key={i} // messageId로 수정해야될 것 같음
                text={content}
                sender={name === sender ? "me" : "others"}
              />
            ))
          )
        ) : (
          <p className="text-xl text-center">{connectionStatus}</p>
        )}
      </section>
      <form
        className="bg-lightyellow h-20 flex  justify-between items-center p-3 shrink-0 absolute bottom-0 left-0 right-0 gap-3"
        onSubmit={send}
      >
        <Plus className="top-auto cursor-pointer" />
        <input
          name="chatInputField"
          id="chatInputField"
          className="flex-1 bg-white rounded-full border-2 text-xl p-3 resize-none h-fit"
          placeholder="질문을 입력하세요"
          onChange={handleText}
          value={text}
        />
        <Button type="submit" className="cursor-pointer">
          보내기
        </Button>
      </form>
    </>
  );
}

export default ChatListMento;
