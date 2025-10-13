"use client";

import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

function ArchiveButtons() {
  const user = useAuthStore((s) => s.user);

  if (user?.role === "ADMIN") {
    return (
      <div className="flex gap-2">
        <Button className="p-0" color="yellow">
          <Link href="/archive/write" className="px-4 py-3">
            글 작성
          </Link>
        </Button>
        <Button className="p-0">
          <Link href="/archive" className="px-4 py-3">
            검색초기화
          </Link>
        </Button>
      </div>
    );
  } else {
    return (
      <Button className="p-0">
        <Link href="/archive" className="px-4 py-3">
          검색초기화
        </Link>
      </Button>
    );
  }
}
export default ArchiveButtons;
