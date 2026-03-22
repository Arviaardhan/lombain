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
        const applicant = requests.find(r => r.id === reqId);
        if (!applicant) return;

        console.group(`🚀 Drag & Drop: ${applicant.user.name}`);
        console.log("1. Data Pelamar:", applicant);
        console.log("2. Target Role ID:", roleId);

        // Backup state untuk rollback jika API gagal
        const previousRequests = [...requests];
        const previousRoles = [...roles];

        // --- OPTIMISTIC UPDATE (INSTANT UI) ---
        console.log("3. Menjalankan Optimistic Update (Hapus dari list, masukkan ke role)...");

        setRequests(prev => prev.filter(r => r.id !== reqId));
        setRoles(prev => prev.map(role => {
            if (role.id === roleId) {
                return {
                    ...role,
                    filled: (role.filled || 0) + 1,
                    members: [...(role.members || []), {
                        id: applicant.id,
                        name: applicant.user.name,
                        isOptimistic: true // Tanda bahwa ini sedang diproses
                    }]
                };
            }
            return role;
        }));

        // --- API CALL ---
        try {
            console.log("4. Mengirim request ke database via Laravel API...");
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
                console.log("✅ 5. Database Berhasil Diupdate:", result);
                fireConfetti();
                toast({ title: "🎉 Berhasil!", description: `${applicant.user.name} resmi bergabung.` });

                // Sinkronisasi data asli untuk menghilangkan tanda 'isOptimistic'
                await fetchManagementData();
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            console.error("❌ 5. Database Gagal Diupdate, Melakukan Rollback...");
            console.error("Error Detail:", error.message);

            // ROLLBACK
            setRequests(previousRequests);
            setRoles(previousRoles);
            toast({
                title: "Gagal",
                description: error.message || "Koneksi bermasalah.",
                variant: "destructive"
            });
        }
        console.groupEnd();
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

    const autoAssignRole = async (reqId: string | number) => {
        const applicant = requests.find(r => r.id === reqId);
        if (!applicant) return;

        const applicantSkills = applicant.user.skills.map((s: any) =>
            (typeof s === 'string' ? s : s.name).toLowerCase()
        );

        console.group(`🤖 Auto-Assign: ${applicant.user.name}`);

        // Cari role yang paling cocok berdasarkan jumlah skill yang sama
        let bestMatchRoleId = null;
        let maxMatchCount = -1;

        roles.forEach(role => {
            const roleRequiredSkills = role.skills?.map((s: any) => s.skill_name.toLowerCase()) || [];

            // Hitung berapa banyak skill pelamar yang ada di role ini
            const matchCount = applicantSkills.filter((skill: string) =>
                roleRequiredSkills.includes(skill)
            ).length;

            console.log(`Checking Role [${role.role_name}]: ${matchCount} skills matched`);

            // Pilih role dengan match terbanyak dan belum penuh
            const isFull = (role.filled || 0) >= (role.max_slot || 1);
            if (matchCount > maxMatchCount && !isFull) {
                maxMatchCount = matchCount;
                bestMatchRoleId = role.id;
            }
        });

        console.groupEnd();

        if (bestMatchRoleId) {
            // Panggil handleAccept yang sudah ada dengan role yang ditemukan
            await handleAccept(reqId, bestMatchRoleId);
        } else {
            // Jika tidak ada yang cocok atau semua penuh, ambil role pertama yang masih sisa slot
            const firstAvailableRole = roles.find(r => (r.filled || 0) < (r.max_slot || 1));
            if (firstAvailableRole) {
                await handleAccept(reqId, firstAvailableRole.id);
            } else {
                toast({
                    title: "Gagal Auto-Assign",
                    description: "Semua role sudah penuh!",
                    variant: "destructive"
                });
            }
        }
    };

    const calculateRecommendation = useCallback((reqId: string | number) => {
        const applicant = requests.find(r => r.id === reqId);
        if (!applicant) return;

        // Ambil skill pelamar (pastikan formatnya seragam lowercase)
        const applicantSkills = applicant.user.skills.map((s: any) =>
            (typeof s === 'string' ? s : s.name).toLowerCase()
        );

        let bestMatchRoleId = null;
        let maxMatchCount = -1;

        console.group(`🎯 Menghitung Rekomendasi: ${applicant.user.name}`);

        roles.forEach(role => {
            // Jangan rekomendasikan role yang sudah penuh
            const isFull = (role.filled || 0) >= (role.max_slot || 1);
            if (isFull) return;

            const roleRequiredSkills = role.skills?.map((s: any) => s.skill_name.toLowerCase()) || [];

            // Hitung skor kecocokan skill
            const matchCount = applicantSkills.filter((skill: string) =>
                roleRequiredSkills.includes(skill)
            ).length;

            console.log(`- Role [${role.role_name}]: ${matchCount} skills matched`);

            // Pilih yang skornya tertinggi
            if (matchCount > maxMatchCount && matchCount > 0) { // Minimal ada 1 skill yang cocok
                maxMatchCount = matchCount;
                bestMatchRoleId = role.id;
            }
        });

        console.log(`🏆 Rekomendasi Terbaik: Role ID [${bestMatchRoleId}]`);
        console.groupEnd();

        setRecommendedRoleId(bestMatchRoleId);
    }, [requests, roles]);

    const resetRecommendation = useCallback(() => {
        setRecommendedRoleId(null);
    }, []);

    const handleDeleteRole = async (roleId: string | number) => {
        // UX: Gunakan confirm untuk keamanan
        if (!confirm("Are you sure? Removing this role will unassign all current members.")) return;

        try {
            const token = Cookies.get("token");
            const res = await fetch(`${API_BASE_URL}/delete-roles/${roleId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const result = await res.json();
            if (result.success) {
                toast({ title: "🗑️ Role Deleted", description: "The role has been successfully removed." });
                // Refresh data pendaftar dan data tim
                await Promise.all([fetchManagementData(), fetchRequests()]);
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete role.", variant: "destructive" });
        }
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
        isLoading, teamData, roles, requests, recommendedRoleId,
        handleAccept, handleReject, handleSaveRole, handleRemoveMember, handleDeleteRole, fetchManagementData, fetchRequests, autoAssignRole, calculateRecommendation, resetRecommendation, handleAddRoleApi
    };
}