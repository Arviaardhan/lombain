"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL, ENDPOINTS } from "@/lib/api-constant";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export function useDashboard() {
    const { toast } = useToast();
    const [managedTeams, setManagedTeams] = useState<any[]>([]);
    const [joinedTeams, setJoinedTeams] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [invitations, setInvitations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get("token");
            const res = await fetch(ENDPOINTS.USER_DASHBOARD, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });
            const result = await res.json();

            if (result.success) {
                // 1. Format Managed Teams (Tim yang kamu pimpin)
                const formattedManaged = (result.data.managed_teams || []).map((t: any) => ({
                    ...t,
                    members: t.users || [],
                    member_count: t.member_count || 0,
                    max_members: t.max_members || 0
                }));
                setManagedTeams(formattedManaged);

                // 2. Format Joined Teams (Tim tempat kamu bergabung)
                const formattedJoined = (result.data.joined_teams || []).map((t: any) => ({
                    ...t,
                    members: t.users || [],
                    member_count: t.member_count || 0,
                    max_members: t.max_members || 0
                }));
                setJoinedTeams(formattedJoined);

                // 3. Format Incoming Requests (Orang minta gabung ke timmu)
                const formattedRequests = (result.data.incoming_requests || []).map((req: any) => ({
                    ...req,
                    id: req.id,
                    name: req.user_name,
                    team: req.team_name,
                    role: req.role_name || "Member",
                    initials: req.user_name?.substring(0, 2).toUpperCase() || "??"
                }));
                setRequests(formattedRequests);

                // 4. Set Invitations (Tim yang mengundang kamu)
                // Pastikan di Laravel kamu mengirim key 'invites'
                const formattedInvites = (result.data.invites || []).map((inv: any) => ({
                    ...inv,
                    // Tambahkan mapping jika ada field yang berbeda namanya
                    team_name: inv.team_name,
                    leader_name: inv.leader_name
                }));
                setInvitations(formattedInvites);
            }
        } catch (error) {
            console.error("Dashboard error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#5A8D39", "#ABC123"]
        });
    };

    const handleInviteResponse = async (inviteId: number, action: 'accept' | 'reject') => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/teams/respond-invite`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    invite_id: inviteId,
                    action: action
                }),
            });

            const result = await res.json();

            if (result.success) {
                // Hapus dari list undangan di UI
                setInvitations((prev) => prev.filter((i) => i.id !== inviteId));

                if (action === 'accept') {
                    fireConfetti();
                    toast({ title: "Berhasil!", description: "Kamu telah bergabung dengan tim baru." });
                    fetchDashboardData(); // Refresh untuk update "Teams I Joined"
                } else {
                    toast({ title: "Ditolak", description: "Undangan tim telah dihapus." });
                }
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Gagal memproses undangan." });
        }
    };

    // --- LOGIC: APPROVE REQUEST ---
    const handleApprove = async (req: any) => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(`${ENDPOINTS.ASSIGN_ROLE}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    request_id: req.id,
                    role_id: req.role_id,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setRequests((prev) => prev.filter((r) => r.id !== req.id));
                fireConfetti();
                toast({
                    title: "🎉 Berhasil!",
                    description: `${req.name} sekarang resmi menjadi bagian dari tim ${req.team}.`,
                });
                fetchDashboardData(); // Refresh data untuk update jumlah member di list team
            } else {
                toast({ variant: "destructive", title: "Gagal Approve", description: result.message });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Terjadi kesalahan koneksi." });
        }
    };

    // --- LOGIC: DECLINE REQUEST ---
    const handleDecline = async (requestId: number) => {
        // Di sini kamu bisa tambahkan fetch ke API Decline jika sudah ada
        // Untuk sementara kita filter dari state
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
        toast({ title: "Request Declined", description: "Permintaan bergabung telah ditolak." });
    };

    // --- LOGIC: REMOVE MEMBER ---
    const handleRemoveMember = async (teamName: string, memberName: string) => {
        // Implementasi API Remove Member bisa ditaruh di sini
        // Untuk MVP kita update state lokal dulu
        setManagedTeams((prev) =>
            prev.map((t) =>
                t.name === teamName
                    ? {
                        ...t,
                        member_count: t.member_count - 1,
                        members: t.members.filter((m: any) => m.name !== memberName),
                    }
                    : t
            )
        );
        toast({ title: "Member Removed", description: `${memberName} telah dikeluarkan dari tim.` });
    };

    return {
        managedTeams,
        joinedTeams,
        requests,
        invitations,
        isLoading,
        expandedTeam,
        setExpandedTeam,
        handleApprove,
        handleDecline,
        handleRemoveMember,
        handleAcceptInvite: (inviteId: number) => handleInviteResponse(inviteId, 'accept'),
        handleRejectInvite: (inviteId: number) => handleInviteResponse(inviteId, 'reject'),
        refresh: fetchDashboardData,
        fireConfetti
    };
}