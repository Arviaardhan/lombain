"use client";

import { Badge } from "@/components/ui/badge";
import { Crown, Shield } from "lucide-react";

export default function ListTalent({ members, onMemberClick }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm ">
      <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">
        Anggota Tim
      </h2>
      <div className="space-y-7">
        {members.map((member: any) => (
          <button 
            key={member.id} 
            onClick={() => onMemberClick(member)} 
            className="flex w-full items-center gap-4 text-left group transition-all active:scale-95"
          >
            {/* Avatar Section */}
            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden group-hover:border-[#5A8D39]/30 transition-colors">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-[#5A8D39] font-black text-xs">{member.initials}</span>
              )}
            </div>

            {/* Info Section */}
            <div className="min-w-0 flex-1 cursor-pointer">
              <p className="font-bold text-slate-900 text-sm truncate group-hover:text-[#5A8D39] transition-colors">
                {member.name}
              </p>
              
              <div className="flex flex-col gap-1.5 mt-1.5"> 
                {member.isLeader ? (
                  <>
                    <Badge 
                      variant="outline" 
                      className="w-fit text-[9px] h-5 bg-green-50/50 border-[#5A8D39]/30 text-[#5A8D39] font-black px-2.5 rounded-lg flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Crown className="h-2.5 w-2.5" /> Leader
                    </Badge>
                    <span className="text-[11px] font-bold text-slate-600 truncate">
                      {member.role || "Team lead"}
                    </span>
                  </>
                ) : (
                  <Badge 
                    variant="outline" 
                    className="w-fit text-[9px] h-5 bg-slate-50 border-slate-200 text-slate-500 font-black px-2.5 rounded-lg flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Shield className="h-2.5 w-2.5" /> {member.role || "Member"}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}