"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectClient() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const msg = params.get("msg");
    const to = params.get("to") || "/";

    if (msg) alert(msg);
    router.replace(to);
  }, [params, router]);

  return null;
}
