"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Trash2, UserMinus, Lock, Plus, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function RoleCard({
  role,
  isDragOver,
  isRecommended,
  onDragOver,
  onDragLeave,
  onDrop,
  onEdit,
  onDelete,
  onRemoveMember,
  onViewMember,
  isLocked
}: any) {

  const isFull = (role.filled || 0) >= (role.max_slot || 1);
  const canDrop = !isFull && !isLocked;

  const getMemberStatus = (member: any) => {
    if (isLocked && member.status === "assigned") {
      return "accepted";
    }
    return member.status;
  };

  const visibleMembers = role.members?.filter(
    (m: any) => m.status === "assigned" || m.status === "accepted"
  );

  return (
    <motion.div
      layout
      onDragOver={canDrop ? onDragOver : undefined}
      onDragLeave={onDragLeave}
      onDrop={canDrop ? onDrop : undefined}
      animate={{
        scale: isDragOver && canDrop ? 1.02 : 1,
        boxShadow: isRecommended && !isFull && !isDragOver && !isLocked
          ? "0 0 25px rgba(90, 141, 57, 0.4)"
          : "0 0 0px rgba(0,0,0,0)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`rounded-3xl border p-5 transition-all duration-300 relative ${isDragOver && canDrop
        ? "border-[#5A8D39] bg-[#5A8D39]/5 shadow-xl ring-4 ring-[#5A8D39]/10"
        : isRecommended && !isFull && !isLocked
          ? "border-[#5A8D39]/50 bg-[#5A8D39]/5"
          : "border-slate-200 bg-white"
        }`}
    >
      {/* Badge Recommended */}
      <AnimatePresence>
        {isRecommended && !isFull && !isDragOver && !isLocked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2"
          >
            <Badge className="h-6 gap-1 bg-[#5A8D39] text-white shadow-lg text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border-none">
              <Sparkles className="h-3.5 w-3.5" /> RECOMMENDED
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900">{role.role_name}</p>

            {isLocked ? (
              <Badge variant="outline" className="text-[9px] gap-1 h-4 border-slate-200 text-slate-400 bg-slate-50">
                <Lock className="h-2.5 w-2.5" /> LOCKED
              </Badge>
            ) : isFull ? (
              <Badge variant="outline" className="text-[9px] gap-1 h-4 border-red-200 text-red-600 bg-red-50">
                <Lock className="h-2.5 w-2.5" /> FULL
              </Badge>
            ) : null}
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
            {role.filled || 0}/{role.max_slot || 0} FILLED
          </p>
        </div>

        {/* Actions */}
        {!isLocked && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl text-slate-400"
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl text-slate-400 hover:text-red-500"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(role.required_skills || role.skills)?.map((skill: any, idx: number) => (
          <Badge
            key={`${role.id}-skill-${idx}`}
            variant="secondary"
            className="pl-3 pr-3 py-1.5 text-[10px] border-none font-bold rounded-lg"
          >
            {typeof skill === 'string' ? skill : (skill.skill_name || skill.name)}
          </Badge>
        ))}
      </div>

      {/* Members */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {visibleMembers.map((member: any) => {
            const status = getMemberStatus(member);

            return (
              <motion.div key={`member-${member.id}`} layout>
                <div className={`flex items-center justify-between rounded-2xl p-2 border transition-all ${status === 'assigned'
                  ? "border-amber-200 bg-amber-50/50 shadow-sm"
                  : "bg-slate-50 border-slate-100"
                  }`}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className={`${status === 'assigned'
                        ? "bg-amber-100 text-amber-600"
                        : "bg-[#5A8D39]/10 text-[#5A8D39]"
                        } text-[10px] font-black`}>
                        {member.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className={`text-xs font-bold ${status === 'assigned'
                      ? "text-amber-800"
                      : "text-slate-700"
                      }`}>
                      {member.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* ✅ DRAFT */}
                    {status === 'assigned' && (
                      <Badge className="bg-amber-100 text-amber-700 border-none text-[8px] font-black px-2 py-0.5">
                        DRAFT
                      </Badge>
                    )}

                    {/* ✅ ACCEPTED */}
                    {status === 'accepted' && (
                      <Badge className="bg-green-100 text-green-700 border-none text-[8px] font-black px-2 py-0.5">
                        ACCEPTED
                      </Badge>
                    )}

                    {!isLocked && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() => onRemoveMember(member.id)}
                      >
                        <UserMinus className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Drop Zone */}
        {!isFull && !isLocked && (
          <div
            className={`rounded-2xl border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2 ${isDragOver ? "border-[#5A8D39] bg-[#5A8D39]/10" : "border-slate-100 bg-slate-50/50"
              }`}
          >
            <div className={`p-1.5 rounded-full ${isDragOver ? "bg-[#5A8D39] text-white" : "bg-slate-200 text-slate-400"
              }`}>
              <Plus className="h-3 w-3" />
            </div>

            <p className={`text-[10px] font-bold uppercase ${isDragOver ? "text-[#5A8D39]" : "text-slate-400"
              }`}>
              {isDragOver ? "Lepaskan untuk Assign" : "Tarik Request ke Sini"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}