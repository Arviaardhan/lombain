"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: any;
  onSave: (formData: any) => Promise<void | boolean>;
}

export default function EditRoleDialog({ open, onOpenChange, role, onSave }: EditRoleDialogProps) {
  const [formData, setFormData] = useState({
    role_name: "",
    max_slot: 1,
    skills: [] as string[]
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (role) {
      const initialSkills = role.required_skills || role.skills || [];

      setFormData({
        role_name: role.role_name || "",
        max_slot: role.max_slot || 1,
        skills: initialSkills.map((s: any) => typeof s === 'string' ? s : s.skill_name)
      });
    } else {
      setFormData({ role_name: "", max_slot: 1, skills: [] });
    }
  }, [role, open]);

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillName: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillName) });
  };

  // Validasi: Harus ada nama role DAN minimal 1 skill
  const isInvalid = !formData.role_name.trim() || formData.skills.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8 border-none shadow-2xl">
        <DialogHeader className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900/40">
            {role?.id ? "Configuration" : "New Placement"}
          </p>
          <DialogTitle className="text-3xl font-bold text-slate-900 tracking-tight">
            {role?.id ? "Edit Role" : "Add Role"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Input Role Name */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 flex justify-between">
              Role Name <span className="text-red-500">*</span>
            </label>
            <Input 
              value={formData.role_name} 
              onChange={(e) => setFormData({...formData, role_name: e.target.value})}
              placeholder="e.g. Frontend Developer"
              className="h-14 rounded-2xl border-2 border-slate-200 focus:border-[#5A8D39] focus:ring-0 transition-all font-medium text-slate-700 placeholder:text-slate-300"
            />
          </div>

          {/* Input Max Slots */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900">
              Max Member Slots
            </label>
            <div className="flex items-center gap-4 mt-3">
               <Input 
                type="number" 
                min={1}
                value={formData.max_slot} 
                onChange={(e) => setFormData({...formData, max_slot: parseInt(e.target.value) || 1})}
                className="h-14 w-28 rounded-2xl border-2 border-slate-200 focus:border-[#5A8D39] text-center font-bold text-lg"
              />
              <p className="text-sm text-slate-400 font-medium">Persons will be able to join this role.</p>
            </div>
          </div>

          {/* Input Skills */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 flex justify-between">
              Required Technical Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mt-3">
              <Input 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Press Enter to add skill..."
                className="h-14 rounded-2xl border-2 border-slate-200 focus:border-[#5A8D39] font-medium"
              />
              <Button 
                type="button" 
                size="icon" 
                onClick={addSkill} 
                className="h-14 w-14 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] transition-all shrink-0"
              >
                <Plus className="h-6 w-6 text-white" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-3 py-1.5 text-[11px] flex items-center gap-2 transition-all"
                >
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)} 
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-[11px] text-red-400 italic">
                  Please add at least one skill to continue.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-3">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="h-14 flex-1 rounded-2xl font-bold text-slate-500 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onSave({ ...formData, id: role?.id })} 
            disabled={isInvalid}
            className={`h-14 flex-1 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              isInvalid 
              ? "bg-slate-200 cursor-not-allowed shadow-none text-slate-400" 
              : "bg-[#5A8D39] hover:bg-[#4a752f] shadow-[#5A8D39]/20"
            }`}
          >
            {role?.id ? "Update Configuration" : "Create Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}