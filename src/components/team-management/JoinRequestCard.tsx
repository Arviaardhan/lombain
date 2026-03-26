"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Check, Clock, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

interface JoinRequestCardProps {
  request: {
    id: string;
    name: string;
    initials: string;
    appliedRole: string;
    appliedAt?: string;
    bio?: string;
    skills: string[];
  };
  onAccept: () => void;
  onReject: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export default function JoinRequestCard({
  request,
  onAccept,
  onReject,
  onDragStart,
  onDragEnd,
  isDragging
}: JoinRequestCardProps & {onDragEnd?: () => void}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isDragging ? 0.4 : 1,
        scale: isDragging ? 1.05 : 1,
        rotate: isDragging ? 2 : 0,
        y: 0
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      exit={{ opacity: 0, scale: 0.9, x: 30, transition: { duration: 0.2 } }}

      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      
      className="group rounded-2xl border border-border bg-card p-4 pr-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#5A8D39]/20 group-hover:bg-[#5A8D39]/50 transition-colors" />

      <div className="flex items-start gap-1">
        <div className="mt-4 text-slate-300 group-hover:text-[#5A8D39] transition-colors shrink-0">
          <GripVertical className="h-4 w-4" />
        </div>

        <Avatar className="h-12 w-12 rounded-2xl shrink-0 border border-slate-100 shadow-sm ml-0.5">
          <AvatarFallback className="bg-primary/5 text-lg font-bold text-primary rounded-2xl">
            {request.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-1.5 ml-2">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-foreground leading-tight">{request.name}</h3>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium shrink-0">
              <Clock className="h-3 w-3 text-[#5A8D39]/70" />
              {request.appliedAt}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5A8D39] leading-none shrink-0">
              Applied for
            </p>
            {/* Badge Role: Ditambah hover:bg-[#5A8D39]/10 agar tidak berubah saat di-hover */}
            <Badge
              variant="secondary"
              className="bg-[#5A8D39]/10 text-[#5A8D39] hover:bg-[#5A8D39]/10 px-2 py-0.5 text-[11px] font-bold rounded-md border-none shadow-none"
            >
              {request.appliedRole}
            </Badge>
          </div>

          {request.bio && (
            <p className="text-[11px] text-muted-foreground italic leading-relaxed pt-1 font-light">
              "{request.bio}"
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 pt-2">
            {request.skills.map((skill: string) => (
              <Badge
                key={skill}
                variant="secondary"
                /* Badge Skills: Ditambah hover:bg-indigo-50 agar tetap statis */
                className="px-2.5 py-1 text-[10px] font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-50 rounded-full border-none shadow-none"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={onReject} className="rounded-xl h-8 gap-1 text-[11px] font-bold text-slate-600 border-slate-200 hover:bg-red-500 hover:text-white px-4 transition-all">
              <X className="h-3.5 w-3.5" /> Reject
            </Button>
            <Button size="sm" onClick={onAccept} className="rounded-xl h-8 gap-1 bg-[#5A8D39] hover:bg-[#4a752f] text-white text-[11px] font-bold px-4 shadow-sm transition-all">
              <Check className="h-3.5 w-3.5" /> Accept
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}