import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user")?.value;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      imageUrl: true,
      dateOfBirth: true,
    },
  });

  return user;
}
