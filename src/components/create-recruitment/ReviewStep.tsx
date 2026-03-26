"use client";

import CompetitionCard from "@/components/explore/CompetitionCard";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, Target, Briefcase, Info } from "lucide-react";

export default function ReviewStep(props: any) {
  const { title, category, headline, deadline, description, objectives, roles, campus, leaderRole } = props;

  // LOGIKA INISIAL: Kita ambil huruf pertama dari leaderRole jika nama user tidak ada
  const myInitials = leaderRole 
    ? leaderRole.substring(0, 2).toUpperCase() 
    : "ME";

  const previewPost = {
    id: "preview",
    title: title || "Nama Tim Kamu",
    competition_name: title || "Nama Kompetisi",
    headline: headline || "Tagline tim kamu akan muncul di sini...",
    campus: campus || "Institusi Kamu",
    category: category || "Kategori",
    posted: "Baru saja",
    deadline: deadline,
    lookingFor: roles.map((r: any) => r.role_name),
    skills: roles.flatMap((r: any) => r.skills || []),
    total_members: 1,
    max_members: roles.length + 1,
    is_closing_soon: false,
    leader_initials: myInitials, // Kirim inisial ke kartu
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Eye className="h-4 w-4 text-[#5A8D39]" />
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview Kartu Tim</h3>
        </div>
        
        <div className="w-full">
          {/* Index dan isReview sekarang sudah aman di CompetitionCard */}
          <CompetitionCard post={previewPost} index={0} isReview={true} />
        </div>
      </div>

      {/* Detail Informasi di bawah */}
      <div className="grid gap-8 pt-8 border-t border-slate-100">
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
             <Info className="h-4 w-4 text-slate-400" /> Visi & Deskripsi
          </h3>
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic whitespace-pre-line">
              "{description || "Belum ada deskripsi."}"
            </p>
          </div>
        </div>

        {/* ... (Objektif & Role Detail tetap sama) */}
        {objectives && objectives.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
               <Target className="h-4 w-4 text-[#5A8D39]" /> Objektif Tim
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {objectives.map((obj: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#5A8D39] shrink-0" />
                  <p className="text-xs text-slate-700 font-bold">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
             <Briefcase className="h-4 w-4 text-slate-400" /> Detail Role yang Dibutuhkan
          </h3>
          <div className="space-y-4">
            {roles.map((role: any, idx: number) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 text-sm uppercase">{role.role_name}</h4>
                  <Badge className="bg-[#F4F7F2] text-[#5A8D39] border-none text-[10px] font-black px-3 py-1">Open</Badge>
                </div>
                <div className="pl-4 border-l-2 border-slate-100">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                    Tanggung Jawab: {role.description || "Tidak ada deskripsi tanggung jawab."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}