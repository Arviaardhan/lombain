"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight, Crown, Shield, UserMinus, Edit2, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TeamAccordion({ team, isExpanded, onToggle, onRemoveTrigger }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div 
        onClick={onToggle} 
        className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-[#5A8D39]">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">{team.name}</p>
            <p className="text-xs text-muted-foreground">
              {team.filled || team.member_count}/{team.total || team.max_members} members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* TOMBOL BARU: Management Role */}
          <Link 
            href={`/create/manage/${team.id}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 rounded-lg border-slate-200 text-slate-600 hover:text-[#5A8D39] hover:border-[#5A8D39]/30 shadow-sm"
            >
              <Settings2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Manage</span>
            </Button>
          </Link>

          {/* Tombol Edit Info */}
          <Link 
            href={`/create/edit/${team.id}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 rounded-lg border-slate-200 text-slate-600 hover:text-[#5A8D39] hover:border-[#5A8D39]/30 shadow-sm"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </Link>

          <Badge variant={team.status === "Recruiting" ? "default" : "outline"}>
            {team.status}
          </Badge>
          
          <ArrowRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#5A8D39]" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-slate-50/30"
          >
            <div className="p-4 space-y-2">
              {team.members && team.members.length > 0 ? (
                team.members.map((member: any) => (
                  <div key={member.id || member.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-slate-100 text-[10px] font-bold text-slate-600">
                          {member.initials || member.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{member.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="secondary" className="text-[9px] px-1.5 h-4 font-medium uppercase tracking-wider bg-white border-slate-200">
                            {member.isLeader || member.pivot?.role === 'leader' ? (
                              <><Crown className="h-2.5 w-2.5 mr-1 text-amber-500" /> Leader</>
                            ) : (
                              <><Shield className="h-2.5 w-2.5 mr-1 text-blue-500" /> Member</>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {!(member.isLeader || member.pivot?.role === 'leader') && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 text-[11px] text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemoveTrigger(team.name, member.name);
                        }}
                      >
                        <UserMinus className="h-3.5 w-3.5 mr-1.5" /> Remove
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-xs text-muted-foreground italic">
                  Belum ada anggota tim selain kamu.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}