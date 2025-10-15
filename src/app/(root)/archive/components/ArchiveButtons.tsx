"use client";

import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ArchiveButtons({ resetSearch }: { resetSearch: () => void }) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  if (user?.role === "ADMIN") {
    return (
      <div className="flex gap-2">
        <Button className="p-0" color="yellow">
          <Link href="/archive/write" className="px-4 py-3">
            글 작성
          </Link>
        </Button>
        <Button
          onClick={() => {
            resetSearch();
            router.replace("/archive");
          }}
        >
          검색 초기화
        </Button>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => {
          resetSearch();
          router.replace("/archive");
        }}
      >
        검색 초기화
      </Button>
    );
  }
}
export default ArchiveButtons;
