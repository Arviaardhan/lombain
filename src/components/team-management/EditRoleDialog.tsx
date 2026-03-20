"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Target } from "lucide-react";

interface Role {
  id: string | number;
  role_name: string; // Di Laravel kamu pakai role_name
  skills: any[];     // Bisa array string atau object
  filled: number;
  max_slot: number;  // Di Laravel kamu pakai max_slot
  members: any[];
}

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
  onSave: (role: any) => void;
}

export default function EditRoleDialog({ open, onOpenChange, role, onSave }: EditRoleDialogProps) {
  // State lokal untuk form
  const [name, setName] = useState(role.role_name);
  const [max, setMax] = useState(role.max_slot);
  
  // Normalisasi skills: ubah object skill Laravel menjadi string agar mudah diolah di UI
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Gunakan useEffect untuk reset state saat dialog dibuka dengan role berbeda
  useEffect(() => {
    setName(role.role_name);
    setMax(role.max_slot);
    
    const normalizedSkills = role.skills?.map(s => 
      typeof s === 'string' ? s : (s.skill_name || s.name)
    ) || [];
    setSkills(normalizedSkills);
  }, [role, open]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    // Kirim balik data yang sudah diupdate
    onSave({ 
      ...role, 
      role_name: name, 
      max_slot: Math.max(max, role.filled), 
      skills: skills // Kita kirim array string, nanti di Backend diconvert
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-[#5A8D39]/10 rounded-lg">
                <Target className="h-4 w-4 text-[#5A8D39]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5A8D39]">
                Management Role
            </p>
          </div>
          <DialogTitle className="text-xl font-black text-slate-900 leading-tight">
            Edit {role.role_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Role Name */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Nama Role
            </Label>
            <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Contoh: Frontend Developer"
                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-semibold" 
            />
          </div>

          {/* Max Slots */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Kapasitas Slot
            </Label>
            <div className="flex items-center gap-4">
                <Input
                type="number"
                min={role.filled}
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value) || 1)}
                className="h-12 w-24 rounded-2xl border-slate-100 bg-slate-50/50 text-center font-bold text-lg"
                />
                <div className="flex-1">
                    <p className="text-[11px] font-medium text-slate-500">
                        Slot tersedia untuk anggota tim. 
                    </p>
                    {role.filled > 0 && (
                        <p className="text-[10px] text-[#5A8D39] font-bold mt-0.5 uppercase tracking-tighter">
                           ⚠️ Minimum {role.filled} (sudah ada anggota)
                        </p>
                    )}
                </div>
            </div>
          </div>

          {/* Skills Management */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Requirement Skills
            </Label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Tambah skill (ex: React, Figma...)"
                className="h-11 rounded-2xl border-slate-100 bg-slate-50/50 text-sm"
              />
              <Button 
                type="button"
                size="icon" 
                onClick={addSkill} 
                className="h-11 w-11 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] transition-all shadow-md shadow-green-900/10"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 border-none hover:bg-red-50 hover:text-red-500 transition-colors group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-tight">{skill}</span>
                  <button onClick={() => removeSkill(skill)} className="opacity-50 group-hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skills.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic ml-1">Belum ada skill yang ditambahkan.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 mt-2">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="rounded-2xl font-bold text-slate-500 hover:bg-slate-100"
          >
            Batal
          </Button>
          <Button 
            onClick={handleSave} 
            className="rounded-2xl bg-slate-900 hover:bg-black font-bold px-8 shadow-xl"
          >
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}