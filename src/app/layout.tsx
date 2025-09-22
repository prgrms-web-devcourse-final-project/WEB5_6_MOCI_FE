import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts";
import SmoothScrollerProvider from "@/provider/SmoothScrollerProvider";

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
        {children}
        <SmoothScrollerProvider>{children}</SmoothScrollerProvider>
      </body>
    </html>
  );
}
