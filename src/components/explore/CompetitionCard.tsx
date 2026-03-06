"use client";

import Link from "next/link";
import { Users, Clock, MapPin, AlertTriangle, Eye, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Competition } from "@/types/competition";

export default function CompetitionCard({ post, index }: { post: Competition; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <Link
        href={`/explore/${post.id}`}
        className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
      >
        {/* Top: Badges and Time */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="gap-1 px-2 py-1 text-xs font-medium">
              <MapPin className="h-3 w-3" /> {post.campus}
            </Badge>
            <Badge variant="outline" className="px-2 py-1 text-xs font-medium">{post.category}</Badge>
            {post.daysLeft <= 7 && (
              <Badge className="gap-1 border-0 bg-warning/15 text-warning text-xs font-semibold px-2 py-1">
                <AlertTriangle className="h-3 w-3" /> Closing Soon
              </Badge>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {post.posted}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="mt-4 text-xl font-bold group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.desc}
        </p>

        {/* Looking For Section (Roles & Skills) */}
        <div className="mt-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Looking for:</p>
          
          {/* Baris 1: Roles (Accent/Green Badges) */}
          <div className="flex flex-wrap gap-1.5">
            {post.lookingFor.map((role) => (
              <span key={role} className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                {role}
              </span>
            ))}
          </div>

          {/* Baris 2: Specific Skills (Muted Badges) */}
          <div className="flex flex-wrap gap-1.5">
            {post.skills.map((skill) => (
              <span key={skill} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Stats */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-5 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-2">
              <Users className="h-4.5 w-4.5" /> {post.slots} members
            </span>
            <span className="flex items-center gap-2">
              <Eye className="h-4.5 w-4.5" /> {post.applicants} interested
            </span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>
    </motion.div>
  );
}