"use client";

import { Users, Briefcase, MapPin } from "lucide-react";

interface QuickInfoProps {
  slots: string;
  category: string;
  campus: string;
}

export default function QuickInfo({ slots, category, campus }: QuickInfoProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-[14px] font-black text-slate-900 mb-6 uppercase tracking-widest">
        Quick Info
      </h2>

      <div className="space-y-7">
        {/* 1. Team Size - Fokus pada angka */}
        <div className="flex items-center gap-4 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#5A8D39]/10 group-hover:text-[#5A8D39] transition-all duration-300">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
              Team Size
            </span>
            <span className="text-[14px] font-bold text-slate-900">
              {slots} filled
            </span>
          </div>
        </div>

        {/* 2. Category - Fokus pada Badge Context */}
        <div className="flex items-center gap-4 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#5A8D39]/10 group-hover:text-[#5A8D39] transition-all duration-300">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
              Category
            </span>
            <span className="text-[14px] font-bold text-slate-900">
              {category}
            </span>
          </div>
        </div>

        {/* 3. Campus - Fokus pada Kejelasan Lokasi */}
        <div className="flex items-start gap-4 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#5A8D39]/10 group-hover:text-[#5A8D39] transition-all duration-300 mt-0.5">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
              Campus
            </span>
            <span className="text-[14px] font-black text-slate-900 leading-snug">
              {campus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}