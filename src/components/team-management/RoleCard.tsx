"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Trash2, UserMinus, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function RoleCard({ role, isDragOver, onDragOver, onDragLeave, onDrop, onEdit, onDelete, onRemoveMember, onViewMember }: any) {
  const isFull = (role.filled || 0) >= (role.max_slot || 1);

  return (
    <motion.div
      layout
      onDragOver={!isFull ? onDragOver : undefined}
      onDragLeave={onDragLeave}
      onDrop={!isFull ? onDrop : undefined}
      animate={{ scale: isDragOver && !isFull ? 1.02 : 1 }}
      className={`rounded-3xl border p-5 transition-all duration-300 ${
        isDragOver && !isFull ? "border-[#5A8D39] bg-[#5A8D39]/5 shadow-xl ring-4 ring-[#5A8D39]/10" : "border-slate-200 bg-white"
      }`}
    >
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
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={onEdit}><Settings className="h-4 w-4 text-slate-400" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={onDelete}><Trash2 className="h-4 w-4 text-slate-400" /></Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {role.skills?.map((s: any) => (
          <Badge key={s.id || s.skill_name} variant="secondary" className="px-2.5 py-1 text-[10px] font-semibold bg-indigo-50 hover:bg-indigo-50 text-indigo-600 rounded-full border-none">
            {s.skill_name}
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {role.members?.map((member: any) => (
            <motion.div
              key={`member-${member.id}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="flex items-center justify-between rounded-2xl p-2 bg-slate-50 border border-slate-100 group transition-all">
                <button onClick={() => onViewMember(member)} className="flex items-center gap-3 text-left">
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-[10px] font-black">{member.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-bold text-slate-700">{member.name}</span>
                </button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-red-500" onClick={() => onRemoveMember(member.id)}><UserMinus className="h-3.5 w-3.5" /></Button>
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