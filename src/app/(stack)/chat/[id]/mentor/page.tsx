import StackHeader from "@/shared/components/StackHeader";
import ChatListMento from "../components/ChatListMento";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "멘토 채팅방",
  description: "멘토 채팅방",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const id = param.id;

  return (
    <>
      <StackHeader />
      <main className="relative max-h-[calc(100dvh-48px)] flex flex-col flex-1 min-h-0">
        <ChatListMento id={id} />
      </main>
    </>
  );
}
export default Page;
