import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user")?.value;
  if (!userId) return NextResponse.json(null);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      imageUrl: true,
      dateOfBirth: true,
    },
  });

  return NextResponse.json(user);
}
