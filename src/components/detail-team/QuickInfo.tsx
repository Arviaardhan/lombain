"use client";

import { Users, Layers, School } from "lucide-react";

interface QuickInfoProps {
  slots: string;
  category: string;
  campus: string;
}

export default function QuickInfo({ slots, category, campus }: QuickInfoProps) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-7">
      <h2 className="text-[18px] font-bold text-slate-900 mb-8 tracking-tight">
        Quick Info
      </h2>

      <div className="space-y-8">
        {/* 1. Team Size */}
        <div className="flex items-center gap-4 group">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4F7F2] border border-slate-100 text-[#5A8D39] transition-all duration-300">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              Team Size
            </span>
            <span className="text-[14px] font-bold text-slate-900 truncate">
              {slots} Filled
            </span>
          </div>
        </div>

        {/* 2. Category */}
        <div className="flex items-center gap-4 group">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4F7F2] border border-slate-100 text-[#5A8D39] transition-all duration-300">
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              Category
            </span>
            <span className="text-[14px] font-bold text-slate-900 truncate capitalize">
              {category}
            </span>
          </div>
        </div>

        {/* 3. Campus */}
        <div className="flex items-start gap-4 group">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4F7F2] border border-slate-100 text-[#5A8D39] transition-all duration-300">
            <School className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              Campus
            </span>
            <span className="text-[14px] font-bold text-slate-900 leading-snug">
              {campus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}