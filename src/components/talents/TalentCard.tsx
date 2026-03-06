"use client";

import { Github, Linkedin, Users, FolderKanban, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Talent } from "@/types/talent";

interface TalentCardProps {
  user: Talent;
  onInvite: () => void;
}

export default function TalentCard({ user, onInvite }: TalentCardProps) {
  return (
    <Card 
      className="border-none bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
    >
      <CardContent className="p-5">
        {/* Header Section */}
        <div className="flex items-start gap-3">
          <Avatar className="h-11 w-11 ring-2 ring-slate-50">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-foreground text-sm truncate">
                {user.name}
              </h3>
              <div className="flex gap-1.5 shrink-0 ml-2">
                {user.github && (
                  <a 
                    href={user.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {user.linkedin && (
                  <a 
                    href={user.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            
            <Badge 
              variant="secondary" 
              className="mt-1 px-2 py-0.5 text-[10px] font-medium rounded-4xl border-none"
            >
              {user.institution}
            </Badge>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">{user.major}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {user.skills.map(s => (
            <Badge 
              key={s} 
              variant="outline" 
              className="text-[10px] px-2 py-0 font-semibold border-slate-200 text-slate-600"
            >
              {s}
            </Badge>
          ))}
        </div>

        {/* Stats Section - Warna Netral */}
        <div className="mt-4 ml-1 flex gap-4 text-[11px] text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 opacity-70" />
            {user.teamsJoined} Teams
          </span>
          <span className="flex items-center gap-1">
            <FolderKanban className="h-3.5 w-3.5 opacity-70" />
            {user.projectsCompleted} Projects
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-[11px] h-9 rounded-xl border-slate-200 hover:bg-slate-50 transition-colors" 
            asChild
          >
            <Link href={`/profile/${user.id}`}>
              <ExternalLink className="h-3 w-3 mr-1.5 opacity-70" /> View Profile
            </Link>
          </Button>
          <Button 
            size="sm" 
            className="flex-1 text-[11px] h-9 rounded-xl font-bold bg-[#5A8D39] hover:bg-[#4a752f] text-white border-none transition-all shadow-sm" 
            onClick={onInvite}
          >
            Invite to Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}