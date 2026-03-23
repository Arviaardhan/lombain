"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api-constant";
import { parse } from "path";

interface InviteToTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetUser: { id: number; name: string; initials: string; skills: string[]; avatar?: string } | null;
}

export default function InviteToTeamModal({ open, onOpenChange, targetUser }: InviteToTeamModalProps) {
  const { toast } = useToast();
  const [myTeams, setMyTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [message, setMessage] = useState("");
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedTeam("");
      setMessage("");

      const fetchMyTeams = async () => {
        setIsLoadingTeams(true);
        try {
          const token = Cookies.get("token");
          const res = await fetch(`${API_BASE_URL}/user/dashboard`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
            },
          });
          const result = await res.json();
          if (result.success) {
            setMyTeams(result.data.managed_teams || []);
          }
        } catch (error) {
          console.error("Failed to fetch teams:", error);
        } finally {
          setIsLoadingTeams(false);
        }
      };
      fetchMyTeams();
    }
  }, [open]);

  // 2. Logic Kirim Undangan ke Laravel
  const handleSend = async () => {
    if (!selectedTeam) {
      toast({ title: "Pilih tim terlebih dahulu", variant: "destructive" });
      return;
    }

    setIsSending(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/teams/invite`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          team_id: parseInt(selectedTeam),
          user_id: targetUser?.id,
          note: message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: "Berhasil Mengundang! 🚀",
          description: `Undangan telah dikirim ke ${targetUser?.name}.`,
        });
        onOpenChange(false);
        setSelectedTeam("");
        setMessage("");
      } else {
        toast({ title: "Gagal Mengundang", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Terjadi kesalahan koneksi.", variant: "destructive" });
    } finally {
      setIsSending(false);
    }
  };

  // --- DATA GUARD: Mencegah error .join() atau .split() ---
  if (!targetUser) return null;
  const skillsArray = Array.isArray(targetUser.skills) ? targetUser.skills : [];
  const firstName = targetUser.name ? targetUser.name.split(" ")[0] : "Talent";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">Undang ke Tim</DialogTitle>
          <DialogDescription className="font-medium text-slate-500">
            Ajak <span className="text-[#5A8D39] font-bold">{targetUser.name}</span> untuk berkolaborasi dalam proyekmu.
          </DialogDescription>
        </DialogHeader>

        {/* Info Talent Mini Card */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-400 bg-slate-50/50 p-4 mt-2">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-100">
            <AvatarImage src={targetUser.avatar} />
            <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] font-bold text-sm">
              {targetUser.initials || "??"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-bold text-sm text-slate-900 truncate">{targetUser.name}</p>
            <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wider truncate mt-1">
              {skillsArray.length > 0 ? skillsArray.slice(0, 2).join(", ") : "No skills listed"}
            </p>
          </div>
        </div>

        <div className="space-y-10 mt-6">
          <div className="space-y-2.5">
            <Label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-600">Pilih Tim Kamu</Label>
            <Select
              value={selectedTeam}
              onValueChange={setSelectedTeam}
              disabled={isLoadingTeams}
            >
              <SelectTrigger className="rounded-xl border-slate-400 h-11 focus:ring-[#5A8D39] mt-3">
                {/* SelectValue akan menampilkan placeholder jika value="" */}
                <SelectValue placeholder={isLoadingTeams ? "Memuat tim..." : "Pilih tim untuk undangan ini"} />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {myTeams.length > 0 ? (
                  myTeams.map((team) => (
                    <SelectItem
                      key={team.id}
                      value={team.id.toString()}
                      className="text-sm font-medium"
                    >
                      {team.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 italic">
                    Kamu belum memimpin tim apapun.
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-600">
              Pesan Tambahan <span className="text-slate-500 font-normal italic">(opsional)</span>
            </Label>
            <Textarea
              className="rounded-xl border-slate-400 focus:ring-[#5A8D39] resize-none mt-3"
              placeholder={`Halo ${firstName}, kami sedang mencari anggota dengan keahlianmu!`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-8 flex gap-3 sm:justify-end">
          <Button
            variant="ghost"
            className="rounded-xl font-bold text-slate-400 hover:text-slate-600 px-6"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            onClick={handleSend}
            // MODIFIKASI: Tambahkan !selectedTeam agar button mati jika tim belum dipilih
            disabled={isSending || isLoadingTeams || !selectedTeam}
            className="rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold h-11 px-8 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {isSending ? "Mengirim..." : "Kirim Undangan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}