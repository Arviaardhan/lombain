"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Users,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";

export default function DetailTeamHeader({ detail }: any) {
  // Hitung sisa slot
  const slotsLeft = detail.max_members - (detail.users_count || 1);

  // Formatter tanggal agar rapi
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "TBA";
    try {
      const date = new Date(dateInput);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch { return dateInput; }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all">
      {/* Garis aksen tipis (3px saja agar lebih halus) */}
      <div className="absolute top-0 left-0 right-0 h-[7px] bg-gradient-to-r from-[#5A8D39] to-[#A3C98C] opacity-90 mb-3" />

      <div className="px-6 py-6 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-5">

            {/* Top Badges - Skala kecil */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="outline" className="rounded-2xl border-slate-200 bg-white px-4 py-2 text-[10px] font-bold text-slate-700 shadow-none uppercase tracking-wider">
                {detail.category}
              </Badge>

              <Badge className="rounded-2xl border-none bg-orange-50 px-4 py-2 text-[12px] font-bold text-orange-400 shadow-none flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                {slotsLeft} slot tersisa
              </Badge>
            </div>

            <div className="space-y-2.5">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl leading-tight max-w-2xl">
                {detail.title}
              </h1>

              <div className="flex items-center gap-3 pl-1 pt-3">
                <div className="h-6 w-[3px] rounded-full bg-[#5A8D39]/30" />
                <p className="text-sm font-medium italic text-slate-500 md:text-base">
                  "{detail.headline}"
                </p>
              </div>
            </div>

            {/* Meta Info Row - Ikon & Text lebih kecil */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-4 border-t border-slate-50 md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-3">

              {/* 1. Institusi - Full width di mobile */}
              <div className="flex items-center gap-2 text-slate-500 col-span-2 md:col-span-1">
                <MapPin className="h-4 w-4 text-[#134686]" />
                <span className="text-xs font-bold text-[#134686]">{detail.campus}</span>
              </div>

              {/* 2. Deadline - Sebelah kiri di mobile */}
              <div className="flex items-center gap-2 text-amber-600 col-span-1">
                <Calendar className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold">
                  Deadline: {formatDate(detail.deadline)}
                </span>
              </div>

              {/* 3. Member - Sebelah kanan di mobile */}
              <div className="flex items-center gap-2 text-slate-500 col-span-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">
                  {detail.users_count || 1}/{detail.max_members} anggota
                </span>
              </div>

              {/* 4. Posted - Baris baru di mobile */}
              <div className="flex items-center gap-2 text-slate-500 col-span-2 md:col-span-1">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">{detail.posted || "Baru saja"}</span>
              </div>
            </div>
          </div>

          {/* Action Button - Lebih Proporsional */}
          <div className="shrink-0">
            <Button
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white px-5 text-xs font-black text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
              onClick={() => window.open(detail.guidebook_url || "#", "_blank")}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Link Kompetisi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}