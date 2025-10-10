import React from "react";

interface ChatType {
  text: string;
  sender: "me" | "others" | "system";
}

function Chat({ text, sender }: ChatType) {
  return (
    <div
      className={`relative w-fit h-fit p-3 text-xl rounded-lg m-5
          ${
            sender === "me"
              ? "bg-lightgreen rounded-br-none after:content-[''] after:absolute after:bottom-0  after:translate-y-full after:w-0 after:h-0 after:border-[12px] after:border-t-lightgreen after:border-b-0 after:border-transparent after:left-full  after:border-r-0 self-end after:-translate-x-full"
              : sender === "system"
              ? "bg-gray self-center text-center"
              : "bg-white border-2"
          }`}
    >
      {sender === "system" ? `채팅이 종료되었습니다` : text}
    </div>
  );
}

export default Chat;
