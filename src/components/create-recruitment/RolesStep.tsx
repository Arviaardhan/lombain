"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Plus, Users2, ShieldCheck, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function RolesStep({ 
  roles, addRole, updateRoleField, removeRole, 
  leaderRole, setLeaderRole, errors 
}: any) {
  const [skillInputs, setSkillInputs] = useState<Record<number, string>>({});

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex items-start gap-4 mb-10">
        <div className="p-3 bg-green-50 rounded-2xl">
          <Users2 className="h-6 w-6 text-[#5A8D39]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kebutuhan Role</h2>
          <p className="text-sm text-slate-500 font-medium tracking-tight">
            Definisikan posisi yang kamu butuhkan di tim
          </p>
        </div>
      </div>

      {/* LEADER ROLE SECTION */}
      <div className="p-6 border-2 border-[#5A8D39]/20 rounded-[1.5rem] bg-white shadow-sm ring-1 ring-[#5A8D39]/5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-4 w-4 text-[#5A8D39]" />
          <label className="text-[11px] font-black text-[#5A8D39] uppercase tracking-[0.2em]">Peran Kamu (Leader)</label>
        </div>
        <Input 
          value={leaderRole}
          onChange={(e) => setLeaderRole(e.target.value)}
          placeholder="Contoh: Project Manager / Fullstack Dev"
          className="rounded-xl border-slate-300 bg-slate-50/30 h-12 font-bold text-slate-900 focus-visible:ring-[#5A8D39]"
        />
      </div>

      <div className="flex items-center gap-2 pt-6 pb-2 border-b border-slate-100">
        <Briefcase className="h-4 w-4 text-slate-500" />
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Posisi yang Dicari</h3>
      </div>

      {/* DYNAMIC ROLES LIST */}
      <div className="space-y-8">
        {roles.map((role: any, index: number) => (
          <div key={index} className="relative p-7 border border-slate-200 rounded-2xl bg-white shadow-sm animate-in zoom-in-95 hover:border-[#5A8D39]/30 transition-colors">
            <button 
              type="button"
              onClick={() => removeRole(index)} 
              className="absolute top-3 right-6 text-slate-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="space-y-6">
              {/* Nama Role */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4.5 block">Nama Role</label>
                <Input 
                  value={role.role_name}
                  onChange={(e) => updateRoleField(index, "role_name", e.target.value)}
                  placeholder="e.g. Frontend Developer"
                  className="rounded-xl bg-slate-50/50 border-slate-300 h-12 font-bold focus-visible:ring-[#5A8D39]"
                />
              </div>

              {/* Tanggung Jawab */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Tanggung Jawab</label>
                <Textarea 
                  value={role.description}
                  onChange={(e) => updateRoleField(index, "description", e.target.value)}
                  placeholder="Contoh: Merancang arsitektur API dan mengelola database..."
                  className="rounded-xl bg-slate-50/50 border-slate-300 min-h-[100px] leading-relaxed focus-visible:ring-[#5A8D39]"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Skill yang Dibutuhkan</label>
                <div className="flex gap-2">
                  <Input 
                    value={skillInputs[index] || ""}
                    onChange={(e) => setSkillInputs({...skillInputs, [index]: e.target.value})}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter') {
                        e.preventDefault();
                        const currentSkills = role.skills || [];
                        if (skillInputs[index]?.trim()) {
                           updateRoleField(index, "skills", [...currentSkills, skillInputs[index].trim()]);
                           setSkillInputs({...skillInputs, [index]: ""});
                        }
                      }
                    }}
                    placeholder="Ketik skill lalu Enter..."
                    className="rounded-xl bg-slate-50/50 border-slate-300 h-12"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {(role.skills || []).map((s: string, sIdx: number) => (
                    <Badge key={sIdx} className="bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 border-none px-3 py-1.5 rounded-lg font-bold transition-all group">
                      {s} 
                      <X className="h-3 w-3 ml-2 cursor-pointer transition-transform group-hover:scale-110" onClick={() => {
                        const filtered = role.skills.filter((_: any, i: number) => i !== sIdx);
                        updateRoleField(index, "skills", filtered);
                      }} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD ROLE BUTTON */}
      <Button 
        type="button"
        onClick={addRole}
        variant="outline" 
        className="w-full py-12 border-dashed border-2 rounded-[2rem] bg-slate-50/30 text-slate-400 hover:text-[#5A8D39] hover:border-[#5A8D39] hover:bg-white transition-all font-bold flex flex-col gap-2 group"
      >
        <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" /> 
        <span>Tambah Role yang Dibutuhkan</span>
      </Button>
    </div>
  );
}