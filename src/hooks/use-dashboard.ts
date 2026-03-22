"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ENDPOINTS } from "@/lib/api-constant";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export function useDashboard() {
    const { toast } = useToast();
    const [managedTeams, setManagedTeams] = useState<any[]>([]);
    const [joinedTeams, setJoinedTeams] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
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
                // Format Managed Teams (Pastikan members ikut masuk)
                const formattedManaged = (result.data.managed_teams || []).map((t: any) => ({
                    ...t,
                    // Pastikan properti members selalu ada (sebagai array)
                    members: t.users || [],
                    member_count: t.member_count || 0,
                    max_members: t.max_members || 0
                }));
                setManagedTeams(formattedManaged);

                // Format Joined Teams
                const formattedJoined = (result.data.joined_teams || []).map((t: any) => ({
                    ...t,
                    members: t.users || [],
                    member_count: t.member_count || 0,
                    max_members: t.max_members || 0
                }));
                setJoinedTeams(formattedJoined);

                // Format Requests (sudah benar)
                const formattedRequests = (result.data.incoming_requests || []).map((req: any) => ({
                    ...req,
                    id: req.id,
                    name: req.user_name,
                    team: req.team_name,
                    role: req.role_name || "Member",
                    initials: req.user_name?.substring(0, 2).toUpperCase() || "??"
                }));
                setRequests(formattedRequests);
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

    // PASTIKAN SEMUA FUNCTION DI-RETURN DI SINI
    return {
        managedTeams,
        joinedTeams,
        requests,
        isLoading,
        expandedTeam,
        setExpandedTeam,
        handleApprove,      // <-- Ini yang tadi kurang
        handleDecline,      // <-- Ini juga
        handleRemoveMember,  // <-- Dan ini
        refresh: fetchDashboardData,
        fireConfetti
    };
}