import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta", // Kita buat variabel CSS untuk font
});

export const metadata: Metadata = {
  title: "Lombain.id",
  description: "Connect with talented students from your campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <main className="bg-slate-50/50">{children} </main>
      </body>
    </html>
  );
}
