import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatType {
  text: string;
  sender: "me" | "others";
  isMarkdown?: boolean;
}

function Chat({ text, sender, isMarkdown = false }: ChatType) {
  return (
    <div
      className={`relative w-fit h-fit p-3 text-xl rounded-lg m-5
          ${
            sender === "me"
              ? "bg-lightgreen rounded-br-none after:content-[''] after:absolute after:bottom-0  after:translate-y-full after:w-0 after:h-0 after:border-[12px] after:border-t-lightgreen after:border-b-0 after:border-transparent after:left-full  after:border-r-0 self-end after:-translate-x-full"
              : "bg-white border-2"
          }`}
    >
      {isMarkdown ? (
        <ReactMarkdown>{text}</ReactMarkdown>
      ) : (
        <p className="whitespace-pre-wrap">{text}</p>
      )}
    </div>
  );
}

export default Chat;
