"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, CheckCircle2, Clock, MapPin, Calendar, UserPlus, Loader2 } from "lucide-react";

export default function DetailTeamHeader({ detail, status, onJoin }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="font-medium text-slate-500">{detail.category}</Badge>
            <Badge className="bg-accent text-accent-foreground border-0 font-semibold">
              <Users className="mr-1.5 h-3 w-3" /> {detail.slots} members
            </Badge>
            {status === "joined" && (
              <Badge className="bg-primary text-primary-foreground border-0 gap-1 font-semibold">
                <CheckCircle2 className="h-3 w-3" /> Joined
              </Badge>
            )}
            {status === "pending" && (
              <Badge variant="secondary" className="gap-1 text-muted-foreground font-semibold">
                <Clock className="h-3 w-3" /> Pending
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold md:text-3xl text-slate-900">{detail.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{detail.campus}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Deadline: {detail.deadline}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />Posted {detail.posted}</span>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" className="gap-2 rounded-xl border-slate-200" onClick={() => window.open(detail.competitionLink, "_blank")}>
            <ExternalLink className="h-4 w-4" /> Competition Link
          </Button>
          {status === "idle" && (
            <Button size="sm" className="gap-2 rounded-xl shadow-lg shadow-primary/20" onClick={onJoin}>
              <UserPlus className="h-4 w-4" /> Join Team
            </Button>
          )}
          {status === "pending" && (
            <Button size="sm" disabled className="gap-2 rounded-xl">
              <Loader2 className="h-4 w-4 animate-spin" /> Pending Approval
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}