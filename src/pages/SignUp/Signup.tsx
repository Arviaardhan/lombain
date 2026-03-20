"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Field from "@/components/create-recruitment/Field";
import { institutions } from "@/data/signup-data";
import AppName from "@/components/AppName";
import { ENDPOINTS } from "@/lib/api-constant";

interface SkillCat {
  id: number;
  name: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [apiCategories, setApiCategories] = useState<SkillCat[]>([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    institution: "",
    major: "",
    password: "",
    password_confirmation: "", 
    skill_category_id: "",     
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(ENDPOINTS.SKILL_CATEGORIES);
        const result = await res.json();
        if (result.success) {
          setApiCategories(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skill_category_id: Number(formData.skill_category_id)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/explore"); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent/10 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5A8D39] shadow-lg mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Join <AppName span />
          </h1>
        </div>

        <div className="rounded-[2.5rem] bg-white p-8 md:p-10 shadow-2xl shadow-black/5">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" value={formData.first_name} required>
                <Input id="first_name" placeholder="Satriya" value={formData.first_name} onChange={handleChange} required className="rounded-xl h-11" />
              </Field>
              <Field label="Last Name" value={formData.last_name} required>
                <Input id="last_name" placeholder="Mamad" value={formData.last_name} onChange={handleChange} required className="rounded-xl h-11" />
              </Field>
            </div>

            <Field label="Email Address" value={formData.email} required>
              <Input id="email" type="email" placeholder="satriya@gmail.com" value={formData.email} onChange={handleChange} required className="rounded-xl h-11" />
            </Field>

            <Field label="Institution" value={formData.institution} required>
              <Select onValueChange={(v) => handleSelectChange("institution", v)}>
                <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Pilih Kampus" /></SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Major" value={formData.major} required>
              <Input id="major" placeholder="Informatika" value={formData.major} onChange={handleChange} required className="rounded-xl h-11" />
            </Field>

            {/* Skill Category dari API */}
            <Field label="Skill Category" value={formData.skill_category_id} required>
              <Select onValueChange={(v) => handleSelectChange("skill_category_id", v)}>
                <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                <SelectContent>
                  {apiCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Password Section */}
            <div className="grid grid-cols-1 gap-4">
              <Field label="Password" value={formData.password} required>
                <Input id="password" type="password" placeholder="••••••" value={formData.password} onChange={handleChange} required className="rounded-xl h-11" />
              </Field>
              <Field label="Confirm Password" value={formData.password_confirmation} required>
                <Input id="password_confirmation" type="password" placeholder="••••••" value={formData.password_confirmation} onChange={handleChange} required className="rounded-xl h-11" />
              </Field>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold transition-all active:scale-[0.98]">
              {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}