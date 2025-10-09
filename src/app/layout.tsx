import type { Metadata } from "next";
import "../shared/styles/globals.css";
import { pretendard } from "./fonts";
import QueryProvider from "@/provider/QueryProvider";

export const metadata: Metadata = {
  title: "디딤돌",
  description: "디지털 소외계층을 위한 멘토 매칭 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" className={pretendard.variable}>
      <body className={`antialiased`}>
        <QueryProvider>
          <div className="m-auto max-w-[650px] min-w-[350px] h-dvh overflow-y-hidden">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
