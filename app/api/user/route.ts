import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json(null);

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      firstName: true,
      lastName: true,
      imageUrl: true,
      dateOfBirth: true,
    },
  });

  return NextResponse.json(user);
}
