import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  if (token) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/main", request.url));
    }
  } else {
    if (
      pathname.startsWith("/my-page") ||
      pathname.startsWith("/chat") ||
      pathname.startsWith("/main")
    ) {
      const redirectUrl = new URL("/redirect", request.url);
      redirectUrl.searchParams.set("msg", "로그인이 필요합니다.");
      redirectUrl.searchParams.set("to", "/login");
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/my-page/:path*", "/chat/:path*", "/main"],
};
