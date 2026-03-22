import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Award } from "lucide-react";
// Import Participation jika diperlukan, atau buat interface lokal
import { Participation } from "@/data/users"; 

export default function TrophyRoom({ history }: { history: any }) {
  // 1. SAFE GUARD: Berikan nilai default jika history atau propertinya null/undefined
  const total = history?.totalParticipated || 0;
  const wins = history?.wins || 0;
  const participations = history?.participations || []; // Ini yang bikin error .map tadi

  // 2. SAFE CALCULATION: Hindari pembagian dengan nol (division by zero)
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  const getBadgeStyle = (result: string) => {
    switch (result) {
      case "Winner":
        return "bg-[#5A8D39] text-white border-none";
      case "Runner-Up":
        return "bg-[#FEF3C7] text-[#D97706] border-none";
      case "Finalist":
        return "bg-[#E0E7FF] text-[#4338CA] border-none";
      default:
        return "bg-[#F1F5F9] text-[#475569] border-none";
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm">
      <h2 className="text-base font-black mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-tight">
        <Medal className="h-5 w-5 text-[#5A8D39]" /> Competition History
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-[1.5rem] bg-slate-50 p-5 text-center border border-slate-100/50">
          <p className="text-2xl font-black text-slate-900">{total}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Competitions</p>
        </div>
        <div className="rounded-[1.5rem] bg-[#F0FDF4] border border-[#DCFCE7] p-5 text-center">
          <p className="text-2xl font-black text-[#5A8D39]">{wins}</p>
          <p className="text-[10px] font-bold text-[#5A8D39]/60 uppercase tracking-widest mt-1">Wins / Podiums</p>
        </div>
      </div>

      <div className="mb-8 px-1">
        <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
          <span>Overall Win Rate</span>
          <span className="text-[#5A8D39]">{winRate}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
             <div 
                className="h-full bg-[#5A8D39] transition-all duration-1000" 
                style={{ width: `${winRate}%` }}
             />
        </div>
      </div>

      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Personal Trophy Room</h3>
      
      <div className="space-y-3">
        {participations.length > 0 ? (
          participations.map((p: any, i: number) => (
            <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-50 p-4 hover:bg-slate-50/50 transition-all group">
              <div className="flex items-center gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${p.result === "Winner" ? "bg-[#F0FDF4]" : "bg-slate-100"}`}>
                  <Trophy className={`h-5 w-5 ${p.result === "Winner" ? "text-[#5A8D39]" : "text-slate-400"}`} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm leading-tight">{p.name}</p>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">
                    {p.year} <span className="mx-1 text-slate-200">•</span> <span className="text-[#5A8D39] font-bold">{p.role}</span>
                  </p>
                </div>
              </div>
              <Badge className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${getBadgeStyle(p.result)}`}>
                {p.result}
              </Badge>
            </div>
          ))
        ) : (
          <div className="py-10 text-center rounded-2xl border-2 border-dashed border-slate-100">
             <p className="text-xs text-slate-400 font-medium italic">Belum ada riwayat kompetisi.</p>
          </div>
        )}
      </div>
    </div>
  );
}