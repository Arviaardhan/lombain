"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Users, Trophy, Clock, Crown, Shield, Rocket, Check, X } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import StatCards from "@/components/dashboard/StatCards";
import RequestItem from "@/components/dashboard/RequestItem";
import TeamAccordion from "@/components/dashboard/TeamAccordion";
import RemoveMemberDialog from "@/components/dashboard/RemoveMemberDialog";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";

import { useDashboard } from "@/hooks/use-dashboard";

export default function Dashboard() {
  const {
    managedTeams,
    joinedTeams,
    requests, // Orang yang minta gabung ke tim Arvia
    invitations, // Tim orang lain yang mengundang Arvia
    isLoading,
    expandedTeam,
    setExpandedTeam,
    handleApprove,
    handleDecline,
    handleRemoveMember,
    handleAcceptInvite, // Fungsi baru untuk terima undangan
    handleRejectInvite, // Fungsi baru untuk tolak undangan
  } = useDashboard();

  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [removeMember, setRemoveMember] = useState<{
    teamName: string;
    memberName: string;
  } | null>(null);

  // Statistik Dashboard
  const statData = useMemo(() => [
    { 
      icon: Users, 
      label: "Active Teams", 
      value: String(managedTeams.length + joinedTeams.length), 
      color: "text-[#5A8D39]" 
    },
    { 
      icon: Bell, 
      label: "Invites", 
      value: String(invitations.length), 
      color: "text-blue-500" 
    },
    { 
      icon: Clock, 
      label: "Join Requests", 
      value: String(requests.length), 
      color: "text-amber-500" 
    },
    { 
      icon: Trophy, 
      label: "Achievements", 
      value: String(joinedTeams.filter(t => t.status === 'completed').length), 
      color: "text-indigo-500" 
    },
  ], [managedTeams.length, joinedTeams.length, requests.length, invitations.length]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-[#5A8D39]/20 border-t-[#5A8D39] rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <div className="container mx-auto max-w-5xl px-4 py-12">

        {/* Header Section */}
        <header className="mb-10 space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-medium">
            Kelola tim, respon undangan, dan pantau perkembangan kompetisimu.
          </p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <StatCards stats={statData} />

          <div className="grid gap-8 lg:grid-cols-3 mt-10">

            {/* LEFT COLUMN: Manage & Invites */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="invitations" className="w-full">
                <TabsList className="bg-slate-100 p-1 rounded-xl mb-6 flex overflow-x-auto scrollbar-hide">
                  <TabsTrigger value="invitations" className="rounded-lg gap-2 font-bold px-6">
                    <Bell className="h-4 w-4" />
                    Team Invites
                    {invitations.length > 0 && (
                      <Badge className="ml-1 bg-[#5A8D39] text-white border-none h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                        {invitations.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="rounded-lg gap-2 font-bold px-6">
                    <Users className="h-4 w-4" />
                    Join Requests
                    {requests.length > 0 && (
                      <Badge className="ml-1 bg-amber-500 text-white border-none h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                        {requests.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                {/* Tab Content: Team Invites (Undangan untuk Arvia) */}
                <TabsContent value="invitations" className="space-y-4 outline-none">
                  <AnimatePresence mode="popLayout">
                    {invitations.length === 0 ? (
                      <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center">
                        <Rocket className="mx-auto h-12 w-12 text-slate-200" />
                        <p className="mt-4 font-bold text-slate-400">Belum ada undangan kolaborasi</p>
                      </div>
                    ) : (
                      invitations.map((invite) => (
                        <motion.div
                          key={invite.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-[#5A8D39]">
                              <Shield className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-black text-slate-900">{invite.team_name}</p>
                              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                Invited by {invite.leader_name}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex-1 sm:flex-none font-bold text-slate-400 hover:text-red-500 rounded-xl"
                              onClick={() => handleRejectInvite(invite.id)}
                            >
                              <X className="h-4 w-4 mr-1" /> Tolak
                            </Button>
                            <Button 
                              size="sm"
                              className="flex-1 sm:flex-none bg-[#5A8D39] hover:bg-[#4a752f] text-white font-bold px-6 rounded-xl shadow-lg shadow-green-100"
                              onClick={() => handleAcceptInvite(invite.id)}
                            >
                              <Check className="h-4 w-4 mr-1" /> Terima
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </TabsContent>

                {/* Tab Content: Join Requests (Orang minta gabung ke tim Arvia) */}
                <TabsContent value="requests" className="space-y-4 outline-none">
                  <AnimatePresence mode="popLayout">
                    {requests.length === 0 ? (
                      <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center">
                        <Users className="mx-auto h-12 w-12 text-slate-200" />
                        <p className="mt-4 font-bold text-slate-400">Tidak ada permintaan bergabung baru</p>
                      </div>
                    ) : (
                      requests.map((req) => (
                        <RequestItem
                          key={req.id}
                          req={req}
                          onApprove={() => handleApprove(req)}
                          onDecline={() => handleDecline(req.id)}
                          onViewProfile={(r: any) => { setSelectedMember(r); setDrawerOpen(true); }}
                        />
                      ))
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>

              {/* SECTION: MANAGED TEAMS */}
              <section className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg"><Crown className="h-5 w-5 text-amber-600" /></div>
                    My Managed Teams
                  </h2>
                  <Badge variant="outline" className="rounded-full border-slate-200 text-slate-400 font-bold">
                    {managedTeams.length} Teams
                  </Badge>
                </div>
                <div className="grid gap-4">
                  {managedTeams.map((team) => (
                    <TeamAccordion
                      key={team.id}
                      team={team}
                      isOwner={true}
                      isExpanded={expandedTeam === `managed-${team.id}`}
                      onToggle={() => setExpandedTeam(expandedTeam === `managed-${team.id}` ? null : `managed-${team.id}`)}
                      onRemoveTrigger={(tName: string, mName: string) => setRemoveMember({ teamName: tName, memberName: mName })}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION: JOINED TEAMS */}
              <section className="pt-4 pb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><Shield className="h-5 w-5 text-blue-600" /></div>
                    Teams I Joined
                  </h2>
                  <Badge variant="outline" className="rounded-full border-slate-200 text-slate-400 font-bold">
                    {joinedTeams.length} Teams
                  </Badge>
                </div>
                <div className="grid gap-4">
                  {joinedTeams.map((team) => (
                    <TeamAccordion
                      key={team.id}
                      team={team}
                      isOwner={false}
                      isExpanded={expandedTeam === `joined-${team.id}`}
                      onToggle={() => setExpandedTeam(expandedTeam === `joined-${team.id}` ? null : `joined-${team.id}`)}
                    />
                  ))}
                  {joinedTeams.length === 0 && (
                    <div className="p-8 text-center rounded-[2rem] bg-slate-100/50 border border-slate-100 border-dashed">
                      <p className="text-sm font-medium text-slate-400 italic">Kamu belum bergabung di tim manapun.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Info Card */}
            <div className="hidden lg:block space-y-6">
              <div className="rounded-[2rem] bg-[#5A8D39] p-8 text-white shadow-xl shadow-green-100 sticky top-8">
                <h3 className="text-lg font-black mb-2">Ready to Win?</h3>
                <p className="text-sm opacity-90 leading-relaxed mb-6">
                  Cek undangan tim kamu secara berkala agar tidak melewatkan kesempatan kolaborasi hebat!
                </p>
                <div className="bg-white/20 rounded-2xl p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#5A8D39]">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Next Step</p>
                    <p className="text-sm font-bold truncate">Accept your invitations!</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* MODALS & DRAWERS */}
      <RemoveMemberDialog
        data={removeMember}
        onConfirm={() => {
          if (removeMember) {
            handleRemoveMember(removeMember.teamName, removeMember.memberName);
          }
        }}
        onClose={() => setRemoveMember(null)}
      />

      <MemberProfileDrawer
        member={selectedMember}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}