"use client";

import { UserPlus, Clock } from "lucide-react";
import { Button } from "../ui/button";

export default function QuickInfo({ slots, maxMembers, category, campus, onJoin, status, deadline }: any) {
  
  // Logic Sisa Waktu
  const getDaysLeft = (date: string) => {
    if (!date) return 0;
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const isPending = status === "pending";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
      <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
        Aksi
      </h2>
      
      <Button 
        onClick={onJoin}
        disabled={isPending || status === "accepted"}
        className="w-full h-14 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold flex items-center justify-center gap-3 mb-10 shadow-lg shadow-[#5A8D39]/20 transition-all active:scale-95 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
      >
        <UserPlus className="h-5 w-5" /> 
        {isPending ? "Lamaran Terkirim" : "Lamar Bergabung"}
      </Button>

      <div className="space-y-6">
        {/* ROW: ANGGOTA */}
        <div className="flex justify-between items-center text-[14px]">
          <span className="font-bold text-slate-400">Anggota</span>
          <span className="font-black text-slate-900">
            {/* Cek jika slots ada, jika tidak tampilkan 0 */}
            {slots || 0} <span className="text-slate-400 font-bold mx-1">/</span> {maxMembers}
          </span>
        </div>
        
        {/* ROW: KATEGORI */}
        <div className="flex justify-between items-center text-[14px]">
          <span className="font-bold text-slate-400">Kategori</span>
          <span className="font-black text-slate-900">{category}</span>
        </div>

        {/* ROW: KAMPUS */}
        <div className="flex justify-between items-start text-[14px] gap-6">
          <span className="font-bold text-slate-400">Kampus</span>
          <span className="font-black text-slate-900 text-right leading-snug max-w-[180px]">
            {campus}
          </span>
        </div>

        {/* ROW: SISA WAKTU */}
        <div className="flex justify-between items-center text-[14px]">
          <span className="font-bold text-slate-400">Sisa Waktu</span>
          <span className="font-black text-[#F59E0B] flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> 
            {getDaysLeft(deadline)} Hari
          </span>
        </div>
      </div>
    </div>
  );
}