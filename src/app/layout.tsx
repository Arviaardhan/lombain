import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster-nya saja

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Lombain.id",
  description: "Connect with talented students from your campus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <main className="bg-slate-50/50">{children}</main>
        {/* Toaster diletakkan di sini agar bisa dipanggil dari mana saja */}
        <Toaster /> 
      </body>
    </html>
  );
}