"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Users, Trophy, Clock } from "lucide-react";
import confetti from "canvas-confetti";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import { initialRequests, initialTeams, notifications } from "@/data/dashboard";
import { JoinRequest, Team } from "@/types/dashboard";

import StatCards from "@/components/dashboard/StatCards";
import RequestItem from "@/components/dashboard/RequestItem";
import TeamAccordion from "@/components/dashboard/TeamAccordion";
import NotificationItem from "@/components/dashboard/NotificationItem";
import RemoveMemberDialog from "@/components/dashboard/RemoveMemberDialog";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";

import { ENDPOINTS } from "@/lib/api-constant";
import Cookies from "js-cookie";

export default function Dashboard() {
  const { toast } = useToast();

  const [teams, setTeams] = useState<Team[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [removeMember, setRemoveMember] = useState<{
    teamName: string;
    memberName: string;
  } | null>(null);

  const statData = useMemo(() => [
    { icon: Users, label: "Active Teams", value: String(teams.length), color: "text-primary" },
    { icon: Bell, label: "Pending Requests", value: String(requests.length), color: "text-secondary" },
    { icon: Trophy, label: "Competitions", value: "5", color: "text-warning" },
    { icon: Clock, label: "Upcoming", value: "2", color: "text-blue-500" },
  ], [teams.length, requests.length]);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#5A8D39", "#ABC123", "#FFFFFF"],
    });
  };

  const handleApprove = async (req: any) => {
    try {
      const token = Cookies.get("token");

      // Pastikan req.request_id dan req.role_id ada di objek req
      const response = await fetch(`${ENDPOINTS.ASSIGN_ROLE}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id: req.id, // Sesuai mapping kamu: id di front-end adalah request_id di API
          role_id: req.role_id, // Pastikan role_id ini masuk saat mapping useEffect tadi
        }),
      });

      const result = await response.json();

      if (result.success) {
        // 1. Hapus dari daftar pending requests
        setRequests((prev) => prev.filter((r) => r.id !== req.id));

        // 2. Efek Selebrasi!
        fireConfetti();

        // 3. Notifikasi Berhasil
        toast({
          title: "🎉 Berhasil!",
          description: `${req.name} sekarang resmi menjadi bagian dari tim ${req.team}.`,
        });

        // 4. (Opsional) Refresh data teams agar jumlah member bertambah
        // fetchDashboardData(); 
      } else {
        toast({
          variant: "destructive",
          title: "Gagal Approve",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error approving member:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan koneksi.",
      });
    }
  };

  const handleDecline = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Request Declined", description: "The applicant has been notified." });
  };

  const handleRemoveMember = () => {
    if (!removeMember) return;
    setTeams((prev) =>
      prev.map((t) =>
        t.name === removeMember.teamName
          ? {
            ...t,
            filled: t.filled - 1,
            status: "Recruiting",
            members: t.members.filter((m) => m.name !== removeMember.memberName),
          }
          : t
      )
    );
    toast({ title: "Member Removed", description: `${removeMember.memberName} has been removed.` });
    setRemoveMember(null);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("token");
        const res = await fetch(ENDPOINTS.USER_DASHBOARD, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        console.log("Data dari API:", result.data.incoming_requests);

        if (result.success) {
          // 1. Set Managed Teams
          const managedTeams = result.data.managed_teams || [];
          const formattedTeams = managedTeams.map((t: any) => ({
            ...t,
            total: t.max_members,
            filled: t.member_count,
            members: t.members || []
          }));
          setTeams(formattedTeams);

          const incomingRequests = result.data.incoming_requests || [];

          const formattedRequests = incomingRequests.map((req: any) => ({
            id: req.id, 
            team_id: req.team_id,
            user_id: req.user_id,
            role_id: req.role_id,
            name: req.user_name,
            initials: req.user_name ? req.user_name.substring(0, 2).toUpperCase() : "??",
            team: req.team_name,
            role: req.role_name || "Member",
            message: req.note || "No message provided",
            skills: [],
            time: "New",
            status: req.status
          }));

          setRequests(formattedRequests);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-accent/10">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="mt-2 text-slate-700 font-medium opacity-80">
            Manage your teams, requests, and stay updated with competition alerts.
          </p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <StatCards stats={statData} />

          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="bg-muted rounded-xl p-1.5 h-auto">
              <TabsTrigger value="requests" className="gap-2 rounded-xl">
                <Users className="h-4 w-4" /> Join Requests
                <AnimatePresence>
                  {requests.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs"
                    >
                      {requests.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </TabsTrigger>

              <TabsTrigger value="notifications" className="gap-2 rounded-xl">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
              <AnimatePresence mode="popLayout">
                {requests.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-border bg-card p-12 text-center"
                  >
                    <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 font-medium">No pending requests</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You're all caught up! New requests will appear here.
                    </p>
                  </motion.div>
                ) : (
                  requests.map((req) => (
                    <RequestItem
                      key={req.id}
                      req={req}
                      onApprove={handleApprove}
                      onDecline={handleDecline}
                      onViewProfile={(r: any) => { setSelectedMember(r); setDrawerOpen(true); }}
                    />
                  ))
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-3">
              {notifications.map((notif) => (
                <NotificationItem key={notif.id} notif={notif} />
              ))}
            </TabsContent>
          </Tabs>

          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-[#5A8D39]" /> My Managed Teams
            </h2>
            <div className="grid gap-4">
              {teams.map((team) => (
                <TeamAccordion
                  key={team.id}
                  team={team}
                  isExpanded={expandedTeam === team.name}
                  onToggle={() => setExpandedTeam(expandedTeam === team.name ? null : team.name)}
                  onRemoveTrigger={(tName: string, mName: string) => setRemoveMember({ teamName: tName, memberName: mName })}
                />
              ))}
            </div>
          </section>
        </motion.div>
      </div>

      <RemoveMemberDialog
        data={removeMember}
        onConfirm={handleRemoveMember}
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