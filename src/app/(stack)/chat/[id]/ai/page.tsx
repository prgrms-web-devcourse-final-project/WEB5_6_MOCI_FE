import StackHeader from "@/shared/components/StackHeader";
import ChatListAi from "../components/ChatListAi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 채팅방",
  description: "AI 채팅방",
};

async function Page({ params }: { params: Promise<{ id: number }> }) {
  const param = await params;
  const id = param.id; 
  
  return (
    <>
      <StackHeader />
      <main className="relative max-h-[calc(100dvh-48px)] flex flex-col flex-1 min-h-0">
        <ChatListAi id={id} />
      </main>
    </>
  );
}
export default Page;
