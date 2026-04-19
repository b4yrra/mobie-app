"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { Camera } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;
    if (typeof info === "object" && typeof info.secure_url === "string") {
      setImageUrl(info.secure_url);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Бүх талбарыг бөглөнө үү.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth: dob,
          imageUrl,
        }),
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
      className={`min-h-screen flex items-center justify-center bg-background px-4 ${montserrat.className}`}
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border bg-card flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Бүртгүүлэх</h1>
          <p className="text-sm text-muted-foreground">
            Шинэ бүртгэл үүсгэхийн тулд мэдээллээ оруулна уу.
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
          <CldUploadWidget
            uploadPreset="profile-image"
            onSuccess={handleImageUpload}
            options={{
              styles: {
                palette: {
                  window: "#FFFFFF",
                  tabIcon: "#3B82F6",
                  link: "#3B82F6",
                },
              },
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400 bg-muted flex items-center justify-center"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />
                ) : (
                  <Camera size={28} className="text-muted-foreground" />
                )}
                <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={20} className="text-white" />
                </div>
              </button>
            )}
          </CldUploadWidget>
          <span className="text-xs text-muted-foreground">
            {imageUrl ? "Зураг солих" : "Профайл зураг оруулах"}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium">Овог</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  )
                }
                placeholder="ОВОГ"
                className="border rounded-lg px-4 py-2 w-full text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium">Нэр</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  )
                }
                placeholder="НЭР"
                className="border rounded-lg px-4 py-2 w-full text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

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
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Төрсөн өдөр</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              Бүртгэж байна...
            </>
          ) : (
            "Бүртгүүлэх"
          )}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Бүртгэлтэй юу?{" "}
          <Link
            href="/sign-in"
            className="text-blue-500 hover:underline font-medium"
          >
            Нэвтрэх
          </Link>
        </p>
      </div>
    </div>
  );
}
