import type { Metadata } from "next";
import CreateChatForm from "./components/CreateChatForm";

export const metadata: Metadata = {
  title: "채팅방 만들기",
  description: "채팅 생성 페이지",
};

export default function Page() {
  return <CreateChatForm />;
}
