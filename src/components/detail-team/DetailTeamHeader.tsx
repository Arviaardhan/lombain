"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Users, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CalendarDays,
  History,
  School
} from "lucide-react";

export default function DetailTeamHeader({ detail, status, onJoin }: any) {
  // Fungsi format tanggal sederhana (ID)
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="rounded-[1.5rem] border border-slate-400 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          {/* Status Badges - Font sedikit diperbesar (text-[10px]) */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white text-slate-500 border-slate-600 border-1 hover:bg-white font-bold px-2.5 py-1 rounded-xl uppercase text-[10px] tracking-wider">
              {detail.category}
            </Badge>
            <Badge className="bg-[#5A8D39] text-white border-none font-bold px-2.5 py-1 rounded-xl text-[10px]">
              <Users className="mr-1.5 h-3.5 w-3.5" /> {detail.slots} MEMBERS
            </Badge>

            {status === "accepted" && (
              <Badge className="bg-[#5A8D39] text-white border-none gap-1 font-bold px-2.5 py-1 rounded-md text-[10px]">
                <CheckCircle2 className="h-3.5 w-3.5" /> JOINED
              </Badge>
            )}
            {status === "pending" && (
              <Badge className="bg-amber-100 hover:bg-amber-300 text-amber-600 border-amber-200 gap-1 font-bold px-2.5 py-1 rounded-xl text-[10px]">
                <Clock className="h-3.5 w-3.5" /> PENDING
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl font-black md:text-2xl text-slate-900 tracking-tight leading-tight">
            {detail.title}
          </h1>

          {/* Meta Info Block - Sekarang ditaruh di bawah nama institusi */}
          <div className="space-y-5 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-slate-500">{detail.campus}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-13 gap-y-3">
              {/* Posted Date */}
              <div className="flex items-center gap-3">
                <History className="h-6 w-6 text-slate-400" />
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-400 uppercase leading-none mb-0.5">Posted</span>
                   <span className="text-[12px] font-bold text-slate-600">{formatDate(detail.created_at || new Date())}</span>
                </div>
              </div>

              {/* Close Registration */}
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-amber-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-amber-600 uppercase leading-none mb-0.5">Close Registration</span>
                  <span className="text-[12px] font-black text-slate-900">{formatDate(detail.deadline)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 shrink-0 md:self-start">
          <Button 
            variant="outline" 
            className="rounded-xl border-slate-400 font-bold text-slate-600 h-11 px-5 text-xs hover:bg-[#5A8D39]/10 transition-all active:scale-95"
            onClick={() => window.open(detail.competitionLink, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" /> Competition Link
          </Button>

          {status === "pending" ? (
            <Button disabled className="h-11 px-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 font-black text-xs opacity-100">
              PENDING
            </Button>
          ) : status === "accepted" ? (
            <Button disabled className="h-11 px-8 rounded-xl bg-green-50 text-[#5A8D39] border border-green-200 font-black text-xs opacity-100">
              JOINED
            </Button>
          ) : (
            <Button 
              onClick={onJoin} 
              className="h-11 px-10 rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-black text-xs shadow-none transition-all active:scale-95"
            >
              JOIN TEAM
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}