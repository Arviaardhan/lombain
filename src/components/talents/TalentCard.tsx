// components/talents/TalentCard.tsx
import { Talent } from "@/types/talent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  LayoutGrid,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function TalentCard({
  user,
  onInvite,
}: {
  user: Talent;
  onInvite: () => void;
}) {
  const getSkills = () => {
    if (!user.skills) return [];
    if (Array.isArray(user.skills)) return user.skills;
    try {
      return JSON.parse(user.skills as any);
    } catch (e) {
      return [];
    }
  };

  const skills = getSkills();

  return (
    <div className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      {/* Background Decor (Subtle UX touch) */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#5A8D39]/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />

      {/* Header: Avatar, Name & Socials */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex gap-4 min-w-0">
          <Avatar className="h-16 w-16 shrink-0 rounded-full border-4 border-white shadow-md ring-1 ring-slate-100">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] font-black text-xl">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0 pt-1">
            <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#5A8D39] transition-colors truncate">
              {user.name}
            </h3>
            <div className="mt-2 flex">
              <Badge
                variant="outline"
                className="px-3 h-6 text-[10px] font-bold border-slate-900 rounded-full text-slate-900 bg-white"
              >
                {user.institution || "Univ"}
              </Badge>
            </div>
            <p className="text-[13px] font-medium text-slate-500 mt-2 truncate">
              {user.major || "Major"}
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-2 text-slate-300 shrink-0 mt-1">
          {user.github && (
            <a
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-all hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="flex flex-wrap gap-2 mb-6 min-h-[26px]">
        {skills.length > 0 ? (
          skills.slice(0, 3).map((skill: any, idx: number) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-[10px] px-3 py-0.5 rounded-full font-bold"
            >
              {typeof skill === "string" ? skill : skill.name}
            </Badge>
          ))
        ) : (
          <span className="text-[10px] text-slate-300 italic font-medium">
            No skills listed
          </span>
        )}
        {skills.length > 3 && (
          <span className="text-[10px] text-slate-400 font-bold self-center">
            +{skills.length - 3}
          </span>
        )}
      </div>

      {/* Stats Section */}
      <div className="flex items-center gap-5 text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-6 border-t border-slate-50 pt-5 pl-1">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{user.teams_count || 0} Teams</span>
        </div>
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4" />
          <span>{user.projects_count || 0} Projects</span>
        </div>
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Link href={`/talent/${user.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full h-11 rounded-2xl border-slate-200 text-slate-700 font-bold text-xs gap-2 hover:bg-slate-50 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Profile
          </Button>
        </Link>

        <Button
          onClick={(e) => {
            e.preventDefault();
            onInvite();
          }}
          className="w-full h-11 rounded-2xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold text-xs shadow-md shadow-green-100 transition-all active:scale-95"
        >
          Invite to Team
        </Button>
      </div>
    </div>
  );
}
