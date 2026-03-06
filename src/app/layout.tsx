import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";

import Navbar from "@/components/layout/Navbar"; // Pastikan path ini benar sesuai struktur proyek

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta", // Kita buat variabel CSS untuk font
});

export const metadata: Metadata = {
  title: "AlmamaterConnect",
  description: "Connect with talented students from your campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar /> {/* Taruh di sini agar konsisten di semua halaman */}
        {children} {/* Konten halaman (seperti Landing) akan muncul di sini */}
      </body>
    </html>
  );
}