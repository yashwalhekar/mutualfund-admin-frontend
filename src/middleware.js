import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🔥 MIDDLEWARE RUNNING:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;

  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/blogs") ||
    request.nextUrl.pathname.startsWith("/testimonials")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/blogs/:path*", "/testimonials/:path*"],
};
