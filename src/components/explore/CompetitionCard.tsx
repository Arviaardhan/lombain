"use client";

import { Users, MapPin, CheckCircle2, Calendar, AlertTriangle, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface CompetitionCardProps {
  post: any;
  index?: number;
  isReview?: boolean;
}

export default function CompetitionCard({ post, isReview = false }: CompetitionCardProps) {
  if (!post) return null;

  const roles = post.lookingFor || [];
  const skills = post.skills || [];
  const isClosingSoon = post.is_closing_soon || false;

  // Formatter tanggal agar tidak "Invalid Date"
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "TBA";
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return "TBA";

      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch { return "TBA"; }
  };

  const getInitials = (user: any) => {
    if (!user) return "";
    return `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();
  };

  const allAvatars = [
    post.leader,
    ...(post.members || [])
  ].filter(Boolean).slice(0, 4);

  return (
    <Card className="group relative block border border-slate-200 bg-white overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 w-full">
      <Link href={`/explore/${post.id}`}>
        <div className={`absolute top-0 left-0 right-0 h-[4px] ${isClosingSoon ? 'bg-red-500' : 'bg-[#F59E0B]'}`} />

        <CardContent className={`p-6 md:p-8 flex ${isReview ? "flex-col md:flex-row gap-8" : "flex-col gap-5"}`}>
          <div className="flex-1 flex flex-col min-w-0">

            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-[#5A8D39] transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className={`shrink-0 ${isClosingSoon ? 'bg-red-50 text-red-500 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'} px-3 py-1.5 rounded-xl text-[10px] font-black border uppercase flex items-center gap-1.5`}>
                {isClosingSoon && <AlertTriangle className="h-3.5 w-3.5" />}
                {isClosingSoon ? "Segera Tutup" : `${post.max_members - post.total_members} slot tersisa`}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white text-slate-500 rounded-full text-[10px] font-bold border border-slate-200 uppercase">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> {post.campus}
              </div>
              <div className="px-3 py-1 bg-white text-slate-700 rounded-full text-[10px] font-bold border border-slate-200 uppercase">
                {post.category}
              </div>
            </div>

            <p className="text-[13px] md:text-[14px] text-slate-500 font-medium leading-relaxed mb-6">
              {post.headline}
            </p>

            <div className="bg-slate-50/80 rounded-2xl p-5 flex flex-col gap-4 mb-6">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Looking for:</p>
              <div className="flex flex-wrap gap-3 items-center">
                {roles.map((role: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 rounded-lg bg-[#E8F3E1] px-3 py-1.5 text-[10px] font-bold text-[#5A8D39] border border-[#D5E9C9]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5A8D39]" /> {role}
                  </div>
                ))}
                {skills.map((skill: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5 rounded-lg bg-[#DDE4FF] px-3 py-1.5 text-[10px] font-bold text-[#6366F1] border border-[#C7D2FE]">
                    <CheckCircle2 className="h-3 w-3" /> {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex items-center gap-6 pt-4 border-t border-slate-50">
              <div className="flex -space-x-3">
                {allAvatars.map((person, idx) => (
                  <div
                    key={idx}
                    className="h-9 w-9 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center overflow-hidden"
                    style={{ zIndex: 10 - idx }}
                  >
                    <div className="h-full w-full bg-[#5A8D39]/10 flex items-center justify-center text-[9px] font-black text-[#5A8D39]">
                      {getInitials(person) || <User className="h-3 w-3" />}
                    </div>
                  </div>
                ))}

                {/* Jika anggota lebih dari 4, tampilkan "+N" */}
                {post.total_members > 4 && (
                  <div className="h-9 w-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-500 z-0">
                    +{post.total_members - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <Users className="h-4 w-4" />
                <span>{post.total_members}/{post.max_members}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-black text-amber-600 bg-amber-50/50 px-2.5 py-1 rounded-md">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.deadline)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}