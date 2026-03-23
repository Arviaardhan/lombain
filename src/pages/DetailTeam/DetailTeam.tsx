"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/api-constant";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";

// Komponen Pendukung
import DetailTeamHeader from "@/components/detail-team/DetailTeamHeader";
import DetailTeamStats from "@/components/detail-team/DetailTeamStats";
import ListTalent from "@/components/detail-team/ListTalent";
import QuickInfo from "@/components/detail-team/QuickInfo";
import TeamResources from "@/components/detail-team/TeamResources";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";
import JoinTeamModal from "@/components/JoinTeamModal";

export default function DetailTeamPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { toast } = useToast();

  const [team, setTeam] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string>("idle");

  useEffect(() => {
    const fetchTeamDetail = async () => {
      if (!id) return;
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE_URL}/teams/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        });
        const result = await res.json();

        if (result.success) {
          const raw = result.data;
          
          const formattedTeam = {
            ...raw,
            title: raw.name || "Untitled Team",
            campus: raw.leader?.institution || "General Institution",
            // Mapping All Members agar sesuai dengan Interface MemberProfile di Drawer kamu
            allMembers: [
              ...(raw.leader ? [{
                id: raw.leader.id,
                name: raw.leader.name,
                initials: raw.leader.name?.substring(0, 2).toUpperCase(),
                role: "Team Leader",
                major: raw.leader.major || "Informatics Engineering",
                skills: raw.leader.skills?.map((s: any) => s.skill_name) || [],
                portfolio: raw.leader.portfolio_url || null,
                isLeader: true,
                avatar: raw.leader.avatar
              }] : []),
              ...(raw.users || [])
                .filter((u: any) => u.pivot?.status === "accepted" && u.id !== raw.leader_id)
                .map((u: any) => ({
                  id: u.id,
                  name: u.name,
                  initials: u.name?.substring(0, 2).toUpperCase(),
                  role: u.pivot?.role_name || "Member",
                  major: u.major || "Student",
                  skills: u.skills?.map((s: any) => s.skill_name) || [],
                  portfolio: u.portfolio_url || null,
                  isLeader: false,
                  avatar: u.avatar
                }))
            ],
            openRoles: (raw.roles || []).map((r: any) => ({
              id: r.id,
              role: r.role_name,
              skills: (r.skills || []).map((s: any) => s.skill_name),
              max_slot: r.max_slot
            })),
            slots: `${raw.users?.filter((u: any) => u.pivot?.status === 'accepted').length || 0}/${raw.max_members || 0}`,
          };

          setTeam(formattedTeam);
          setApplicationStatus(result.my_status || "idle");
        }
      } catch (error) {
        toast({ title: "Error", description: "Gagal memuat detail.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamDetail();
  }, [id, toast]);

  const handleJoinSubmit = async (message: string, roleId: number) => {
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/teams/${id}/join`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ role_id: roleId, note: message }),
      });
      const result = await res.json();
      if (result.success) {
        setApplicationStatus("pending");
        toast({ title: "Sent! 🚀", description: "Lamaran terkirim." });
      } else {
        toast({ variant: "destructive", title: "Gagal", description: result.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Koneksi gagal." });
      throw error;
    }
  };

  if (isLoading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-[#5A8D39]" /></div>;
  if (!team) return <div className="text-center py-20 font-bold text-slate-400 uppercase">Team Not Found</div>;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 min-h-screen">
      <Link href="/explore" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-[#5A8D39] mb-6 tracking-widest transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> BACK TO EXPLORE
      </Link>

      <div className="grid gap-6">
        <DetailTeamHeader 
          detail={team} 
          status={applicationStatus} 
          onJoin={() => setJoinModalOpen(true)} 
        />

        <div className="grid gap-6 md:grid-cols-3 items-start">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-300 bg-white p-6 md:p-8">
              <h2 className="text-[16px] font-bold mb-4 text-slate-900">About Project</h2>
              <p className="text-slate-500 text-[13px] leading-relaxed whitespace-pre-line font-medium italic">
                {team.description || team.headline}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 bg-white p-6 md:p-8">
              <h2 className="text-[16px] font-bold mb-6 text-slate-900">Open Roles</h2>
              <div className="space-y-4">
                {team.openRoles?.length > 0 ? team.openRoles.map((role: any) => (
                  <div key={role.id} className="p-6 rounded-2xl border border-slate-400 bg-white space-y-3">
                    <h3 className="font-bold text-slate-900 text-[15px]">{role.role}</h3>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {role.skills?.map((skill: string, idx: number) => (
                        <Badge 
                          key={`${role.id}-${idx}`} 
                          variant="secondary" 
                          className="border-none text-[10px] font-medium px-3 py-0.5 rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )) : (
                  <p className="text-xs font-bold text-slate-400 italic">No roles currently open.</p>
                )}
              </div>
            </div>
            <DetailTeamStats wins={team.memberWins || {}} achievements={team.achievements || []} />
          </div>

          <aside className="space-y-6 sticky top-24">
            <ListTalent 
              members={team?.allMembers || []} 
              onMemberClick={(m: any) => { 
                setSelectedMember(m); 
                setDrawerOpen(true); 
              }} 
            />
            <QuickInfo slots={team.slots} category={team.category} campus={team.campus} />
            <TeamResources resourceLink={team.guidebook_url} resources={[]} />
          </aside>
        </div>
      </div>

      <MemberProfileDrawer 
        member={selectedMember} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
      
      <JoinTeamModal 
        open={joinModalOpen} 
        onOpenChange={setJoinModalOpen} 
        teamName={team.title} 
        availableRoles={team.openRoles} 
        onSubmit={handleJoinSubmit} 
      />
    </div>
  );
}