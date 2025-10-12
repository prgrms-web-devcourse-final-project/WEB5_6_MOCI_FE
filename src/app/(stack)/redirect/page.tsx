import { Suspense } from "react";
import RedirectClient from "./components/RedirectClient";

export default function RedirectPage() {
  return (
    <>
      <div className="flex-center text-gray-500">이동 중입니다...</div>
      <Suspense
        fallback={
          <div className="flex-center text-gray-500">이동 중입니다...</div>
        }
      >
        <RedirectClient />
      </Suspense>
    </>
  );
}
