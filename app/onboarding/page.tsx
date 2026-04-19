"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [dob, setDob] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) return <div>Loading...</div>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!firstName.trim() || !lastName.trim() || !dob) {
      setError("Бүх талбарыг бөглөнө үү.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Update Clerk profile name
      await user.update({ firstName, lastName });

      // 2. Upload profile image if selected
      if (imageFile) {
        await user.setProfileImage({ file: imageFile });
      }

      // 3. Save full profile to DB via API
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, dob }),
      });

      if (!res.ok) throw new Error("Серверийн алдаа гарлаа.");

      router.push("/");
    } catch (err: any) {
      setError(err.message ?? "Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border bg-card flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Профайл тохируулах</h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400 bg-muted">
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover"
                alt="preview"
              />
            ) : user?.imageUrl ? (
              <img
                src={user.imageUrl}
                className="w-full h-full object-cover"
                alt="current"
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

        {/* First & Last Name */}
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Хадгалж байна..." : "Хадгалах"}
        </button>
      </div>
    </div>
  );
}
