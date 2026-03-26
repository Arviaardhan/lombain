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
import { Button } from "@/components/ui/button";

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
            totalAccepted: (raw.users?.filter((u: any) => u.pivot?.status === 'accepted').length || 0) + 1,
            slotsDisplay: `${(raw.users?.filter((u: any) => u.pivot?.status === 'accepted').length || 0) + (raw.leader ? 1 : 0)}/${raw.max_members || 0}`,
            allMembers: [
              ...(raw.leader ? [{
                id: raw.leader.id,
                name: raw.leader.name,
                initials: raw.leader.name?.substring(0, 2).toUpperCase(),
                role: raw.leader_role_name || "Team Leader",
                major: raw.leader.major || "Informatics Engineering",
                skills: raw.leader.skills?.map((s: any) => s.skill_name) || [],
                portfolio: raw.leader.portfolio_url || null,
                isLeader: true,
                avatar: raw.leader.avatar,
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
    <div className="container mx-auto max-w-6xl px-4 py-8 min-h-screen">
      {/* BREADCRUMB / BACK BUTTON */}
      <Link href="/explore" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-[#5A8D39] mb-6 tracking-widest transition-colors uppercase">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Explore
      </Link>

      <div className="grid gap-6">
        {/* HEADER SECTION (Full Width) */}
        <DetailTeamHeader
          detail={team}
          status={applicationStatus}
          onJoin={() => setJoinModalOpen(true)}
        />

        {/* MAIN CONTENT GRID (2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* KOLOM KIRI (Tentang & Objektif) - Col Span 2 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm space-y-10">
              {/* Section: Tentang Kompetisi */}
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-[#5A8D39] uppercase tracking-[0.2em]">
                  Tentang Kompetisi
                </h3>
                <div className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed font-medium">
                  {team.description ? (
                    <p className="whitespace-pre-line">{team.description}</p>
                  ) : (
                    <p className="italic text-slate-400">Tidak ada deskripsi kompetisi.</p>
                  )}
                </div>
              </section>

              {/* Section: Objektif Tim */}
              <section className="space-y-6">
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Objektif Tim
                </h3>
                <div className="space-y-4">
                  {team.objectives && team.objectives.length > 0 ? (
                    team.objectives.map((obj: string, index: number) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#5A8D39] border border-green-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[14px] md:text-[15px] font-bold text-slate-700 leading-tight">
                          {obj}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm font-bold text-slate-300 italic">- Belum ada objektif tim -</p>
                  )}
                </div>
              </section>
            </div>

            {/* OPEN ROLES (Diletakkan di bawah About sesuai foto) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm space-y-8">
              <h3 className="text-[11px] font-black text-[#5A8D39] uppercase tracking-[0.2em]">
                Posisi yang Dibutuhkan
              </h3>

              <div className="space-y-6">
                {team.openRoles?.length > 0 ? team.openRoles.map((role: any) => (
                  <div key={role.id} className="group relative p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#5A8D39]/30 transition-all shadow-sm">

                    {/* Status Badge (Open) */}
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-green-50 text-[#5A8D39] hover:bg-green-100 border-none text-[10px] font-black uppercase px-3 py-1 rounded-lg">
                        Open
                      </Badge>
                    </div>

                    <div className="flex flex-col gap-6">
                      {/* Role Header */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-green-50 group-hover:text-[#5A8D39] transition-colors">
                          {/* Ikon dinamis sederhana, bisa disesuaikan nantinya */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-900 group-hover:text-[#5A8D39] transition-colors">
                            {role.role}
                          </h4>
                          <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-md">
                            {role.description || "Bertanggung jawab atas pengembangan dan kolaborasi dalam tim untuk mencapai target kompetisi."}
                          </p>
                        </div>
                      </div>

                      {/* Skills Row */}
                      <div className="flex flex-wrap gap-2">
                        {role.skills?.map((s: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] font-bold px-3 py-2 border-none items-center">
                            {s}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button Per Role */}
                      <div className="pt-2">
                        <Button
                          onClick={() => setJoinModalOpen(true)}
                          className="h-11 rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold text-xs px-6 flex items-center gap-2 shadow-lg shadow-[#5A8D39]/20 transition-all active:scale-95"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-[-15deg]"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                          Lamar Posisi Ini
                        </Button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                    <p className="text-sm font-bold text-slate-300 italic">Belum ada posisi yang dibuka.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (Sidebar Aksi & Anggota) */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            <QuickInfo
              slots={team.totalAccepted}
              maxMembers={team.max_members}
              category={team.category}
              campus={team.campus}
              onJoin={() => setJoinModalOpen(true)}
              status={applicationStatus}
              deadline={team.deadline}
            />

            <ListTalent
              members={team?.allMembers || []}
              onMemberClick={(m: any) => {
                setSelectedMember(m);
                setDrawerOpen(true);
              }}
            />

            <TeamResources resourceLink={team.guidebook_url} />
          </aside>

        </div>
      </div>

      {/* Modals & Drawers */}
      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />
      <JoinTeamModal open={joinModalOpen} onOpenChange={setJoinModalOpen} teamName={team.title} availableRoles={team.openRoles} onSubmit={handleJoinSubmit} />
    </div>
  );
}