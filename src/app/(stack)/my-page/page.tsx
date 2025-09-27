import Button from "@/shared/components/Button";
import UserInfo from "./components/UserInfo";
import Link from "next/link";

function Page() {
  return (
    <div className="w-4/5 min-w-[350px] flex-1  p-10 flex flex-col gap-5 self-center">
      <UserInfo />
      <Button fullWidth className="p-0">
        <Link href="/my-page/email-setting" className="w-full h-full px-4 py-3">
          이메일 설정
        </Link>
      </Button>
      <Button fullWidth className="p-0">
        <Link href="/my-page/change-pw" className="w-full h-full px-4 py-3">
          비밀번호 변경
        </Link>
      </Button>
      <Button fullWidth color="darkgreen">
        회원탈퇴하기
      </Button>
    </div>
  );
}
export default Page;
