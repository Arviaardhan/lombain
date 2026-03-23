"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2, Briefcase } from "lucide-react";

interface JoinTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  // Tambahkan props roles agar modal tahu role apa saja yang tersedia
  availableRoles: { id: number; role: string }[];
  onSubmit: (message: string, roleId: number) => Promise<void>;
}

export default function JoinTeamModal({ open, onOpenChange, teamName, availableRoles, onSubmit }: JoinTeamModalProps) {
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || !selectedRole) return;

    setSubmitting(true);
    try {
      await onSubmit(message, Number(selectedRole));
      setMessage("");
      setSelectedRole("");
      onOpenChange(false);
    } catch (error) {
      // Error handled by parent toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">Join {teamName}</DialogTitle>
          <DialogDescription className="font-medium text-slate-500">
            Pilih peran yang ingin kamu ambil dan perkenalkan dirimu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* PILIH ROLE */}
          <div className="space-y-2">
            <Label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-600 flex items-center gap-2">
              <Briefcase className="h-3 w-3" /> Pilih Peran
            </Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="rounded-xl border-slate-200 h-11 focus:ring-[#5A8D39]">
                <SelectValue placeholder="Mau jadi apa di tim ini?" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {availableRoles && availableRoles.map((r) => (
                  <SelectItem key={r.id} value={r.id?.toString() || ""}>
                    {r.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* PESAN PERKENALAN */}
          <div className="space-y-2">
            <Label htmlFor="intro" className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-600">
              Short Introduction
            </Label>
            <Textarea
              id="intro"
              placeholder="Ceritakan mengapa kamu cocok untuk posisi ini..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 200))}
              className="mt-1.5 min-h-[100px] rounded-xl border-slate-200 focus:ring-[#5A8D39]"
            />
            <p className="mt-1 text-[10px] font-bold text-slate-400 text-right">{message.length}/200</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold text-slate-400">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || !message.trim() || !selectedRole}
            className="rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold px-8 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
            {submitting ? "Sending..." : "Send Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}