import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header/Header";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full bg-background shadow-lg">
            <Header />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
