"use client";

import { usePathname } from "next/navigation"; 
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const pathname = usePathname(); 

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname,
    );
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ABC123]"> {/* Tetap pakai background hijau kamu */}
      <div className="text-center bg-white p-10 rounded-[2rem] shadow-xl">
        <h1 className="mb-4 text-6xl font-black text-slate-900">404</h1>
        <p className="mb-6 text-xl font-medium text-slate-500">
          Oops! Page not found
        </p>
        <Button asChild className="rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] px-8 py-6 text-white font-bold transition-all">
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;