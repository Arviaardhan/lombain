"use client";

import { useState, useEffect } from "react"; // Tambah useEffect
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Search, PlusCircle, User, Menu, X, Trophy, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NotificationDropdown from "../NotificationDropdown";
import AppName from "../AppName";
import Cookies from "js-cookie";

const navItems = [
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/talent", icon: Users, label: "Talent" },
  { href: "/create", icon: PlusCircle, label: "Create" },
  { href: "/dashboard", icon: Trophy, label: "Dashboard" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); 

  const handleLogout = () => {
    localStorage.removeItem("token");

    Cookies.remove("token");

    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              <AppName span />
            </span>
          </Link>

          {/* Nav Links - Hanya muncul jika Login */}
          <nav className="hidden items-center gap-1 md:flex">
            {isLoggedIn && navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive && "animate-pulse")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <>
                <NotificationDropdown />
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn && <NotificationDropdown />}
            <button className="p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav - Hanya muncul jika Login */}
      {isLoggedIn && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden pb-safe">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}