import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Бүх талбарыг бөглөнө үү." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Имэйл эсвэл нууц үг буруу байна." },
      { status: 401 },
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: "Имэйл эсвэл нууц үг буруу байна." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("session_user", user.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
