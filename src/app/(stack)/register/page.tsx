import { Metadata } from "next";
import RegisterForm from "./components/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "회원가입",
  description: "회원가입 페이지",
};

async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (token) {
    redirect("/main");
  }
  return (
    <div className="w-full h-full flex-1 px-10 flex flex-col">
      <RegisterForm />
    </div>
  );
}
export default Page;
