import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  /*
  // '/about'へのアクセスを'/home'にリダイレクト
  if (request.nextUrl.pathname === "/about") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // '/dashboard'へのアクセスを'/dashboard/user'に書き換え
  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
   */

  // その他のリクエストはそのまま通す
  return NextResponse.next();
}

// このミドルウェアを適用するパスを指定
/*
export const config: {
  matcher: string[];
} = {
  matcher: ["/about", "/dashboard"],
};
 */
