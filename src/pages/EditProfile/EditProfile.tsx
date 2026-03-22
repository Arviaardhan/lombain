"use client";

import { useEditProfile } from "@/hooks/use-edit-profile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, X, Plus, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditProfilePage() {
  const {
    formData, setFormData, isLoading, saving,
    skillInput, setSkillInput, addSkill, removeSkill, handleSave
  } = useEditProfile();

  const isFormValid =
    formData.first_name?.trim() &&
    formData.last_name?.trim() &&
    formData.major?.trim() &&
    formData.institution?.trim() &&
    formData.skills.length > 0;

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#5A8D39]" />
    </div>
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 pb-24 bg-slate-50/30">
      <div className="flex items-center justify-between mb-10">
        <Link href="/profile" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#5A8D39] transition-all group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Link>
        <Button
          onClick={handleSave}
          disabled={saving || !isFormValid} // Button mati jika sedang save ATAU form tidak valid
          className={`rounded-xl px-6 gap-2 shadow-lg transition-all ${!isFormValid
              ? "bg-slate-300 cursor-not-allowed shadow-none"
              : "bg-[#5A8D39] hover:bg-[#4a752f] shadow-green-100"
            }`}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Profile
        </Button>
      </div>

      <div className="space-y-6">
        {/* Header Section */}
        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="relative group shrink-0">
                <Avatar className="h-28 w-28 ring-4 ring-white shadow-2xl">
                  <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-3xl font-black">
                    {formData.first_name?.substring(0, 1).toUpperCase()}{formData.last_name?.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg border border-slate-100 text-[#5A8D39] hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 w-full space-y-5">
                {/* Bagian Nama: First & Last Name */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">First Name</Label>
                    <Input
                      value={formData.first_name || ""}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      placeholder="e.g. Arvia"
                      className="rounded-xl border-slate-100 focus:border-[#5A8D39] h-12 font-medium mt-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">Last Name</Label>
                    <Input
                      value={formData.last_name || ""}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      placeholder="e.g. Faustina"
                      className="rounded-xl border-slate-100 focus:border-[#5A8D39] h-12 font-medium mt-3"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">Major</Label>
                    <Input
                      value={formData.major || ""}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      placeholder="e.g. Informatika"
                      className="rounded-xl border-slate-100 focus:border-[#5A8D39] h-12 font-medium mt-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">Institution</Label>
                    <Input
                      value={formData.institution || ""}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. Universitas Muria Kudus"
                      className="rounded-xl border-slate-100 focus:border-[#5A8D39] h-12 font-medium mt-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/40">
          <CardContent className="p-8">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 mb-4 block">About Me</Label>
            <Textarea
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder="Tell others about your passion and achievements..."
              className="rounded-2xl border-slate-100 focus:border-[#5A8D39] text-sm leading-relaxed resize-none font-medium"
            />
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/40">
          <CardContent className="p-8">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 mb-6 block text-center">Skills & Expertise</Label>

            <div className="flex flex-wrap justify-center gap-2 mb-8 min-h-[40px]">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 rounded-full text-xs font-bold gap-2 items-center bg-indigo-50 text-indigo-600 border-none hover:bg-indigo-100 transition-colors">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer text-indigo-400 hover:text-red-500" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-slate-300 italic">No skills added yet.</p>
              )}
            </div>

            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Press Enter to add skill..."
                className="h-12 rounded-xl border-slate-100 focus:border-[#5A8D39]"
              />
              <Button type="button" onClick={() => addSkill()} className="h-12 w-12 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}