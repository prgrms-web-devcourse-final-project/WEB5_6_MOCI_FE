"use client";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";

function Back() {
  const router = useRouter();
  const back = () => {
    router.back();
    window.history.replaceState(null, "", window.location.href);
  };
  //이전 스크롤위치 기억하는거 해보기

  return (
    <>
      <Button className="self-center" onClick={back}>
        목록
      </Button>
    </>
  );
}

export default Back;
