import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserInfoRoute = createRouteMatcher(["/user-info(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId) {
    if (isUserInfoRoute(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return;
  }

  if (isApiRoute(req)) return;

  const hasProfile = req.cookies.get("has_profile")?.value === "true";

  if (hasProfile && isUserInfoRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!hasProfile && !isUserInfoRoute(req)) {
    return NextResponse.redirect(new URL("/user-info", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
