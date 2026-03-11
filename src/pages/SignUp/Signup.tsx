"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Eye, EyeOff } from "lucide-react"; // Tambah ikon mata untuk password
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Field from "@/components/create-recruitment/Field"; 
import SkillSection from "@/components/auth/SkillSection";
import { institutions, masterCategories } from "@/data/signup-data";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    major: "", // Tambahan Major
    password: "", // Tambahan Password
    skillCategory: "",
  });
  const [skills, setSkills] = useState<string[]>([]);

  // Handler untuk sinkronisasi state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-accent/10 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5A8D39] shadow-lg mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join AlmamaterConnect</h1>
          <p className="text-slate-700 font-medium opacity-80 mt-1">Lengkapi profil untuk temukan tim impianmu</p>
        </div>

        {/* Card Form */}
        <div className="rounded-[2.5rem] bg-white p-8 md:p-10 shadow-2xl shadow-black/5">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Row: Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" value={formData.firstName} required>
                <Input 
                  id="firstName"
                  placeholder="Andi" 
                  value={formData.firstName}
                  onChange={handleChange}
                  className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#5A8D39]" 
                />
              </Field>
              <Field label="Last Name" value={formData.lastName} required>
                <Input 
                  id="lastName"
                  placeholder="Pratama" 
                  value={formData.lastName}
                  onChange={handleChange}
                  className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#5A8D39]" 
                />
              </Field>
            </div>

            {/* Email */}
            <Field label="Email Address" value={formData.email} required>
              <Input 
                id="email"
                type="email" 
                placeholder="you@campus.ac.id" 
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#5A8D39]" 
              />
            </Field>

            {/* Institution */}
            <Field label="Institution" value={formData.institution} required>
              <Select onValueChange={(v) => handleSelectChange("institution", v)}>
                <SelectTrigger className="rounded-xl h-11 cursor-pointer border-slate-200 text-slate-900">
                  <SelectValue placeholder="Pilih Kampus" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {institutions.map(inst => (
                    <SelectItem key={inst} value={inst} className="cursor-pointer">{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Major / Department */}
            <Field label="Major / Department" value={formData.major} required>
              <Input 
                id="major"
                placeholder="Contoh: Teknik Informatika" 
                value={formData.major}
                onChange={handleChange}
                className="rounded-xl h-11 border-slate-200 focus-visible:ring-[#5A8D39]" 
              />
            </Field>

            {/* Skill Category */}
            <Field label="Skill Category" value={formData.skillCategory} required>
              <Select onValueChange={(v) => handleSelectChange("skillCategory", v)}>
                <SelectTrigger className="rounded-xl h-11 cursor-pointer border-slate-200">
                  <SelectValue placeholder="Pilih Kategori Utama" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {Object.keys(masterCategories).map(cat => (
                    <SelectItem key={cat} value={cat} className="cursor-pointer">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Skill Tags Section */}
            {formData.skillCategory && (
              <SkillSection 
                category={formData.skillCategory} 
                skills={skills} 
                setSkills={setSkills} 
              />
            )}

            {/* Password */}
            <Field label="Password" value={formData.password} required>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-xl h-11 border-slate-200 pr-10 focus-visible:ring-[#5A8D39]" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5A8D39] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>

            <Button className="w-full h-12 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold text-lg shadow-lg shadow-green-100 cursor-pointer transition-all active:scale-[0.98]">
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-[#5A8D39] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}