"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Бүх талбарыг бөглөнө үү.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Алдаа гарлаа.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-[500px] flex items-center justify-center bg-background px-4 ${montserrat.className}`}
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border bg-card flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Нэвтрэх</h1>
          <p className="text-sm text-muted-foreground">
            Системд нэвтрэхийн тулд мэдээллээ оруулна уу.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Имэйл</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Нэвтэрч байна...
            </>
          ) : (
            "Нэвтрэх"
          )}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Бүртгэл байхгүй юу?{" "}
          <Link
            href="/sign-up"
            className="text-blue-500 hover:underline font-medium"
          >
            Бүртгүүлэх
          </Link>
        </p>
      </div>
    </div>
  );
}
