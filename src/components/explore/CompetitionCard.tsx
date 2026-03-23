"use client";

import Link from "next/link";
import { Users, Clock, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function CompetitionCard({ post }: { post: any; index: number }) {
  if (!post) return null;

  const roles = post.lookingFor || [];
  const skills = post.skills || [];
  const isClosingSoon = post.is_closing_soon || false;

  return (
    <Card className="group relative block rounded-xl border border-slate-200 bg-white p-0 hover:shadow-md hover:border-[#5A8D39]/40 transition-all duration-300 overflow-hidden h-full">
      <Link href={`/explore/${post.id}`} className="block h-full">
        <CardContent className="p-5 flex flex-col h-full">
          
          {/* TOP SECTION: Meta Info */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* Badge Institut: White BG, Black Border, Rounded XL */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white text-slate-700 rounded-xl text-[10px] font-bold border border-slate-900 shadow-sm">
                <MapPin className="h-3 w-3 text-slate-900" /> {post.campus}
              </div>
              
              {/* Badge Category: Rounded XL */}
              <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold border border-transparent">
                {post.category || "General"}
              </div>

              {/* Badge Closing: Rounded XL */}
              {isClosingSoon && (
                <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-xl text-[10px] font-black flex items-center gap-1.5 border border-amber-200 uppercase tracking-tight">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Closing Soon
                </div>
              )}
            </div>

            {/* Waktu: Dibuat lebih besar & tracking-wide agar tidak mepet */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">
              <Clock className="h-3.5 w-3.5" /> {post.posted}
            </div>
          </div>

          {/* MAIN SECTION: Titles */}
          <div className="mb-5">
            <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#5A8D39] transition-colors line-clamp-1">
              {post.title}
            </h3>
            <p className="mt-1 text-[12px] text-[#5A8D39] font-bold italic opacity-90">
              {post.competition_name}
            </p>
            <p className="mt-3 text-[13px] text-slate-500 font-medium line-clamp-2 leading-relaxed tracking-wide">
              {post.headline || "Seeking passionate collaborators."}
            </p>
          </div>

          {/* ROLES SECTION */}
          <div className="mb-6 space-y-3">
            {/* Teks Looking For di atas Role */}
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Looking for:</p>
            
            <div className="flex flex-wrap gap-2">
              {roles.slice(0, 3).map((role: string, idx: number) => (
                <span key={idx} className="rounded-lg bg-[#F4F7F2] px-3 py-1 text-[11px] font-bold text-[#5A8D39] border border-[#5A8D39]/10">
                  {role}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.slice(0, 4).map((skill: string, idx: number) => (
                <span key={idx} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 uppercase tracking-tight">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[11px] font-black text-slate-600 uppercase tracking-wider">
                <Users className="h-4 w-4 text-[#5A8D39]" />
                <span>{post.total_members} <span className="text-slate-300 mx-0.5">/</span> {post.max_members} <span className="text-slate-400 font-bold ml-1 italic">Team</span></span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-[11px] font-black text-[#5A8D39] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 uppercase tracking-[0.2em]">
              Detail <ArrowRight className="h-4 w-4" />
            </div>
          </div>

        </CardContent>
      </Link>
    </Card>
  );
}