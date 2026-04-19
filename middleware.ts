import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up", "/api"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session_user")?.value;

  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (
    session &&
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
