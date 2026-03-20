"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppName from "@/components/AppName";
import { ENDPOINTS } from "@/lib/api-constant";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formData),
      });

      // Panggil .json() HANYA SATU KALI di sini
      const result = await res.json();

      if (!res.ok) {
        // Jika error, Laravel biasanya mengirim 'message'
        throw new Error(result.message || "Email atau password salah.");
      }

      // Ambil token dari struktur: data -> access_token
      const token = result.data.access_token;

      if (token) {
        // Simpan ke LocalStorage untuk Client
        localStorage.setItem("token", token);

        // Simpan ke Cookies untuk Middleware/Server
        Cookies.set("token", token, { expires: 7 });

        // Redirect ke Explore
        router.push("/explore");
      } else {
        throw new Error("Token tidak ditemukan dalam response.");
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5A8D39] shadow-lg mb-4">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your <AppName span={false} /> account
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-xl shadow-black/5">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@campus.ac.id"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1.5 rounded-xl h-11 border-slate-200 focus-visible:ring-[#5A8D39]"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-[#5A8D39] hover:underline font-medium">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1.5 rounded-xl h-11 border-slate-200 focus-visible:ring-[#5A8D39]"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#5A8D39] hover:bg-[#4a752f] rounded-xl text-white font-bold transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-[#5A8D39] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}