import type { Metadata } from "next";
import MaterialRequestBoard from "./components/MaterialRequestBoard";

export const metadata: Metadata = {
  title: "자료요청게시판",
  description: "멘토와 관리자를 위한 자료요청게시판",
};

function Page() {
  return <MaterialRequestBoard />;
}

export default Page;
