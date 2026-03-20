"use client";

import Link from "next/link";
import { Users, Clock, MapPin, AlertTriangle, Eye, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "../ui/card";

export default function CompetitionCard({ post }: { post: any; index: number }) {
  if (!post) return null;

  // 1. SESUAIKAN DENGAN JSON LARAVEL
  // Di JSON kamu tidak ada 'lookingFor' atau 'skills', jadi kita buat fallback agar tidak error
  const roles = post.required_roles || [];
  const skills = post.required_skills || [];

  // Ambil institusi dari objek leader
  const campusName = post.leader?.institution || "Umum";

  return (
    <Card className="group block rounded-2xl border border-border bg-card p-0 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-default">
      <Link href={`/explore/${post.id}`} className="m-0 p-0">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="gap-1 px-2 py-1 text-xs font-medium">
                {/* 2. PERBAIKAN: Gunakan variabel campusName */}
                <MapPin className="h-3 w-3" /> {campusName}
              </Badge>
              <Badge variant="outline" className="px-2 py-1 text-xs font-medium">
                {/* 3. PERBAIKAN: Gunakan post.category sesuai JSON */}
                {post.category || "General"}
              </Badge>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.posted || "Baru saja"}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold group-hover:text-[#5A8D39] transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-[#5A8D39] font-semibold">
            {post.competition_name}
          </p>
          <p className="mt-4 text-sm text-muted-foreground font-regular">
            {post.short_desc}
          </p>

          <div className="mt-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Looking for:</p>
            <div className="flex flex-wrap gap-1.5">
              {/* Jika Laravel belum kirim roles, kita tampilkan placeholder */}
              {roles.length > 0 ? (
                roles.map((role: string) => (
                  <span key={role} className="rounded-md bg-[#5A8D39]/10 px-2.5 py-1 text-xs font-semibold text-[#5A8D39]">
                    {role}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-400 italic font-medium uppercase tracking-wider">
                  Member / Collaborator
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-5 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {/* 5. PERBAIKAN: Gunakan total_members sesuai JSON */}
                {post.total_members}/{post.max_members} Members
              </span>
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> {post.slots_left} slots left
              </span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-[#5A8D39]" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}