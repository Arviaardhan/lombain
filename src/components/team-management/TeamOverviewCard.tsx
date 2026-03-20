"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Role {
  id: number | string;
  role_name: string;
  filled: number;
  max_slot: number;
}

interface TeamOverviewCardProps {
  team: {
    name: string;
    competition: string;
    category: string;
    deadline: string;
  };
  totalFilled: number;
  totalMax: number;
  roles: Role[];
}

export default function TeamOverviewCard({ team, totalFilled, totalMax, roles }: TeamOverviewCardProps) {
  const fillPercentage = totalMax > 0 ? Math.round((totalFilled / totalMax) * 100) : 0;

  return (
    <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5A8D39]/10">
              <Trophy className="h-6 w-6 text-[#5A8D39]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">COMPETITION</p>
              <p className="text-lg font-bold text-slate-900">{team.competition || "Nama Kompetisi"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded-full">
              <Target className="h-4 w-4 text-slate-500" />
              <span>{team.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>Recruitment Closes: {team.deadline ? new Date(team.deadline).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" }) : "-"}</span>
            </div>
          </div>
        </div>

        {/* Right: Capacity Indicator */}
        <div className="min-w-[280px] space-y-4 bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">TEAM CAPACITY</p>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#5A8D39]" />
              <span className="text-sm font-black text-slate-900">{totalFilled}/{totalMax}</span>
            </div>
          </div>
          <Progress value={fillPercentage} className="h-2.5 bg-slate-200" />
          <div className="flex flex-wrap gap-1.5">
            {roles.map((role) => (
              <Badge
                key={role.id}
                variant={role.filled >= role.max_slot ? "default" : "outline"}
                className={`text-[10px] gap-1.5 rounded-lg px-2 py-0.5 ${role.filled >= role.max_slot ? 'bg-[#5A8D39]' : 'border-slate-300 text-slate-600'}`}
              >
                {role.role_name}
                <span className="font-bold opacity-80">{role.filled}/{role.max_slot}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}