"use client";

import { Trophy, Eye, EyeOff, Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { useSignup, SKILL_SUGGESTIONS } from "@/hooks/use-signup";

export default function SignupPage() {
  const {
    formData,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    apiCategories,
    skillInput,
    setSkillInput,
    handleChange,
    handleSelectChange,
    addSkill,
    removeSkill,
    handleSubmit,
  } = useSignup();

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
                <Input id="first_name" placeholder="Satriya" value={formData.first_name} onChange={handleChange} required className="rounded-xl h-11 border-2 focus:border-[#5A8D39]" />
              </Field>
              <Field label="Last Name" value={formData.last_name} required>
                <Input id="last_name" placeholder="Mamad" value={formData.last_name} onChange={handleChange} required className="rounded-xl h-11 border-2 focus:border-[#5A8D39]" />
              </Field>
            </div>

            <Field label="Email Address" value={formData.email} required>
              <Input id="email" type="email" placeholder="satriya@gmail.com" value={formData.email} onChange={handleChange} required className="rounded-xl h-11 border-2 focus:border-[#5A8D39]" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Institution" value={formData.institution} required>
                <Select onValueChange={(v) => handleSelectChange("institution", v)}>
                  <SelectTrigger className="rounded-xl h-11 border-2"><SelectValue placeholder="Kampus" /></SelectTrigger>
                  <SelectContent>
                    {institutions.map((inst) => (
                      <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Major" value={formData.major} required>
                <Input id="major" placeholder="Informatika" value={formData.major} onChange={handleChange} required className="rounded-xl h-11 border-2 focus:border-[#5A8D39]" />
              </Field>
            </div>

            <Field label="Skill Category" value={formData.skill_category_id} required>
              <Select onValueChange={(v) => handleSelectChange("skill_category_id", v)}>
                <SelectTrigger className="rounded-xl h-11 border-2"><SelectValue placeholder="Pilih Kategori Utama" /></SelectTrigger>
                <SelectContent>
                  {apiCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Smart Skill Input */}
            <Field label="Your Skills" value={formData.skills.join(", ")} required>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type skill & press Enter" 
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                    className="rounded-xl h-11 border-2 focus:border-[#5A8D39]"
                  />
                  <Button type="button" onClick={() => addSkill(skillInput)} className="h-11 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Suggestions */}
                {formData.skill_category_id && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested:</p>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_SUGGESTIONS[formData.skill_category_id]?.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => addSkill(s)}
                          className="text-[11px] px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#5A8D39] hover:text-[#5A8D39] transition-all"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 border-none px-3 py-1.5 rounded-full text-xs font-bold gap-2">
                      {skill}
                      <X className="h-3.5 w-3.5 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Password" value={formData.password} required>
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••" value={formData.password} onChange={handleChange} required className="rounded-xl h-11 border-2" />
              </Field>
              <Field label="Confirm" value={formData.password_confirmation} required>
                <Input id="password_confirmation" type={showPassword ? "text" : "password"} placeholder="••••••" value={formData.password_confirmation} onChange={handleChange} required className="rounded-xl h-11 border-2" />
              </Field>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold transition-all active:scale-[0.98] shadow-lg shadow-green-100">
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}