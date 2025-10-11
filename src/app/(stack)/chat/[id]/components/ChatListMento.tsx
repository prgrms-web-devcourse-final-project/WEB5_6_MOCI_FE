"use client";
import Chat from "./Chat";
import Plus from "@/assets/icons/plus.svg";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/shared/components/Button";
import useChatMento from "../hooks/useChatMento";
import ChatRoomButton from "./ChatRoomButton";
import Help from "@/assets/icons/help.svg";

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
      <div className="h-20 p-3 flex-center absolute left-0 right-0 shrink-0">
        <ChatRoomButton
          id={id}
          hasmento={messages?.find((m) => m.sender !== name) ? true : false}
          end={
            messages?.at(-1)?.id === null ||
            messages?.at(-1)?.sender === "System"
          }
        />
        <>
          <button
            type="button"
            className="bg-lightgreen p-2 rounded-full absolute top-auto right-2 hover:bg-lightyellow hover:scale-105 hover:ring-4 hover:ring-yellow-default active:bg-lightyellow active:scale-105 active:ring-4 active:ring-yellow-default  peer cursor-pointer"
          >
            <Help />
          </button>
          <p className="absolute -top-11.5 right-1 z-1000 p-2 bg-yellow-hover text-xl rounded-lg font-bold hidden peer-hover:block peer-active:block">
            채팅방 이용방법을 확인하려면 클릭하세요
          </p>
        </>
      </div>
      <section
        ref={sectionRef}
        className="my-20 min-h-0 flex-1 flex flex-col overflow-y-auto"
      >
        {connectionStatus === "연결되었습니다" ? (
          !messages || messages.length === 0 ? (
            <p className="text-xl text-center">채팅이 없습니다</p>
          ) : (
            messages.map(({ id, sender, content }) => (
              <Chat
                key={id}
                text={content}
                sender={
                  id === null || sender === "System"
                    ? "system"
                    : name === sender
                    ? "me"
                    : "others"
                }
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
          className="flex-1 bg-white rounded-full border-2 text-xl p-3 resize-none h-fit min-w-0 disabled:bg-gray"
          placeholder={
            messages?.at(-1)?.id === null
              ? "채팅방이 종료되었습니다"
              : "질문을 입력하세요"
          }
          onChange={handleText}
          value={text}
          disabled={messages?.at(-1)?.id === null || user?.role === "ADMIN"}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={messages?.at(-1)?.id === null}
        >
          보내기
        </Button>
      </form>
    </>
  );
}

export default ChatListMento;
