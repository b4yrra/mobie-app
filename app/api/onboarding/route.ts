import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ hasProfile: false });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });

  const res = NextResponse.json({ hasProfile: !!user });

  if (user) {
    res.cookies.set("has_profile", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return res;
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clerkUser = await currentUser();
  if (!clerkUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { firstName, lastName, dob } = await req.json();

  if (!firstName || !lastName || !dob) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email)
    return NextResponse.json({ error: "No email found" }, { status: 400 });

  try {
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        firstName,
        lastName,
        imageUrl: clerkUser.imageUrl,
        dateOfBirth: new Date(dob),
      },
      create: {
        clerkId: userId,
        firstName,
        lastName,
        email,
        imageUrl: clerkUser.imageUrl,
        dateOfBirth: new Date(dob),
      },
    });

    const res = NextResponse.json({ success: true, user });

    res.cookies.set("has_profile", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch (err) {
    console.error("[ONBOARDING_ERROR]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
