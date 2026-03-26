"use client";

import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";

export default function TeamResources({ resourceLink }: { resourceLink: string }) {
  if (!resourceLink) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
        Sumber Daya
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#5A8D39]/30 transition-all">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#5A8D39] shadow-sm">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-slate-900 truncate">Guidebook Kompetisi</p>
            <p className="text-[11px] text-slate-500 font-medium">Dokumen PDF / Website Resmi</p>
          </div>
        </div>

        <Button 
          variant="outline"
          className="w-full h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center gap-2 transition-all"
          onClick={() => window.open(resourceLink, "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
          Buka Pedoman
        </Button>
      </div>
    </div>
  );
}