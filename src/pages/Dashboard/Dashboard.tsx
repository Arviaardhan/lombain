"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Users, Trophy, Clock, Crown, Shield, Rocket } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import StatCards from "@/components/dashboard/StatCards";
import RequestItem from "@/components/dashboard/RequestItem";
import TeamAccordion from "@/components/dashboard/TeamAccordion";
import NotificationItem from "@/components/dashboard/NotificationItem";
import RemoveMemberDialog from "@/components/dashboard/RemoveMemberDialog";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";

import { useDashboard } from "@/hooks/use-dashboard";
import { notifications } from "@/data/dashboard";

export default function Dashboard() {
  const {
    managedTeams,
    joinedTeams,
    requests,
    isLoading,
    expandedTeam,
    setExpandedTeam,
    handleApprove,
    handleDecline,
    handleRemoveMember
  } = useDashboard();

  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [removeMember, setRemoveMember] = useState<{
    teamName: string;
    memberName: string;
  } | null>(null);

  const statData = useMemo(() => [
    { icon: Users, label: "Active Teams", value: String(managedTeams.length + joinedTeams.length), color: "text-[#5A8D39]" },
    { icon: Bell, label: "Pending Requests", value: String(requests.length), color: "text-amber-500" },
    { icon: Trophy, label: "Competitions", value: "5", color: "text-indigo-500" },
    { icon: Rocket, label: "Upcoming", value: "2", color: "text-blue-500" },
  ], [managedTeams.length, joinedTeams.length, requests.length]);

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
            Pantau tim, kelola permintaan bergabung, dan persiapkan kompetisimu.
          </p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Stat Cards Component */}
          <StatCards stats={statData} />

          <div className="grid gap-8 lg:grid-cols-3 mt-10">

            {/* LEFT COLUMN: Requests & Notifications */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="requests" className="w-full">
                <TabsList className="bg-slate-100 p-1 rounded-xl mb-6">
                  <TabsTrigger value="requests" className="rounded-lg gap-2 font-bold px-6">
                    <Users className="h-4 w-4" />
                    Join Requests
                    {requests.length > 0 && (
                      <Badge className="ml-1 bg-[#5A8D39] text-white border-none h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                        {requests.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="rounded-lg gap-2 font-bold px-6">
                    <Bell className="h-4 w-4" /> Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="requests" className="space-y-4 outline-none">
                  <AnimatePresence mode="popLayout">
                    {requests.length === 0 ? (
                      <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center">
                        <Users className="mx-auto h-12 w-12 text-slate-200" />
                        <p className="mt-4 font-bold text-slate-400">Tidak ada permintaan baru</p>
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

                <TabsContent value="notifications" className="space-y-3 outline-none">
                  {notifications.map((notif) => (
                    <NotificationItem key={notif.id} notif={notif} />
                  ))}
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
                    <div className="p-2 bg-[#5A8D39]/10 rounded-lg"><Shield className="h-5 w-5 text-[#5A8D39]" /></div>
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
                    <div className="p-8 text-center rounded-[2rem] bg-slate-100/50 border border-slate-100">
                      <p className="text-sm font-medium text-slate-400">Kamu belum bergabung di tim manapun.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Quick Stats or Calendar (Coming Soon) */}
            <div className="hidden lg:block space-y-6">
              <div className="rounded-[2rem] bg-[#5A8D39] p-8 text-white shadow-xl shadow-green-100">
                <h3 className="text-lg font-black mb-2">Ready to Win?</h3>
                <p className="text-sm opacity-90 leading-relaxed mb-6">
                  Pastikan anggota timmu lengkap sebelum pendaftaran kompetisi ditutup!
                </p>
                <div className="bg-white/20 rounded-2xl p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#5A8D39]">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Next Event</p>
                    <p className="text-sm font-bold truncate">Imagine Cup 2026</p>
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
            // Panggil fungsi dengan data dari state
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