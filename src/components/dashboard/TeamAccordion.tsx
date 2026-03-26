"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Crown, Shield, Edit2, Settings2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import Cookies from "js-cookie";

export default function TeamAccordion({ team, isExpanded, onToggle, isOwner = false }: any) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setCurrentUserId(userData.id.toString());
    }
  }, []);

  // Gabungkan Leader ke dalam list member jika belum ada (opsional untuk visual)
  const allMembers = [...(team.users || [])];

  const sortedMembers = allMembers.sort((a, b) => {
    const roleA = a.pivot?.role?.toLowerCase() || "";
    const roleB = b.pivot?.role?.toLowerCase() || "";
    if (roleA === 'leader') return -1;
    if (roleB === 'leader') return 1;
    return 0;
  });

  return (
    <div className={`rounded-2xl border transition-all duration-300 ${isExpanded ? "border-[#5A8D39]/30 shadow-lg" : "border-border bg-card"}`}>
      <div
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${isExpanded ? "bg-[#5A8D39] text-white" : "bg-slate-100 text-slate-400"}`}>
            <Users className="h-6 w-6" />
          </div>
          <div className="text-left">
            <p className="font-bold text-slate-900 leading-tight">{team.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-slate-200 text-slate-500 font-medium">
                {/* Menampilkan angka yang sudah +1 dari backend */}
                {(team.member_count ?? 0)} / {(team.max_members ?? 0)} Members
              </Badge>
              {isOwner && <Badge className="bg-amber-100 text-amber-700 border-none text-[9px] h-5 px-1.5 font-bold uppercase tracking-wider">Owner</Badge>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isOwner && (
            <div className="flex items-center gap-1.5 mr-2">
              <Link href={`/create/manage/${team.id}`} onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#5A8D39] hover:bg-[#5A8D39]/10">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/create/edit/${team.id}`} onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#5A8D39] hover:bg-[#5A8D39]/10">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
          <ArrowRight className={`h-5 w-5 text-slate-300 transition-transform duration-500 ${isExpanded ? "rotate-90 text-[#5A8D39]" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-slate-50/30"
          >
            <div className="p-4">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 block">
                Current Members
              </Label>

              <div className="space-y-1">
                {/* 1. SELALU tampilkan Leader di paling atas (baik untuk Owner maupun Joined Team) */}
                {team.leader && (
                  <div className="flex items-center justify-between py-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-none">
                        <AvatarImage src={team.leader.avatar} />
                        <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-sm font-bold">
                          {team.leader.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-base font-bold text-slate-900">
                          {team.leader.id.toString() === currentUserId ? `You (${team.leader.name})` : team.leader.name}
                        </p>
                        <Badge className="h-6 px-2 gap-1.5 rounded-full border-[#5A8D39]/30 bg-[#5A8D39]/5 text-[#5A8D39] font-bold text-[9px] uppercase tracking-wide">
                          <Crown className="h-3 w-3" /> Team Leader
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Render member lainnya (Hanya yang BUKAN Leader) */}
                {sortedMembers
                  .filter((member: any) => member.id !== team.leader_id && member.id !== team.leader?.id) // KUNCINYA DI SINI: Filter Leader agar tidak double
                  .map((member: any, index: number, filteredArray: any[]) => {
                    const isMe = member.id.toString() === currentUserId;

                    return (
                      <div key={member.id} className={`flex items-center justify-between py-4 ${index !== filteredArray.length - 1 ? "border-b border-slate-100" : ""}`}>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-none">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-sm font-bold">
                              {member.name?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-base font-bold text-slate-900">
                              {isMe ? `You (${member.name})` : member.name}
                            </p>
                            <Badge variant="outline" className="h-6 px-2 gap-1.5 rounded-full border-slate-200 font-bold text-[9px] uppercase tracking-wide text-slate-900 bg-white">
                              <Shield className="h-3 w-3" /> Member
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* Jika tim benar-benar kosong (hanya leader sendirian) */}
                {sortedMembers.filter((m: any) => m.id !== team.leader_id).length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-sm italic font-medium">
                    No other members yet.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}