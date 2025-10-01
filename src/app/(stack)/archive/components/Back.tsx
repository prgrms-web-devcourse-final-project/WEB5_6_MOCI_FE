"use client";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";

function Back() {
  const router = useRouter();
  const back = () => {
    router.back();
    window.history.replaceState(null, "", window.location.href);
  };

  return (
    <>
      <Button className="self-center" onClick={back}>
        목록
      </Button>
    </>
  );
}

export default Back;
