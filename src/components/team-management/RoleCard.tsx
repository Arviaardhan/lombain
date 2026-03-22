"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Trash2, UserMinus, Lock, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function RoleCard({ role, isDragOver, isRecommended, onDragOver, onDragLeave, onDrop, onEdit, onDelete, onRemoveMember, onViewMember }: any) {
  const isFull = (role.filled || 0) >= (role.max_slot || 1);

  return (
    <motion.div
      layout
      onDragOver={!isFull ? onDragOver : undefined}
      onDragLeave={onDragLeave}
      onDrop={!isFull ? onDrop : undefined}
      animate={{
        scale: isDragOver && !isFull ? 1.02 : 1,
        boxShadow: isRecommended && !isFull && !isDragOver
          ? "0 0 25px rgba(90, 141, 57, 0.4)" 
          : "0 0 0px rgba(0,0,0,0)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`rounded-3xl border p-5 transition-all duration-300 relative ${isDragOver && !isFull
        ? "border-[#5A8D39] bg-[#5A8D39]/5 shadow-xl ring-4 ring-[#5A8D39]/10"
        : isRecommended && !isFull
          ? "border-[#5A8D39]/50 bg-[#5A8D39]/5" 
          : "border-slate-200 bg-white"
        }`}
    >
      <AnimatePresence>
        {isRecommended && !isFull && !isDragOver && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2"
          >
            <Badge className="h-6 gap-1 bg-[#5A8D39] text-white shadow-lg shadow-[#5A8D39]/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> RECOMMENDED
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900">{role.role_name}</p>
            {isFull && <Badge variant="outline" className="text-[9px] gap-1 h-4 border-red-200 text-red-600 bg-red-50"><Lock className="h-2.5 w-2.5" /> FULL</Badge>}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
            {role.filled || 0}/{role.max_slot || 0} FILLED
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl"
            onClick={(e) => {
              e.stopPropagation(); 
              onEdit();
            }}
          >
            <Settings className="h-4 w-4 text-slate-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(); 
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {role.skills?.map((s: any) => (
          <Badge key={s.id || s.skill_name} variant="secondary" className="px-2.5 py-1 text-[10px]">
            {s.skill_name}
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {role.members?.map((member: any) => (
            <motion.div key={`member-${member.id}`} layout>
              <div className={`flex items-center justify-between rounded-2xl p-2 bg-slate-50 border border-slate-100 ${member.isOptimistic ? "opacity-50 grayscale animate-pulse" : ""
                }`}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-[10px] font-black">
                      {member.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{member.name}</span>
                    {member.isOptimistic && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
                  </div>
                </div>

                {!member.isOptimistic && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                    onClick={() => onRemoveMember(member.id)}
                  >
                    <UserMinus className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!isFull && (
          <div className={`rounded-2xl border-2 border-dashed p-4 text-center transition-all ${isDragOver ? "border-[#5A8D39] bg-[#5A8D39]/5" : "border-slate-100"}`}>
            <p className="text-[10px] font-bold text-slate-400">{isDragOver ? "Lepaskan untuk Assign" : "Tarik Request ke Sini"}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}