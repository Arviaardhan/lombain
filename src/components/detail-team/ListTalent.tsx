"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Users, Briefcase, MapPin } from "lucide-react";

export default function ListTalent({ members, slots, category, campus, onMemberClick }: any) {
  return (
    <div className="space-y-5">
      {/* Current Team */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-[15px] font-bold mb-6 text-slate-900">Current Team</h2>
        <div className="space-y-6"> {/* Jarak antar list diperbesar sesuai foto */}
          {members.map((member: any) => (
            <button key={member.name} onClick={() => onMemberClick(member)} className="flex w-full items-center gap-4 text-left group">
              <Avatar className="h-10 w-10 border border-slate-50 shadow-sm">
                <AvatarFallback className="bg-[#5A8D39]/5 text-[#5A8D39] font-bold text-xs">{member.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1.5">{member.name}</p>
                <div className="flex">
                  {member.isLeader ? (
                    <Badge variant="outline" className="h-5 text-[9px] border-[#5A8D39]/30 text-[#5A8D39] uppercase font-black tracking-tighter px-2 bg-[#5A8D39]/5">
                      <Crown className="h-2.5 w-2.5 mr-1" /> LEAD
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="h-5 text-[9px] uppercase font-bold px-2 text-slate-400 border-slate-200">
                      MEMBER
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}