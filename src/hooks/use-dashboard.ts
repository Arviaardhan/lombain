"use client";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

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
    const [notifications, setNotifications] = useState<any[]>([]);

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
                setManagedTeams((result.data.managed_teams || []).map((t: any) => ({
                    ...t,
                    members: t.users || [],
                })));

                setJoinedTeams((result.data.joined_teams || []).map((t: any) => ({
                    ...t,
                    members: t.users || [],
                })));

                setRequests((result.data.incoming_requests || []).map((req: any) => ({
                    ...req,
                    initials: req.user_name?.substring(0, 2).toUpperCase() || "??"
                })));

                setInvitations(result.data.invites || []);
                setNotifications(result.data.notifications || []);
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

    // FUNGSI TUNGGAL UNTUK RESPON UNDANGAN
    const handleInviteResponse = async (inviteId: number, action: 'accept' | 'reject'): Promise<boolean> => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(ENDPOINTS.RESPOND_INVITE, {
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

            if (res.ok && result.success) {
                setInvitations((prev) => prev.filter((i) => i.id !== inviteId));
                if (action === 'accept') {
                    fireConfetti();
                    fetchDashboardData();
                }
                return true;
            }
            throw new Error(result.message || "Gagal memproses");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Gagal memproses undangan."
            });
            return false;
        }
    };

    const markAsRead = async () => {
        // Cari notifikasi yang belum dibaca
        const unreadCount = notifications.filter(n => !n.read_at).length;
        if (unreadCount === 0) return;

        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/notifications/mark-as-read`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (res.ok) {
                // Update state lokal agar titik merah langsung hilang tanpa refresh
                setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date() })));
            }
        } catch (error) {
            console.error("Gagal mark as read:", error);
        }
    };

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
                fetchDashboardData();
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Koneksi bermasalah." });
        }
    };

    const handleDecline = async (requestId: number) => {
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
        toast({ title: "Request Declined", description: "Permintaan telah ditolak." });
    };

    const handleRemoveMember = async (teamName: string, memberName: string) => {
        toast({ title: "Member Removed", description: `${memberName} telah dikeluarkan.` });
    };

    return {
        managedTeams,
        joinedTeams,
        requests,
        invitations,
        isLoading,
        expandedTeam,
        notifications,
        markAsRead,
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