"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield } from "lucide-react";

export default function ListTalent({ members, onMemberClick }: any) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-6">
      <h2 className="text-[18px] font-bold mb-6 text-slate-900">Current Team</h2>
      <div className="space-y-6">
        {members.map((member: any) => (
          <button 
            key={member.id} 
            onClick={() => onMemberClick(member)} 
            className="flex w-full items-center gap-4 text-left group transition-all active:scale-95"
          >
            <div className="h-12 w-12 rounded-full bg-[#F4F7F2] flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-[#5A8D39] font-bold text-sm">{member.initials}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-900 text-sm truncate">{member.name}</p>
              <div className="flex items-center gap-2 mt-1">
                {member.isLeader ? (
                  <Badge variant="outline" className="text-[10px] h-5 bg-white border-[#5A8D39] text-[#5A8D39] font-bold px-2 rounded-full flex items-center gap-1">
                    <Crown className="h-2.5 w-2.5" /> Team Leader
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] h-5 bg-white border-slate-300 text-slate-500 font-bold px-2 rounded-full flex items-center gap-1">
                    <Shield className="h-2.5 w-2.5" /> Member
                  </Badge>
                )}
              </div>
              <p className="text-[12px] text-slate-400 mt-1 truncate">{member.role}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}