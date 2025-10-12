import { Metadata } from "next";
import RegisterForm from "./components/RegisterForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "회원가입 페이지",
};

async function Page() {
  return (
    <div className="w-full h-full flex-1 px-10 flex flex-col">
      <RegisterForm />
    </div>
  );
}
export default Page;
