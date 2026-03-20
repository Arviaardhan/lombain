"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Users, Trophy, Search, Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import TeamOverviewCard from "@/components/team-management/TeamOverviewCard";
import RoleCard from "@/components/team-management/RoleCard";
import JoinRequestCard from "@/components/team-management/JoinRequestCard";
import EditRoleDialog from "@/components/team-management/EditRoleDialog";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";

import { useTeamManagement } from "@/hooks/use-team-management";

export default function TeamManagementPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();

    const {
        isLoading, teamData, roles, requests,
        handleAccept, handleReject, handleSaveRole, handleRemoveMember

    } = useTeamManagement(id);

    const [searchQuery, setSearchQuery] = useState("");
    const [skillFilter, setSkillFilter] = useState<string | null>(null);
    const [draggedRequest, setDraggedRequest] = useState<string | null>(null);
    const [dragOverRole, setDragOverRole] = useState<string | null>(null);
    const [editRole, setEditRole] = useState<any>(null);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // UI Logic (Filter)
    const allSkills = Array.from(new Set(requests.flatMap((r) => r.user?.skills?.map((s: any) => s.name) || [])));
    const filteredRequests = requests.filter((r) => {
        const matchesSearch = r.user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSkill = !skillFilter || r.user?.skills?.some((s: any) => s.name === skillFilter);
        return matchesSearch && matchesSkill && r.status === "pending";
    });

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="container mx-auto max-w-7xl px-4 py-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-4 w-4" /></Button>
                <div>
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Team Management</p>
                    <h1 className="text-xl font-bold">{teamData?.name}</h1>
                </div>
            </div>

            <TeamOverviewCard
                team={{
                    name: teamData?.name,
                    competition: teamData?.competition_name,
                    category: teamData?.category,
                    deadline: teamData?.deadline
                }}
                totalFilled={roles.reduce((sum, r) => sum + (r.filled || 0), 0)}
                totalMax={teamData?.max_members || 0}
                roles={roles}
            />

            <div className="mt-6 grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Role Management</p>
                        <Button size="sm" variant="outline" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Role</Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <AnimatePresence mode="popLayout">
                            {roles.map((role) => (
                                <RoleCard
                                    key={role.id}
                                    role={role}
                                    isDragOver={dragOverRole === String(role.id)}
                                    // Menghilangkan error 'e' has any type
                                    onDragOver={(e: React.DragEvent) => {
                                        e.preventDefault();
                                        setDragOverRole(String(role.id));
                                    }}
                                    onDragLeave={() => setDragOverRole(null)}
                                    onDrop={() => {
                                        if (draggedRequest) {
                                            handleAccept(draggedRequest, role.id);
                                        }
                                        setDragOverRole(null);
                                    }}
                                    onEdit={() => setEditRole(role)}
                                    onViewMember={(m: any) => { setSelectedMember(m); setDrawerOpen(true); }}
                                    onDelete={() => { }}
                                    // Menghilangkan error 'memberId' has any type
                                    onRemoveMember={(memberId: string | number) => handleRemoveMember(id, memberId)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Join Requests</p>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-xl" />
                        </div>
                    </div>
                    {/* ... (Request mapping & Filter Chips tetap sama) */}
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {filteredRequests.map((req) => (
                                <motion.div
                                    key={req.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: 50 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                    <JoinRequestCard
                                        key={req.id}
                                        request={{
                                            id: req.id,
                                            name: req.user.name,
                                            initials: req.user.name.substring(0, 2).toUpperCase(),
                                            // Data-data baru agar mirip foto referensi:
                                            appliedRole: req.role?.role_name || "Frontend Developer",
                                            appliedAt: "2 hours ago", // Kamu bisa hitung 'time ago' dari created_at asli
                                            bio: req.note, // Pesan miring pelamar
                                            skills: req.user.skills || ["React", "Next.js", "TypeScript"] // Dummy skills jika API belum kirim
                                        }}
                                        onAccept={() => handleAccept(req.id, req.role_id)}
                                        onReject={() => handleReject(req.id)}
                                        onDragStart={() => setDraggedRequest(req.id)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {editRole && (
                <EditRoleDialog
                    open={!!editRole}
                    onOpenChange={(open) => !open && setEditRole(null)}
                    role={editRole}
                    onSave={async (val) => {
                        const success = await handleSaveRole(val);
                        if (success) setEditRole(null);
                    }}
                />
            )}
            <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />
        </div>
    );
}