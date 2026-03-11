"use client";

import { BookOpen, ExternalLink, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamResources({ resourceLink, resources }: any) {
  return (
    <div className="space-y-5">
      {/* Guidebook CTA - Skala Kecil & Compact */}
      {resourceLink && (
        <div className="rounded-2xl border-2 border-[#5A8D39]/20 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-[#5A8D39]/10 rounded-lg text-[#5A8D39]">
              <BookOpen className="h-4 w-4" />
            </div>
            <h2 className="text-[14px] font-bold text-slate-800">Guidebook</h2>
          </div>
          <p className="text-[13px] text-slate-500 mb-4 font-medium leading-relaxed">
            Akses panduan resmi untuk memahami sistem penilaian tim.
          </p>
          <a href={resourceLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full h-10 gap-2 border-[#5A8D39]/30 text-[#5A8D39] text-[12px] font-bold hover:bg-[#5A8D39] hover:text-white rounded-xl transition-all">
              <ExternalLink className="h-3.5 w-3.5" /> Buka Panduan
            </Button>
          </a>
        </div>
      )}

      {/* Resources List */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="text-[14px] font-bold mb-4 text-slate-800">Resources</h2>
        <div className="space-y-2">
          {resources?.map((res: any) => (
            <a key={res.name} href={res.url} className="flex items-center gap-3 rounded-xl border border-slate-50 p-2.5 hover:bg-slate-50 transition-all group">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 group-hover:bg-[#5A8D39]/10 group-hover:text-[#5A8D39]">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[11px] truncate text-slate-700">{res.name}</p>
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-tight">{res.type}</p>
              </div>
              <Download className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#5A8D39]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}