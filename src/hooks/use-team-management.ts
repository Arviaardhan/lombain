// hooks/use-team-management.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { ENDPOINTS, API_BASE_URL } from "@/lib/api-constant";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export function useTeamManagement(teamId: string) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [teamData, setTeamData] = useState<any>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);

    const fireConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#5A8D39", "#6aa343", "#8bc34a", "#a5d66b"]
        });
    };

    const fetchManagementData = useCallback(async () => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(ENDPOINTS.TEAM_DETAIL(teamId), {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const result = await res.json();

            if (result.success) {
                const team = result.data;
                const rolesWithMembers = team.roles.map((role: any) => ({
                    ...role,
                    members: team.users.filter((user: any) => user.pivot?.role_id === role.id)
                }));
                setTeamData(team);
                setRoles(rolesWithMembers);
            }
        } catch (error) {
            toast({ title: "Error", description: "Gagal memuat data tim.", variant: "destructive" });
        }
    }, [teamId, toast]);

    const fetchRequests = useCallback(async () => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(ENDPOINTS.TEAM_REQUESTS(teamId), {
                headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
            });
            const result = await res.json();

            if (result.success && result.data) {
                const formatted = result.data.map((req: any) => ({
                    id: req.request_id || req.id,
                    user: {
                        name: req.name,
                        major: req.major || "Informatics",
                        skills: req.skills || ["React", "UI Design", "Figma"]
                    },
                    role_id: req.role_id,
                    status: req.status,
                    note: req.note
                }));
                setRequests(formatted);
            }
        } catch (error) {
            setRequests([]);
        }
    }, [teamId]);

    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            await Promise.all([fetchManagementData(), fetchRequests()]);
            setIsLoading(false);
        };
        if (teamId) loadAllData();
    }, [teamId, fetchManagementData, fetchRequests]);

    const handleAccept = async (reqId: string | number, roleId: string | number) => {
        // 1. Cari data pendaftar yang sedang di-drag
        const applicant = requests.find(r => r.id === reqId);
        if (!applicant) return;

        // --- OPTIMISTIC UPDATE (NO DELAY) ---
        // Hapus dari daftar request secara instan
        const previousRequests = [...requests];
        const previousRoles = [...roles];

        setRequests(prev => prev.filter(r => r.id !== reqId));

        // Tambahkan ke dalam role secara instan di UI
        setRoles(prev => prev.map(role => {
            if (role.id === roleId) {
                return {
                    ...role,
                    filled: (role.filled || 0) + 1,
                    members: [...(role.members || []), {
                        id: applicant.id,
                        name: applicant.user.name,
                        initials: applicant.user.initials,
                        // data lainnya sesuai UI RoleCard
                    }]
                };
            }
            return role;
        }));

        // --- API CALL (BACKGROUND) ---
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/teams/assign-role`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ request_id: reqId, role_id: roleId })
            });

            const result = await res.json();

            if (result.success) {
                fireConfetti();
                toast({ title: "Berhasil!", description: "Member telah bergabung." });
                // Refresh data asli dari server untuk sinkronisasi ID database
                fetchManagementData();
            } else {
                throw new Error(result.message);
            }
        } catch (e: any) {
            // ROLLBACK JIKA GAGAL (Kembalikan posisi kartu)
            setRequests(previousRequests);
            setRoles(previousRoles);
            toast({
                title: "Gagal",
                description: e.message || "Gagal memproses request.",
                variant: "destructive"
            });
        }
    };
    const handleReject = async (reqId: string) => {
        setRequests(prev => prev.filter(r => r.id !== reqId)); // No Delay
        try {
            const token = Cookies.get("token");
            await fetch(`${API_BASE_URL}/teams/requests/${reqId}/reject`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            toast({ title: "Ditolak" });
        } catch (e) {
            fetchRequests();
        }
    };

    const handleSaveRole = async (updatedRole: any) => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(ENDPOINTS.UPDATE_ROLE(updatedRole.id), {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _method: "PUT",
                    role_name: updatedRole.role_name,
                    max_slot: updatedRole.max_slot,
                    skills: updatedRole.skills,
                })
            });
            const result = await res.json();
            if (result.success) {
                toast({ title: "Role Updated! ✨" });
                fetchManagementData();
                return true;
            }
        } catch (error) {
            toast({ title: "Error", variant: "destructive" });
        }
        return false;
    };

    const handleRemoveMember = async (tId: string, uId: string | number) => {
        if (!confirm("Keluarkan member ini dari tim?")) return;

        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/teams/${tId}/members/${uId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                toast({ title: "Berhasil", description: "Member telah dikeluarkan." });
                // REFRESH DATA AGAR AHMAD MUNCUL LAGI DI LIST REQUEST
                await Promise.all([fetchManagementData(), fetchRequests()]);
            }
        } catch (error) {
            toast({ title: "Gagal", variant: "destructive" });
        }
    };

    return {
        isLoading, teamData, roles, requests,
        handleAccept, handleReject, handleSaveRole, handleRemoveMember, fetchManagementData, fetchRequests
    };
}