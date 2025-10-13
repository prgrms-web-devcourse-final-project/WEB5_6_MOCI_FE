import type { Metadata } from "next";
import RequestCreateForm from "./components/RequestCreateForm";

export const metadata: Metadata = {
  title: "자료 요청하기",
  description: "새로운 자료 요청 작성",
};

function Page() {
  return <RequestCreateForm />;
}

export default Page;
