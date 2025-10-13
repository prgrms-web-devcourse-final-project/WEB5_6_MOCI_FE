import Button from "@/shared/components/Button";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-full flex-center flex-col">
      <Image
        src="/user_profile.png"
        width={300}
        height={300}
        className="select-none animate-loading"
        priority
        alt="디딤돌로고"
      ></Image>
      <p className="text-4xl font-bold p-2 break-keep whitespace-normal pb-10 text-center leading-tight">
        접근할 수 없는 페이지입니다
      </p>
      <Button>
        <Link href={"/"}>홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
export default NotFound;
