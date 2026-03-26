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
    const [recommendedRoleId, setRecommendedRoleId] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const [teamStatus, setTeamStatus] = useState<string | null>(null);
    const [unassignedMembers, setUnassignedMembers] = useState<any[]>([]);

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

            const [resTeam, resStructure] = await Promise.all([
                fetch(ENDPOINTS.TEAM_DETAIL(teamId), {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch(ENDPOINTS.TEAM_STRUCTURE(teamId), {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const resultTeam = await resTeam.json();
            const resultStructure = await resStructure.json();

            if (resultTeam.success && resultStructure.success) {
                setTeamData(resultTeam.data);

                // ✅ FIX STRUCTURE
                setRoles(resultStructure.data.roles || []);
                setUnassignedMembers(resultStructure.data.unassigned || []);

                const isLocked = resultTeam.data.status === "locked";

                // 🔥 FIX: akses roles
                const hasAssignedMember = resultStructure.data.roles.some((role: any) =>
                    role.members?.some((m: any) => m.status === "assigned")
                );

                setIsDirty(!isLocked && hasAssignedMember);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }, [teamId]);

    const handleAccept = async (reqId: string | number, roleId: string | number) => {
        const previousRoles = [...roles];
        const previousUnassigned = [...unassignedMembers];

        // 1. Cari data member di waiting list
        const member = unassignedMembers.find(m => m.id === reqId);
        if (!member) return;

        // --- OPTIMISTIC UPDATE ---
        setUnassignedMembers(prev => prev.filter(m => m.id !== reqId));
        setRoles(prev => prev.map(role => {
            if (role.id === roleId) {
                return {
                    ...role,
                    filled: (role.filled || 0) + 1,
                    members: [...(role.members || []), {
                        id: member.user_id, // Gunakan user_id asli
                        name: member.name,
                        status: 'assigned'
                    }]
                };
            }
            return role;
        }));
        setIsDirty(true);

        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/teams/assign-role`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    request_id: reqId, // ✅ Gunakan ID pivot dari unassigned list
                    role_id: roleId,
                })
            });

            const result = await res.json();
            if (!result.success) throw new Error(result.message);

            await fetchManagementData(); // Refresh untuk sinkronisasi status 'assigned'

        } catch (error: any) {
            setRoles(previousRoles);
            setUnassignedMembers(previousUnassigned);
            toast({ title: "Gagal assign role", description: error.message, variant: "destructive" });
        }
    };

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

    const handleFinalize = async () => {
        try {
            const token = Cookies.get("token");

            const res = await fetch(`${API_BASE_URL}/teams/${teamId}/finalize`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const result = await res.json();

            // ✅ DEBUG DI SINI
            console.log("FINALIZE RESPONSE:", result);
            console.log("USERS:", result.data?.users);

            if (result.success) {
                setTeamStatus(result.data.status);
                fireConfetti();

                toast({
                    title: "Tim Resmi Dikunci! 🔒",
                    description: "Email notifikasi telah dikirim ke semua anggota."
                });

                await Promise.all([
                    fetchManagementData(),
                    fetchRequests()
                ]);

                setIsDirty(false);

                return true;
            }
        } catch (error) {
            console.error("FINALIZE ERROR:", error);

            toast({
                title: "Gagal",
                variant: "destructive"
            });
        }

        return false;
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

    const handleAddRoleApi = async (formData: any) => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/teams/${teamId}/roles`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    role_name: formData.role_name,
                    max_slot: formData.max_slot,
                    skills: formData.skills // Laravel mengharapkan array of string sesuai Controller kamu
                })
            });

            const result = await res.json();
            if (result.success) {
                toast({ title: "Berhasil!", description: "Role baru telah ditambahkan." });
                await fetchManagementData(); // Ambil data terbaru agar RoleCard baru muncul
                return true;
            }
        } catch (error) {
            toast({ title: "Gagal", description: "Terjadi kesalahan saat menambah role.", variant: "destructive" });
            return false;
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

    const assignRole = async (userId: string, roleId: string) => {
        try {
            const token = Cookies.get("token");

            const res = await fetch(`${API_BASE_URL}/teams/assign-role`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    team_id: teamId,
                    user_id: userId,
                    role_id: roleId
                })
            });

            const result = await res.json();

            if (result.success) {
                await fetchManagementData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const autoAssignRole = async (memberId: string) => {
        const member = unassignedMembers.find(m => m.id === memberId);
        if (!member) return;

        let bestRoleId: string | null = null;
        let bestScore = 0;

        roles.forEach(role => {
            let score = 0;

            role.required_skills?.forEach((skill: string) => {
                if (member.skills?.includes(skill)) {
                    score++;
                }
            });

            if (score > bestScore) {
                bestScore = score;
                bestRoleId = role.id;
            }
        });

        if (bestRoleId) {
            await assignRole(memberId, bestRoleId);
        }
    };

    const calculateRecommendation = (memberId: string) => {
        const member = unassignedMembers.find(m => m.id === memberId);
        if (!member) return;

        let bestRoleId: string | null = null;
        let bestScore = 0;

        roles.forEach(role => {
            let score = 0;

            role.required_skills?.forEach((skill: string) => {
                if (member.skills?.includes(skill)) {
                    score++;
                }
            });

            if (score > bestScore) {
                bestScore = score;
                bestRoleId = role.id;
            }
        });

        setRecommendedRoleId(bestRoleId);
    };

    const resetRecommendation = useCallback(() => {
        setRecommendedRoleId(null);
    }, []);

    const handleDeleteRole = async (roleId: string | number) => {
        try {
            const token = Cookies.get("token");
            // Gunakan URL yang sesuai dengan api.php
            const res = await fetch(`${API_BASE_URL}/delete-roles/${roleId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const result = await res.json();
            if (result.success) {
                toast({ title: "🗑️ Role Dihapus" });
                // Refresh data tim agar RoleCard hilang dari layar
                await fetchManagementData();
            }
        } catch (error) {
            toast({ title: "Gagal menghapus role", variant: "destructive" });
        }
    };

    const handleRemoveMember = async (tId: string | number, uId: string | number) => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/teams/${tId}/members/${uId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const result = await res.json();
            if (result.success) {
                toast({ title: "Berhasil", description: "Member dikembalikan ke Waiting List." });
                await fetchManagementData(); // Ini akan memindahkan user dari Role Card ke Waiting List
                return true;
            }
        } catch (error) {
            toast({ title: "Gagal", variant: "destructive" });
        }
        return false;
    };

    return {
        isLoading, teamData, roles, requests, recommendedRoleId, isDirty, unassignedMembers,
        handleAccept, handleFinalize, handleReject, handleSaveRole, handleRemoveMember, handleDeleteRole, fetchManagementData, fetchRequests, autoAssignRole, calculateRecommendation, resetRecommendation, handleAddRoleApi
    };
}