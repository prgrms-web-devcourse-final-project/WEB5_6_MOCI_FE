"use client";

import { getChatMsgAi } from "@/api/getChatMsgAi";
import { postChatMsgAiStream } from "@/api/postChatMsgAiStream"; //  새로 만든 스트리밍 함수
import { useEffect, useState, useRef, FormEvent } from "react";
import Chat from "./Chat";
import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";

type AiMessage = {
  id: number | string;
  roomId: number;
  senderType: "HUMAN" | "AI";
  content: string;
  createdAt: string;
  senderName: string;
};

function ChatListAi({ id }: { id: number }) {
  const [chatList, setChatList] = useState<AiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthStore((s) => s.user);
  const [isComposing, setIsComposing] = useState(false);

  // 스크롤 맨 아래로
  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 첫 메시지 불러오기
  useEffect(() => {
    const getChats = async () => {
      try {
        const chats = await getChatMsgAi(id); // 배열 반환
        const now = Date.now();

        // 배열에서 HUMAN 메시지 찾기
        const humanMsg = chats.find((m) => m.senderType === "HUMAN");
        const humanCreatedAt = humanMsg
          ? new Date(humanMsg.createdAt).getTime()
          : 0;
        const diffSeconds = (now - humanCreatedAt) / 1000;

        // 조건: 메시지가 2개뿐이고, HUMAN 메시지가 지금으로부터 4초 이내
        const isFirstQuestion = chats.length === 2 && diffSeconds < 4;

        if (isFirstQuestion && humanMsg) {
          // Human 먼저 보여주고
          setChatList([humanMsg]);

          // 1초 뒤에 AI 응답 추가
          setTimeout(() => {
            setChatList(chats);
          }, 1000);
        } else {
          // 첫 질문이 아니면 전체 메시지 바로 보여주기
          setChatList(chats || []);
        }
      } catch {
        alert("채팅을 불러오지 못했습니다.");
        setChatList([]);
      } finally {
        setLoading(false);
      }
    };
    getChats();
  }, [id]);

  // 새 메시지가 생길 때마다 스크롤
  useEffect(() => {
    if (!loading) scrollToBottom();
  }, [chatList, loading]);

  // 메시지 전송
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sending || isComposing) return;

    setSending(true);
    const content = inputValue;
    setInputValue("");

    // 유저 메시지를 먼저 추가
    setChatList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        roomId: id,
        senderType: "HUMAN",
        content,
        createdAt: new Date().toISOString(),
        senderName: user!.name,
      },
    ]);

    // AI 메시지 "빈 껍데기" 하나 추가 → 이후 chunk마다 업데이트
    const aiMsgId = crypto.randomUUID();
    setChatList((prev) => [
      ...prev,
      {
        id: aiMsgId,
        roomId: id,
        senderType: "AI",
        content: "",
        createdAt: new Date().toISOString(),
        senderName: "챗봇 딤돌이",
      },
    ]);

    try {
      await postChatMsgAiStream(
        id,
        content,
        (msg) => {
          // chunk가 들어올 때마다 AI 메시지 업데이트
          setChatList((prev) =>
            prev.map((m) =>
              m.id === aiMsgId
                ? { ...m, content: m.content + (msg + "\n") } // 줄바꿈 보존
                : m
            )
          );
        },
        undefined,
        () => {
          alert("메시지를 보낼 수 없습니다.");
        }
      );
    } finally {
      setSending(false);
      scrollToBottom();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  //엔터키 전송, 쉬프트 엔터 줄바꿈
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (loading) return <p className="text-xl">메시지 불러오는 중...</p>;

  return (
    <>
      <section
        className={` ${
          user?.role !== "ADMIN" && "mb-20"
        } min-h-0 flex-1 flex flex-col overflow-y-auto`}
        aria-live="polite"
        aria-label={`AI 채팅 메시지 목록 ${chatList.map(
          (m) => `${m.senderName}가 보낸 메시지 ${m.content}`
        )}`}
      >
        {!chatList || chatList.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-xl text-darkgray" aria-live="polite">
              채팅이 없습니다
            </p>
          </div>
        ) : (
          chatList.map((msg) => (
            <Chat
              key={msg.id}
              text={msg.content}
              sender={msg.senderType === "HUMAN" ? "me" : "others"}
              isMarkdown={msg.senderType === "AI"}
              senderName={msg.senderName}
              isAdmin={user?.role === "ADMIN"}
            />
          ))
        )}
      </section>

      {user?.role !== "ADMIN" && (
        <form
          onSubmit={handleSubmit}
          className="bg-lightyellow h-20 flex justify-between items-center p-3 shrink-0 absolute bottom-0 left-0 right-0 gap-3"
        >
          <textarea
            name="chatInputField"
            id="chatInputField"
            className="flex-1 bg-white rounded-full border-2 text-xl p-3 resize-none h-fit disabled:bg-gray"
            rows={1}
            placeholder="질문을 입력하세요"
            value={inputValue}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="메시지 입력창"
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={sending}
            aria-label="메시지 보내기"
          >
            {sending ? "전송 중..." : "보내기"}
          </Button>
        </form>
      )}
    </>
  );
}

export default ChatListAi;
