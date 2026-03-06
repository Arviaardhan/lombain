import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Award } from "lucide-react";
import { Participation } from "@/data/users";

export default function TrophyRoom({ history }: { history: any }) {
  const winRate = Math.round((history.wins / history.totalParticipated) * 100);

  // Fungsi untuk menentukan style badge berdasarkan hasil
  const getBadgeStyle = (result: Participation["result"]) => {
    switch (result) {
      case "Winner":
        return "bg-[#5A8D39] text-white border-none"; // Hijau Primary
      case "Runner-Up":
        return "bg-[#FEF3C7] text-[#D97706] border-none"; // Amber/Orange
      case "Finalist":
        return "bg-[#E0E7FF] text-[#4338CA] border-none"; // Indigo/Biru
      case "Participant":
        default:
        return "bg-[#F1F5F9] text-[#475569] border-none"; // Abu-abu
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
        <Medal className="h-5 w-5 text-primary" /> Competition History
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl bg-muted/50 p-4 text-center">
          <p className="text-2xl font-bold text-primary">{history.totalParticipated}</p>
          <p className="text-xs text-muted-foreground">Competitions</p>
        </div>
        <div className="rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] p-4 text-center">
          <p className="text-2xl font-bold text-[#5A8D39]">{history.wins}</p>
          <p className="text-xs text-muted-foreground">Wins / Podiums</p>
        </div>
      </div>

      <div className="mb-8 px-1">
        <div className="flex justify-between text-[10px] font-medium text-slate-400 mb-2">
          <span>Win Rate</span>
          <span>{winRate}%</span>
        </div>
        <Progress value={winRate} className="h-1.5 bg-slate-100 [&>div]:bg-[#5A8D39]" />
      </div>

      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">PERSONAL TROPHY ROOM</h3>
      
      <div className="space-y-3">
        {history.participations.map((p: Participation, i: number) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-slate-50 p-3.5 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${p.result === "Winner" ? "bg-[#F0FDF4]" : "bg-slate-100"}`}>
                <Trophy className={`h-5 w-5 ${p.result === "Winner" ? "text-[#5A8D39]" : "text-slate-400"}`} />
              </div>
              <div>
                <p className="font-bold text-slate-700 text-sm">{p.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{p.year} • <span className="text-primary font-semibold">{p.role}</span></p>
              </div>
            </div>
            <Badge className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getBadgeStyle(p.result)}`}>
              {p.result === "Winner" && <Award className="h-3 w-3 mr-1 inline" />}
              {p.result}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}