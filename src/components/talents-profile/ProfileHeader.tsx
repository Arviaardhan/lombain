import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Tambahkan AvatarImage
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Users } from "lucide-react";

export default function ProfileHeader({ user, onContact, onInvite }: { user: any, onContact: () => void, onInvite: () => void }) {

  // LOGIC SAFE: Antisipasi data undefined/null dari API
  const teamsJoined = user.current_projects || [];
  const projects = user.achievements || [];
  const initials = user.name ? user.name.substring(0, 2).toUpperCase() : "??";

  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-5">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-md ring-1 ring-slate-100">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-2xl font-black">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="pt-2">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline"
                className="px-3 h-7 text-[13px] font-semibold border-slate-900 rounded-full text-slate-900 bg-white">
                {user.institution || "Universitas"}
              </Badge>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tight mt-3">
              {user.major || "Jurusan belum diatur"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button
            variant="outline"
            onClick={onContact}
            className="rounded-2xl h-11 px-6 border-slate-200 font-bold text-xs"
          >
            <Mail className="h-4 w-4 mr-2 text-slate-400" /> Contact
          </Button>

          <Button
            onClick={onInvite}
            className="rounded-2xl h-11 px-6 bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold text-xs shadow-lg shadow-green-100"
          >
            <Users className="h-4 w-4 mr-2" /> Invite to Team
          </Button>
        </div>
      </div>

      {/* Quick Stats - Disesuaikan dengan key dari Laravel */}
      <div className="mt-8 grid grid-cols-3 gap-4 rounded-[1.5rem] bg-slate-50/50 p-6 border border-slate-50">
        <div className="text-center space-y-1">
          <p className="text-2xl font-black text-[#5A8D39]">{teamsJoined.length}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Teams Joined</p>
        </div>
        <div className="text-center space-y-1 border-x border-slate-100">
          <p className="text-2xl font-black text-[#5A8D39]">{projects.length}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Projects</p>
        </div>
        <div className="text-center space-y-1">
          {/* Kita hitung yang statusnya 'active' dari current_projects */}
          <p className="text-2xl font-black text-[#5A8D39]">
            {teamsJoined.filter((t: any) => t.status === "active").length}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Teams</p>
        </div>
      </div>
    </div>
  );
}