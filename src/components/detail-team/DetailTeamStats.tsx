"use client";

import { Trophy, Shield, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DetailTeamStats({ wins, achievements }: any) {
  const totalWins = Object.values(wins || {}).reduce((sum: number, w: any) => sum + (w as number), 0);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="h-5 w-5 text-[#5A8D39]" />
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Team Achievements</h2>
      </div>

      {/* Box Lineup Strength (Warna Hijau Muda ala Lovable) */}
      <div className="rounded-2xl border border-[#5A8D39]/10 bg-[#f9fcf7] p-6 mt-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#5A8D39]" />
              <span className="text-[15px] font-bold text-slate-900 uppercase tracking-tight">Lineup Strength</span>
            </div>
            <p className="text-[13px] text-slate-400 font-medium mt-3">Combined wins from all active members</p>
          </div>
          <span className="text-4xl font-black text-[#5A8D39] leading-none opacity-80">{totalWins}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(wins || {}).map(([name, count]: any) => (
            <div key={name} className="flex items-center gap-2 rounded-full bg-white border border-slate-100 pl-1 pr-2.5 py-1 shadow-sm">
              <Avatar className="h-5 w-5"><AvatarFallback className="text-[7px] font-bold">{name.substring(0, 2)}</AvatarFallback></Avatar>
              <span className="text-[11px] font-bold text-slate-700">{name.split(" ")[0]}</span>
              <Badge className="bg-[#5A8D39]/10 text-[#5A8D39] border-0 text-[9px] h-4 px-1.5 font-bold rounded-md">{count}W</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement List */}
      <div className="space-y-4">
        {achievements?.map((a: any) => (
          <div key={a.competition} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f7ec] border border-[#5A8D39]/10 text-[#5A8D39]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">{a.competition}</h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">{a.year}</p>

                  {/* Roster Stacked Avatar - UX: Safe mapping */}
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">ROSTER:</span>
                    <div className="flex -space-x-1"> {/* Negative margin ditambah sedikit agar tumpukan tetap pas */}
                      {a.roster?.map((m: any, idx: number) => (
                        <Avatar key={idx} className="h-6 w-6 ring-2 ring-white shadow-sm transition-transform">
                          <AvatarFallback className="text-[8px] font-black text-[#5A8D39] bg-[#5A8D39]/5">
                            {m.initials || "?"}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 ml-1">
                      {a.roster?.map((m: any) => m.name?.split(" ")[0] || "Member").join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className={a.result === "Winner"
                ? "bg-[#5A8D39] text-white rounded-full text-[10px] font-black px-3 h-6"
                : "bg-orange-50 text-orange-400 border border-orange-100 rounded-full text-[10px] font-black px-3 h-6"}>
                {a.result}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}