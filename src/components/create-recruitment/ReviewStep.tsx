"use client";

import DetailTeamHeader from "@/components/detail-team/DetailTeamHeader";
import QuickInfo from "@/components/detail-team/QuickInfo";
import ListTalent from "@/components/detail-team/ListTalent";
import TeamResources from "@/components/detail-team/TeamResources";
import DetailTeamStats from "@/components/detail-team/DetailTeamStats";
import { Badge } from "@/components/ui/badge";
import { Eye, Info } from "lucide-react";

export default function ReviewStep(props: any) {
  const { title, category, headline, deadline, description, roles, resourceLink, leaderRole } = props;

  const previewTeam = {
    title: title || "New Amazing Team",
    category: category || "General",
    deadline: deadline || new Date().toISOString(),
    created_at: new Date().toISOString(),
    description: description || "No description provided.",
    slots: `1/${roles.length + 1}`,
    campus: "Your Institution",
    competitionLink: "#",
    guidebook_url: resourceLink,
    allMembers: [
      {
        id: 0,
        name: "You (Leader)",
        role: leaderRole || "Team Leader",
        initials: "ME",
        isLeader: true,
        avatar: null
      }
    ],
    openRoles: roles.map((r: any, i: number) => ({
      id: i,
      role: r.role,
      skills: r.skills,
      max_slot: 1
    }))
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Banner Preview */}
      <div className="bg-[#5A8D39] text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-green-100/50">
        <div className="flex items-center gap-3">
          <Eye className="h-4 w-4" />
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">Live Preview</p>
            <p className="text-[11px] font-medium opacity-90 truncate">This is how your team looks to others.</p>
          </div>
        </div>
      </div>

      {/* --- REPLIKA DETAIL TEAM PAGE --- */}
      {/* Hilangkan scaling berlebihan di mobile, biarkan komponen handle responsivitasnya sendiri */}
      <div className="rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-200 bg-[#F9FBFB] overflow-hidden transition-all">
        <div className="p-3 md:p-8">
          
          {/* Kita hanya pakai scaling sedikit di layar desktop agar tidak terlalu lebar, 
              sedangkan di mobile (hidden scale) kita biarkan full width */}
          <div className="md:scale-[0.9] lg:scale-100 origin-top transition-all duration-500">
            
            <div className="grid gap-4 md:gap-6">
              {/* Header - Komponen ini sudah responsive (flex-col di mobile) */}
              <DetailTeamHeader detail={previewTeam} status="idle" onJoin={() => {}} />

              {/* Grid yang akan jadi 1 kolom di mobile otomatis karena 'md:grid-cols-3' */}
              <div className="grid gap-4 md:gap-6 md:grid-cols-3 items-start">
                
                {/* Main Content */}
                <div className="md:col-span-2 space-y-4 md:space-y-6">
                  {/* About Section */}
                  <div className="rounded-[1.5rem] md:rounded-[2rem] border border-slate-400 bg-white p-5 md:p-8">
                    <h2 className="text-[14px] md:text-[16px] font-bold mb-3 md:mb-4 text-slate-900">About Project</h2>
                    <p className="text-slate-500 text-[12px] md:text-[13px] leading-relaxed whitespace-pre-line font-medium italic">
                      {previewTeam.description}
                    </p>
                  </div>

                  {/* Open Roles */}
                  <div className="rounded-[1.5rem] md:rounded-[2rem] border border-slate-400 bg-white p-5 md:p-8">
                    <h2 className="text-[14px] md:text-[16px] font-bold mb-4 md:mb-6 text-slate-900 font-black">Open Roles</h2>
                    <div className="space-y-3 md:space-y-4">
                      {previewTeam.openRoles.length > 0 ? previewTeam.openRoles.map((role: any) => (
                        <div key={role.id} className="p-4 md:p-6 rounded-2xl border border-slate-400 bg-white space-y-2 md:space-y-3">
                          <h3 className="font-bold text-slate-900 text-[14px] md:text-[16px]">{role.role}</h3>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {role.skills?.map((skill: string, idx: number) => (
                              <Badge 
                                key={idx} 
                                variant="secondary" 
                                className="bg-[#F4F7F2] text-[#5A8D39] border-none text-[9px] md:text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )) : (
                        <p className="text-[11px] font-bold text-slate-400 italic text-center py-4">No open roles added.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Akan pindah ke bawah di mobile */}
                <aside className="space-y-4 md:space-y-6">
                  <ListTalent members={previewTeam.allMembers} onMemberClick={() => {}} />
                  <QuickInfo slots={previewTeam.slots} category={previewTeam.category} campus={previewTeam.campus} />
                  <TeamResources resourceLink={previewTeam.guidebook_url} resources={[]} />
                </aside>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <p className="text-[9px] font-bold italic leading-tight">
          Preview mode: buttons are non-interactive.
        </p>
      </div>
    </div>
  );
}