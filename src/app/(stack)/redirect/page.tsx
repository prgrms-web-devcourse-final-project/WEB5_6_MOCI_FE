"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const msg = params.get("msg");
    const to = params.get("to") || "/";

    if (msg) alert(msg);
    router.replace(to);
  }, [params, router]);

  // 사용자에게 짧은 빈 화면 표시
  return <div className="flex-center text-gray-500">이동 중입니다...</div>;
}
