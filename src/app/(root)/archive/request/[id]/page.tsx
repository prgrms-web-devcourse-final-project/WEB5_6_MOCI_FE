import type { Metadata } from "next";
import RequestDetail from "./components/RequestDetail";

export const metadata: Metadata = {
  title: "자료 요청 상세",
  description: "자료 요청 상세 보기",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  return <RequestDetail requestId={parseInt(id)} />;
}

export default Page;
