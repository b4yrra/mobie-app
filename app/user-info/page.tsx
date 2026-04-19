"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function UserInfoPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.replace("/");
      return;
    }

    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setPreview(user.imageUrl ?? null);

    // Check if already has profile → skip to home
    fetch("/api/onboarding")
      .then((r) => r.json())
      .then((data) => {
        if (data.hasProfile) {
          router.replace("/");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [isLoaded, user]);

  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !dob) {
      setError("Бүх талбарыг бөглөнө үү.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await user!.update({ firstName, lastName });

      if (imageFile) {
        await user!.setProfileImage({ file: imageFile });
      }

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, dob }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Серверийн алдаа гарлаа.");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Алдаа гарлаа.");
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
          <h1 className="text-2xl font-bold">Профайл тохируулах</h1>
          <p className="text-sm text-muted-foreground">
            Үргэлжлүүлэхийн өмнө мэдээллээ бөглөнө үү.
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400 bg-muted">
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover"
                alt="preview"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                Зураг
              </div>
            )}
          </div>
          <label className="cursor-pointer text-sm text-blue-500 hover:underline">
            Зураг солих
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Last & First Name */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium">Овог</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Овог"
              className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium">Нэр</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Нэр"
              className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Төрсөн өдөр</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
              Хадгалж байна...
            </>
          ) : (
            "Үргэлжлүүлэх"
          )}
        </button>
      </div>
    </div>
  );
}
