// components/talents/TalentCard.tsx
import { Talent } from "@/types/talent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, Send } from "lucide-react";

export default function TalentCard({ user, onInvite }: { user: Talent; onInvite: () => void }) {
  const skills = user.skills || [];

  return (
    <div className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <Avatar className="h-16 w-16 rounded-2xl border-2 border-white shadow-md">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold text-xl">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="ghost"
          onClick={onInvite}
          className="rounded-xl hover:bg-[#5A8D39]/10 hover:text-[#5A8D39] transition-colors"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="font-bold text-slate-900 truncate">{user.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <GraduationCap className="h-3.5 w-3.5" />
          <span className="truncate">{user.major}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{user.institution}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 line-clamp-2">
        {/* Tambahkan pengecekan array di sini */}
        {skills.length > 0 ? (
          <>
            {skills.slice(0, 3).map((skill: any, idx: number) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-slate-50 text-slate-600 border-none text-[10px] px-2 py-0.5"
              >
                {/* Cek jika skill berupa string atau object */}
                {typeof skill === 'string' ? skill : skill.name}
              </Badge>
            ))}
            {skills.length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium ml-1">
                +{skills.length - 3} more
              </span>
            )}
          </>
        ) : (
          <span className="text-[10px] text-slate-300 italic">No skills listed</span>
        )}
      </div>

      <Button
        onClick={onInvite}
        className="w-full mt-5 rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold text-xs shadow-lg shadow-green-100"
      >
        Undang ke Tim
      </Button>
    </div>
  );
}