  "use client";

  import { useEffect, useState } from "react";
  import { useParams, useRouter } from "next/navigation";
  import { ArrowLeft, Users, Trophy, Search, Plus, Loader2, Trash2, AlertTriangle } from "lucide-react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";

  import TeamOverviewCard from "@/components/team-management/TeamOverviewCard";
  import RoleCard from "@/components/team-management/RoleCard";
  import JoinRequestCard from "@/components/team-management/JoinRequestCard";
  import EditRoleDialog from "@/components/team-management/EditRoleDialog";
  import MemberProfileDrawer from "@/components/MemberProfileDrawer";

  import { useTeamManagement } from "@/hooks/use-team-management";
  import RemoveMemberDialog from "@/components/team-management/RemoveMemberDialog";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "@/components/ui/alert-dialog";

  export default function TeamManagementPage() {
    const params = useParams() as { id?: string } | null;
    const id = params?.id;
    const router = useRouter();

    // States untuk Modals & Data
    const [removeData, setRemoveData] = useState<{ member: any; role: any } | null>(null);
    const [roleToDelete, setRoleToDelete] = useState<any>(null); // State baru untuk hapus role
    const [isRemoving, setIsRemoving] = useState(false);
    const [showExitWarning, setShowExitWarning] = useState(false);
    const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
    const [isFinalizing, setIsFinalizing] = useState(false);

    const {
      isLoading,
      teamData,
      roles,
      requests,
      recommendedRoleId,
      isDirty,
      unassignedMembers,
      handleAccept,
      handleFinalize,
      handleReject,
      handleSaveRole,
      handleRemoveMember,
      handleDeleteRole,
      autoAssignRole,
      calculateRecommendation,
      resetRecommendation,
      handleAddRoleApi,
    } = useTeamManagement(id as string);

    const [searchQuery, setSearchQuery] = useState("");
    const [skillFilter, setSkillFilter] = useState<string | null>(null);
    const [draggedMember, setDraggedMember] = useState<string | null>(null);
    const [dragOverRole, setDragOverRole] = useState<string | null>(null);
    const [editRole, setEditRole] = useState<any>(null);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);

    // Mencegah refresh tab jika ada Draft (Unsaved changes)
    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isDirty) {
          e.preventDefault();
          e.returnValue = "";
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    const handleSafeBack = () => {
      if (isDirty) {
        setShowExitWarning(true);
      } else {
        router.back();
      }
    };

    const onConfirmFinalize = async () => {
      setIsFinalizing(true);
      const success = await handleFinalize();
      if (success) {
        setShowFinalizeConfirm(false);
      }
      setIsFinalizing(false);
    };

    const onConfirmDeleteRole = async () => {
      if (roleToDelete) {
        await handleDeleteRole(roleToDelete.id);
        setRoleToDelete(null);
      }
    };

    const filteredWaitingList = (unassignedMembers || []).filter((m: any) => {
      const matchesSearch = m.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    const onDragRequestStart = (reqId: string) => {
      setDraggedMember(reqId);
      calculateRecommendation(reqId);
    };

    const onDragRequestEnd = () => {
      setDragOverRole(null);
      setDraggedMember(null);
      resetRecommendation();
    };

    const triggerAddRoleModal = () => {
      setEditRole(null);
      setIsAddMode(true);
    };

    const confirmRemove = async () => {
      if (!removeData) return;

      setIsRemoving(true);

      // Gunakan teamData.id, bukan removeData.team.id
      const success = await handleRemoveMember(teamData.id, removeData.member.id);

      if (success) {
        // Hapus member dari unassignedMembers supaya UI langsung update
        if (unassignedMembers) {
          const filtered = unassignedMembers.filter(m => m.id !== removeData.member.id);
          // update state lokal (buat temporary copy)
          // misal pakai setter unassignedMembers di hook atau refetch
          // Jika useTeamManagement punya setter, gunakan itu
        }

        setRemoveData(null);
      }

      setIsRemoving(false);
    };

    if (isLoading)
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="animate-spin text-[#5A8D39]" />
        </div>
      );

    const isTeamLocked = teamData?.status === 'locked';

    return (
      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleSafeBack} className="rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
              Team Management
            </p>
            <h1 className="text-xl font-bold text-slate-900">{teamData?.name}</h1>
          </div>
        </div>

        {/* 1. Banner Konfirmasi Anggota */}
        <AnimatePresence>
          {isDirty && !isTeamLocked && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6"
            >
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">

                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
                  <div>
                    <p className="text-xs font-bold text-amber-800 uppercase">
                      Draft Formasi
                    </p>
                    <p className="text-xs text-amber-600">
                      Perubahan belum dikunci. Segera finalize tim.
                    </p>
                  </div>
                </div>

                <Button
                  disabled={isFinalizing}
                  onClick={() => setShowFinalizeConfirm(true)}
                  className="bg-[#5A8D39] hover:bg-[#4a752f] text-white text-xs font-bold rounded-xl h-10 px-6 shadow"
                >
                  {isFinalizing ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Kunci Tim"
                  )}
                </Button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. AlertDialog: Peringatan Keluar */}
        <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
          <AlertDialogContent className="rounded-[2rem] border-none p-10 shadow-2xl sm:max-w-[500px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
                Simpan Perubahan? ⏳
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium leading-relaxed pt-2">
                Ada perubahan formasi yang <span className="text-slate-900 font-bold underline decoration-amber-400">belum dikonfirmasi</span>. Keluar sekarang akan membatalkan draft anggota baru.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button variant="ghost" className="h-12 flex-1 rounded-2xl font-bold text-slate-400 hover:text-red-500" onClick={() => { setShowExitWarning(false); router.back(); }}>
                Keluar Saja
              </Button>
              <Button className="h-12 flex-1 bg-[#5A8D39] rounded-2xl font-bold text-white shadow-lg" onClick={() => setShowExitWarning(false)}>
                Lanjut Edit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 3. AlertDialog: Kunci Formasi */}
        <AlertDialog open={showFinalizeConfirm} onOpenChange={setShowFinalizeConfirm}>
          <AlertDialogContent className="rounded-[2.5rem] border-none p-6 md:p-10 shadow-2xl w-[92%] max-w-[500px]">
            <AlertDialogHeader className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="h-14 w-14 md:h-16 md:w-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4 text-[#5A8D39]">
                <Users className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <AlertDialogTitle className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Kunci Formasi? 🚀
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-slate-500 font-medium leading-relaxed text-sm md:text-[16px] pt-2">
                  Susunan anggota akan menjadi <span className="text-slate-900 font-bold underline">Permanen</span>.
                  <div className="mt-6 p-4 rounded-2xl bg-red-50/50 border border-red-100">
                    <span className="text-red-500 font-black text-lg block mb-2">Konsekuensi:</span>
                    <ul className="text-left space-y-2 text-xs md:text-sm">
                      <li className="flex gap-2"><span>•</span> Anggota resmi tidak bisa dihapus lagi.</li>
                      <li className="flex gap-2"><span>•</span> Sisa pelamar otomatis ditolak.</li>
                    </ul>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
              <AlertDialogCancel asChild>
                <Button variant="ghost" className="h-12 flex-1 rounded-2xl font-bold text-slate-400">Kembali</Button>
              </AlertDialogCancel>
              <Button disabled={isFinalizing} className="h-12 flex-1 bg-[#5A8D39] rounded-2xl font-bold text-white shadow-lg" onClick={onConfirmFinalize}>
                {isFinalizing ? <Loader2 className="animate-spin h-4 w-4" /> : "Ya, Kunci Sekarang"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 4. AlertDialog: Hapus Role (State-based) */}
        <AlertDialog open={!!roleToDelete} onOpenChange={(open) => !open && setRoleToDelete(null)}>
          <AlertDialogContent className="rounded-[2rem] border-none p-8 shadow-2xl max-w-[400px]">
            <AlertDialogHeader className="items-center text-center">
              <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center mb-2 text-red-500">
                <Trash2 className="h-6 w-6" />
              </div>
              <AlertDialogTitle className="text-xl font-black text-slate-900">Hapus Role?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm font-medium">
                Apakah kamu yakin ingin menghapus role <span className="text-slate-900 font-bold">"{roleToDelete?.role_name}"</span>? Anggota di dalamnya akan ikut terlepas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex gap-2">
              <AlertDialogCancel className="rounded-xl flex-1 font-bold">Batal</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirmDeleteRole} className="rounded-xl flex-1 bg-red-500 hover:bg-red-600 font-bold">Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <TeamOverviewCard
          team={{
            name: teamData?.name,
            competition: teamData?.competition_name,
            category: teamData?.category,
            deadline: teamData?.deadline,
            status: teamData?.status
          }}
          totalFilled={roles.reduce((sum, r) => sum + (r.filled || 0), 0)}
          totalMax={teamData?.max_members || 0}
          roles={roles}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          {/* LEFT COLUMN: Role Cards */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Role Management</p>
              {!isTeamLocked && (
                <Button size="sm" variant="outline" className="gap-1.5 rounded-xl font-bold border-slate-300" onClick={triggerAddRoleModal}>
                  <Plus className="h-3.5 w-3.5" /> Add Role
                </Button>
              )}
            </div>

            {roles.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
                <Trophy className="mx-auto h-10 w-10 text-slate-300" />
                <p className="mt-4 text-sm font-bold text-slate-600">Belum ada role di tim ini</p>
                {!isTeamLocked && (
                  <Button size="sm" className="mt-6 bg-[#5A8D39] rounded-xl" onClick={triggerAddRoleModal}>
                    <Plus className="h-3.5 w-3.5" /> Create First Role
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {roles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      isLocked={isTeamLocked}
                      isDragOver={dragOverRole === String(role.id)}
                      isRecommended={recommendedRoleId === role.id}
                      onDragOver={(e: React.DragEvent) => {
                        e.preventDefault();
                        if (!isTeamLocked) setDragOverRole(String(role.id));
                      }}
                      onDragLeave={() => setDragOverRole(null)}
                      onDrop={() => {
                        if (draggedMember && !isTeamLocked) handleAccept(draggedMember, role.id);
                        onDragRequestEnd();
                      }}
                      onEdit={() => setEditRole(role)}
                      onDelete={() => setRoleToDelete(role)}
                      onRemoveMember={(memberId: any) => {
                        const member = role.members.find((m: any) => m.id === memberId);
                        setRemoveData({ member, role });
                      }}
                      onViewMember={(m: any) => {
                        setSelectedMember(m);
                        setDrawerOpen(true);
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Join Requests */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Waiting List</p>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search applicants..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-xl border-slate-300" />
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {unassignedMembers.map((member) => (
                  <JoinRequestCard
                    key={member.id}
                    request={{
                      id: member.id,
                      name: member.name,
                      initials: member.name.substring(0, 2).toUpperCase(),
                      appliedRole: "Unassigned",
                      skills: member.skills || []
                    }}
                    onAccept={() => autoAssignRole(member.id)}
                    onReject={() => handleRemoveMember(teamData, member.id)}
                  />
                ))}
              </AnimatePresence>

              {filteredWaitingList.length === 0 && !isTeamLocked && (
                <p className="text-center py-10 text-xs text-slate-400 italic">
                  Tidak ada anggota di waiting list.
                </p>
              )}

              {isTeamLocked && (
                <div className="rounded-2xl border bg-slate-50 p-6 text-center border-dashed">
                  <Users className="h-6 w-6 mx-auto text-slate-300 mb-2" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tim Terkunci</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">Formasi telah final. Tidak dapat menerima pelamar baru.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MODALS */}
        {(isAddMode || editRole) && (
          <EditRoleDialog
            open={isAddMode || !!editRole}
            onOpenChange={(open: boolean) => { if (!open) { setIsAddMode(false); setEditRole(null); } }}
            role={editRole}
            onSave={async (val: any) => {
              let success = val.id ? await handleSaveRole(val) : await handleAddRoleApi(val);
              if (success) { setIsAddMode(false); setEditRole(null); }
            }}
          />
        )}

        <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />

        <RemoveMemberDialog
          open={!!removeData}
          onOpenChange={(open) => !open && setRemoveData(null)}
          onConfirm={confirmRemove}
          memberName={removeData?.member?.name || ""}
          roleName={removeData?.role?.role_name || ""}
          isSubmitting={isRemoving}
        />
      </div>
    );
  }