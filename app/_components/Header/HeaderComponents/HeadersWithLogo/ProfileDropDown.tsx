"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import {
  Search,
  MessageCircle,
  Bell,
  Wallet,
  FileText,
  Mail,
  History,
  Award,
  Settings,
  AlertCircle,
  LogOut,
  CircleUser,
  Building2,
  Moon,
  CheckCircle2,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

type User = {
  firstName: string;
  lastName: string;
  imageUrl: string | null;
};

const quickActions = [
  { icon: Search, label: "Хайлт", href: "/" },
  { icon: MessageCircle, label: "Чат", href: "/" },
  { icon: Bell, label: "Мэдэгдэл", href: "/" },
  { icon: Wallet, label: "Хэтэвч", href: "/" },
];

const menuItems = [
  {
    icon: Building2,
    label: "Төрд байгаа миний мэдээлэл",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    href: "/profile",
  },
  {
    icon: FileText,
    label: "Бичиг баримт",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/profile",
  },
  {
    icon: Mail,
    label: "Үндэсний шуудан",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/profile",
  },
  {
    icon: History,
    label: "Үйлчилгээний түүх",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    href: "/profile",
  },
  {
    icon: Award,
    label: "Талархал",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    href: "/profile",
  },
  {
    icon: CheckCircle2,
    label: "Баталгаажуулалт",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/profile",
    badge: true,
  },
  {
    icon: AlertCircle,
    label: "Өргөдөл, гомдол",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    href: "/profile",
  },
  {
    icon: Settings,
    label: "Тохиргоо",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    href: "/profile",
  },
];

export const ProfileDropDown = () => {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 10 });
    setOpen((v) => !v);
  };

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/sign-in");
    router.refresh();
  };

  const dropdown = (
    <div
      ref={dropdownRef}
      className={`${montserrat.className} fixed left-0 right-0 overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10 z-[9999] transition-all duration-200 origin-top ${
        open
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
      style={{ top: pos.top }}
    >
      {/* Header */}
      <div className="bg-background px-4 pt-4 pb-5">
        {/* Profile row */}
        <div className="flex gap-3 items-start mb-4">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700 flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <CircleUser size={28} className="text-white" />
            </div>
          )}
          <div>
            <p className="dark:text-white text-black font-bold text-sm leading-tight">
              {user ? `${user.lastName} ${user.firstName}` : "Профайл"}
            </p>
            <p className="dark:text-blue-200 text-slate-500 font-medium text-[10px] mt-1 leading-relaxed">
              Төрийн байгууллагад бүртгэгдсэн таны мэдээлэл, үйлчилгээний түүх
              болон тохиргоог эндээс харах боломжтой.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleNavigate(action.href)}
              className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <action.icon
                size={18}
                className="dark:text-white text-black"
                strokeWidth={1.5}
              />
              <span className="dark:text-white text-black text-[12px] font-semibold">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <div className="bg-white dark:bg-[#0c192e] p-3 max-h-[420px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavigate(item.href)}
              className="flex flex-col items-start gap-2 p-3 rounded-2xl bg-white dark:bg-[#1a2d4a] border border-[#e7e7e7] dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm transition-all text-left"
            >
              <div
                className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center relative flex-shrink-0`}
              >
                <item.icon
                  size={18}
                  className={item.iconColor}
                  strokeWidth={1.8}
                />
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-semibold leading-tight text-gray-700 dark:text-gray-200">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm py-3 rounded-2xl transition-colors"
        >
          <LogOut size={15} strokeWidth={2} />
          Системээс гарах
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleOpen}
        className="focus:outline-none flex items-center justify-center border-2 rounded-full border-[#06f] dark:border-[#3b82f6]"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="profile"
            className="w-[36px] h-[36px] rounded-full object-cover"
          />
        ) : (
          <CircleUser
            size={34}
            strokeWidth={1.2}
            className="text-white bg-blue-500 p-[2px] rounded-full"
          />
        )}
      </button>

      {mounted && createPortal(dropdown, document.body)}
    </>
  );
};
