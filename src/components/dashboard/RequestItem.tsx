import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function RequestItem({ req, onApprove, onDecline, onViewProfile }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {req.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewProfile(req)}
                className="font-semibold hover:text-primary hover:underline text-left"
              >
                {req.name}
              </button>
              <span className="text-xs text-muted-foreground">· {req.time}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground flex flex-wrap items-center gap-y-2 mt-2">
              Applied for
              <span className="font-semibold text-white bg-[#5A8D39] px-2.5 py-0.5 rounded-full text-[11px] mx-1.5 shadow-sm">
                {req.role}
              </span>
              role in
              <span className="font-semibold text-white bg-[#5A8D39] px-2.5 py-0.5 rounded-full text-[11px] mx-1.5 shadow-sm">
                {req.team}
              </span>
            </p>

            {/* INI AKAN MENAMPILKAN NOTE DARI AHMAD */}
            {req.message && req.message !== "No message provided" && (
              <div className="mt-3 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5A8D39]/30 rounded-full"></div>
                <p className="pl-4 text-sm text-slate-600 italic leading-relaxed">
                  "{req.message}"
                </p>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {(req.skills || []).map((skill: string) => (
                <span key={skill} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="text-destructive rounded-xl hover:bg-destructive/5"
            onClick={() => onDecline(req.id)}
          >
            <X className="h-4 w-4 mr-1" /> Decline
          </Button>

          {/* GANTI TOMBOL APPROVE JADI REVIEW */}
          <Link href={`/create/manage/${req.team_id}`}>
            <Button
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90 text-white"
            >
              <Eye className="h-4 w-4 mr-1" /> Review in Management
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}