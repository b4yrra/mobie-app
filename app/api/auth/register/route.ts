import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { firstName, lastName, email, password, dateOfBirth, imageUrl } =
    await req.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { error: "Бүх талбарыг бөглөнө үү." },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Имэйл бүртгэлтэй байна." },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashed,
      imageUrl: imageUrl || null,
      ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
    },
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("session_user", user.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
