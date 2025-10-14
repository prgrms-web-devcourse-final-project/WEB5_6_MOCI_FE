"use client";
import Chat from "./Chat";
import Plus from "@/assets/icons/plus.svg";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/shared/components/Button";
import useChatMento from "../hooks/useChatMento";
import ChatRoomButton from "./ChatRoomButton";
import Help from "@/assets/icons/help.svg";
import { uploadFile } from "@/api/uploadFile";

function ChatListMento({ id }: { id: string }) {
  const [text, setText] = useState("");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    messages,
    connect,
    disconnect,
    sendMessage,
    connectionStatus,
    clientRef,
  } = useChatMento();

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

  // 클라이언트 없으면 연결해제
  useEffect(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    connect(id);

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSendMessage = async () => {
    if (text.trim() === "") {
      alert("채팅을 입력해주세요");
      return;
    }
    if (attachment) {
      try {
        const attachmentInfo = await uploadFile(attachment);
        sendMessage(text, id, attachmentInfo.id);
        setAttachment(null);
        setPreview(null);
        setText("");
      } catch (e) {
        alert(e);
      }
    } else {
      sendMessage(text, id);
      setText("");
    }
  };

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (isComposing) return;
    onSendMessage();
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachment(file);
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("5MB 이하의 이미지만 업로드할 수 있습니다.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
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
            aria-label="채팅 도움말"
          >
            <Help />
          </button>
          <p className="absolute -top-11.5 right-1 z-1000 p-2 bg-yellow-hover text-xl rounded-lg font-bold hidden peer-hover:block peer-active:block">
            채팅 입력창 왼쪽의 + 버튼을 통해 사진을 전송할 수 있습니다
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
            messages.map(({ id, sender, content, attachmentUrl }) => (
              <Chat
                key={id}
                text={content}
                imageUrl={attachmentUrl}
                onLoadComplete={scrollToBottom}
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
        <label htmlFor="사진업로드">
          <Plus className="top-auto cursor-pointer" />
        </label>
        <input
          type="file"
          name="사진업로드"
          id="사진업로드"
          className="hidden"
          onChange={handleImage}
          disabled={messages?.at(-1)?.id === null || user?.role === "ADMIN"}
        />
        <textarea
          name="chatInputField"
          id="chatInputField"
          className="flex-1 bg-white rounded-full border-2 text-xl p-3 resize-none h-fit min-w-0 disabled:bg-gray"
          placeholder={
            messages?.at(-1)?.id === null
              ? "채팅방이 종료되었습니다"
              : "질문을 입력하세요"
          }
          rows={1}
          onChange={handleText}
          value={text}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          disabled={messages?.at(-1)?.id === null || user?.role === "ADMIN"}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={messages?.at(-1)?.id === null || user?.role === "ADMIN"}
        >
          보내기
        </Button>
      </form>
      {preview && (
        <div className="bg-white rounded-t-xl p-5 inset-shadow-sm absolute bottom-20">
          <p className="text-xl pb-2 text-center font-bold">사진미리보기</p>
          <div className="flex-center flex-col gap-4">
            <span className="w-40 h-40 overflow-clip">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  width={160}
                  height={160}
                  alt="미리보기"
                ></img>
              }
            </span>

            <Button
              color="darkgreen"
              fullWidth
              onClick={() => {
                setAttachment(null);
                setPreview(null);
              }}
            >
              삭제
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatListMento;
