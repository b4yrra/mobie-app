"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import {
  Settings,
  RefreshCw,
  Home,
  Briefcase,
  Newspaper,
  Building2,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

type User = {
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  email: string;
  dateOfBirth?: string;
};

const bottomNavItems = [
  { icon: Home, label: "Нүүр" },
  { icon: Briefcase, label: "Үйлчилгээ" },
  { icon: Newspaper, label: "Мэдээ" },
  { icon: Building2, label: "Байгууллага" },
  { icon: MoreHorizontal, label: "Бусад" },
];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showIdSheet, setShowIdSheet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch(() => {});
  }, []);

  return (
    <div className={`min-h-screen bg-background ${montserrat.className}`}>
      <div className="bg-background">
        {/* Top Banner Card */}
        <div className="relative bg-[#e6f0ff] dark:bg-[#1a314d] overflow-hidden pt-1 mx-4 mt-4 rounded-3xl">
          {/* Background Trees */}
          <img
            src="https://cache.e-mongolia.mn/files/portal-v5/images/profile/tree.svg"
            alt="Tree Left"
            className="absolute left-[-20px] bottom-0 w-45 h-auto pointer-events-none z-20"
          />
          <img
            src="https://cache.e-mongolia.mn/files/portal-v5/images/profile/tree.svg"
            alt="Tree Right"
            className="absolute right-[-60px] bottom-0 w-45 h-auto transform scale-x-[-1] pointer-events-none z-20"
          />

          <div className="relative z-10 text-center px-4">
            <p className="text-[#1a2d4a] text-[14px] font-medium leading-snug tracking-tighter dark:text-white">
              Нийт <span className="text-[#0057ff] font-bold">17,000 🌳</span>
              <span className="text-[#45b7ff] font-bold">1.4 сая тонн 💧</span>
              <br />
              хэмнэн эх дэлхийгээ хайрлахад
              <br />
              хувь нэмрээ оруулсан танд
              <br />
              баярлалаа.
            </p>

            <div className="mb-2 py-3 space-y-1.5 flex flex-col gap-3 items-center rounded-2xl bg-white dark:bg-[#1e2a40]">
              <div>
                <p className="text-[#0057ff] text-xl font-semibold leading-none">
                  5
                </p>
                <p className="text-gray-500 dark:text-[#e7e7e7] text-[11px] font-medium">
                  үйлчилгээ
                </p>
              </div>
              <div>
                <p className="text-[#0057ff] text-xl font-semibold leading-none">
                  99,735₮
                </p>
                <p className="text-gray-500 dark:text-[#e7e7e7] text-[11px] font-medium">
                  төгрөг
                </p>
              </div>
              <div>
                <p className="text-[#0057ff] text-xl font-semibold leading-none">
                  11 цаг 30 мин
                </p>
                <p className="text-gray-500 dark:text-[#e7e7e7] text-[11px] font-medium">
                  хугацаа
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Section (Overlapping) */}
        <div className="relative mx-4 px-2 -mt-10 z-20 flex justify-between items-start">
          <div className="flex gap-4">
            {/* Avatar container with gradient background */}
            <div className="relative w-[100px] h-[100px] rounded-[24px] bg-gradient-to-tr from-[#9bbaf5] via-[#e2ebf9] to-[#c2d6f9] p-[2px] shadow-sm flex-shrink-0">
              <div className="w-full h-full bg-gray-200 rounded-[22px] overflow-hidden">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Fallback Silhouette matching the screenshot */
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="placeholder"
                    className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                  />
                )}
              </div>
              {/* Soyombo Badge */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-tr from-[#9bbaf5] to-[#f4d9f9] rounded-full flex items-center justify-center p-[4px] border-2 border-white shadow-sm">
                <img
                  src="https://cache.e-mongolia.mn/files/portal-v5/images/profile/soyombo.svg"
                  alt="Soyombo"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Name & Email Details */}
            <div className="pt-12">
              <h2 className="text-[#0057ff] text-[18px] font-bold leading-tight">
                {user?.lastName}
                <br />
                {user?.firstName}
              </h2>
              <p className="text-gray-500 dark:text-[#e7e7e7] text-[12px] mt-1 leading-tight break-all max-w-[120px]">
                {user?.email ?? "023477295583@e-mongolia.mn"}
              </p>
            </div>
          </div>

          {/* Settings Button */}
          <div className="pt-12">
            <button className="w-10 h-10 rounded-full bg-[#0057ff] flex items-center justify-center flex-shrink-0 shadow-md hover:bg-blue-700 transition-colors">
              <Settings size={20} className="text-white" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Quick Links Row */}
        <div className="mx-6 mt-8 mb-6 flex justify-between items-center gap-3">
          <span className="text-[#1a2d4a] text-[14px] font-bold cursor-pointer hover:underline text-nowrap">
            Төрд байгаа миний мэдээлэл
          </span>

          <button className="flex items-center gap-2 bg-[#edf4ff] hover:bg-[#e0ecff] transition-colors py-1.5 px-4 rounded-xl">
            <span className="text-[#1a2d4a] text-[13px] font-bold text-nowrap">
              Бичиг баримт
            </span>
          </button>
        </div>
      </div>

      {/* Refresh button */}
      <div className="mx-3 mt-4 flex justify-between items-center">
        <button className="flex items-center gap-2 border border-gray-300 dark:border-white/20 rounded-full px-4 py-2 text-[13px] font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <RefreshCw size={14} />
          Шинэчлэх
        </button>
      </div>

      {/* ID Card */}
      <div className="mx-3 mt-3" onClick={() => setShowIdSheet(true)}>
        <div
          className="rounded-2xl overflow-hidden h-60 relative"
          style={{
            backgroundImage:
              "url('678807850_1292397376412441_2461215056111892568_n.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex gap-3 p-4 absolute top-17">
            {/* Photo */}
            <div className="w-[87.5px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden absolute left-2.5 top-1">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="id"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-2 absolute left-28">
              <div>
                <p className="text-gray-800 text-[10px] absolute top-0.5">
                  {user?.lastName ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-800 text-[10px] uppercase absolute top-8">
                  {user?.firstName ?? "—"}
                </p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-gray-800 text-[10px] absolute top-16">
                    Эрэгтэй
                  </p>
                </div>
              </div>
              <div className="text-gray-800 text-[10px] absolute top-26.5">
                {user?.dateOfBirth
                  ? new Date(user.dateOfBirth)
                      .toLocaleDateString("en-CA") // gives YYYY/MM/DD
                      .replace(/-/g, "/")
                  : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIdSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowIdSheet(false)}
          />

          {/* Sheet */}
          <div className="relative bg-white dark:bg-[#0c192e] rounded-t-3xl z-10 pb-10 animate-slide-up">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Иргэний үнэмлэх
            </p>

            {/* Exact same card as profile */}
            <div className="mx-4 rounded-2xl overflow-hidden h-60 relative">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "url('678807850_1292397376412441_2461215056111892568_n.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex gap-3 p-4 absolute top-17">
                  <div className="w-[85px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden absolute left-2.5 top-1">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="id"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2 absolute left-28">
                    <div>
                      <p className="text-gray-800 text-[10px] absolute top-0.5">
                        {user?.lastName ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 text-[10px] uppercase absolute top-8">
                        {user?.firstName ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 text-[10px] absolute top-16">
                        Эрэгтэй
                      </p>
                    </div>
                    <div className="text-gray-800 text-[10px] absolute top-26.5">
                      {user?.dateOfBirth
                        ? new Date(user.dateOfBirth)
                            .toLocaleDateString("en-CA")
                            .replace(/-/g, "/")
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mx-4 mt-4 flex flex-col gap-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-2xl transition-colors">
                Лавлагаа авах
              </button>
              <button className="w-full text-blue-500 font-semibold py-2 transition-colors">
                Дахин захиалах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0c192e] border-t border-[#e7e7e7] dark:border-white/10 px-2 py-2 z-50">
        <div className="grid grid-cols-5 gap-1">
          {bottomNavItems.map((item, i) => (
            <button
              key={i}
              onClick={() => i === 0 && router.push("/")}
              className={`flex flex-col items-center gap-1 py-1 rounded-xl transition-colors ${
                i === 0
                  ? "text-blue-500 dark:text-[#e7e7e7]"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              <item.icon size={20} strokeWidth={i === 0 ? 2 : 1.5} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
