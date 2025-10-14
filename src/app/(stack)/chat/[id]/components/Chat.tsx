import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { BASE_URL } from "@/api/constants/config";

interface ChatType {
  text: string;
  sender: "me" | "others" | "system";
  isMarkdown?: boolean;
  imageUrl?: string;
  onLoadComplete?: () => void;
  senderName: string;
  isAdmin?: boolean;
  role?: "USER" | "MENTOR" | "ADMIN" | undefined;
}

function Chat({
  text,
  sender,
  isMarkdown = false,
  imageUrl,
  onLoadComplete,
  senderName,
  isAdmin = false,
  role,
}: ChatType) {
  return (
    <>
      <div
        className={`relative w-fit max-w-80 h-fit ${
          imageUrl ? "p-5 pb-3 flex-col items-end" : "p-3"
        } text-xl rounded-lg m-5 mt-10
          ${
            sender === "me"
              ? "bg-lightgreen rounded-br-none after:content-[''] after:absolute after:bottom-0  after:translate-y-full after:w-0 after:h-0 after:border-[12px] after:border-t-lightgreen after:border-b-0 after:border-transparent after:left-full  after:border-r-0 self-end after:-translate-x-full"
              : sender === "system"
              ? "bg-gray self-center text-center"
              : "bg-white border-2"
          }`}
      >
        {imageUrl && (
          <Image
            width={0}
            height={0}
            sizes="225px"
            style={{ width: "auto", height: "auto", maxWidth: "225px" }}
            src={`${BASE_URL}/${imageUrl}`}
            alt="첨부파일"
            className="pb-2"
            onLoad={onLoadComplete}
            priority
          />
        )}
        {sender === "system" ? (
          `채팅이 종료되었습니다`
        ) : isMarkdown ? (
          <ReactMarkdown>{text}</ReactMarkdown>
        ) : (
          <p className={`whitespace-pre-wrap`}>{text}</p>
        )}
        <div
          className={`absolute  whitespace-nowrap -top-8 text-xl w-full${
            sender === "me" ? "self-end  right-0" : "self-start left-0 "
          }`}
        >
          {senderName === "챗봇 딤돌이" && (
            <Image
              src={"/user_profile.png"}
              aria-label="로고 이미지"
              alt="디딤돌 로고"
              width={45}
              height={30}
              style={{ display: "inline" }}
            />
          )}
          {isAdmin
            ? senderName
            : sender === "me"
            ? ""
            : sender === "system"
            ? ""
            : senderName}
          {/* {sender === "me"
            ? ""
            : role === "MENTOR"
            ? ""
            : role === "USER"
            ? " 멘토🐰"
            : ""} */}
        </div>
      </div>
    </>
  );
}

export default Chat;
