"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, AlertCircle, Crown } from "lucide-react";

export default function RolesStep({
    // Tambahkan props leaderRole di sini
    leaderRole, setLeaderRole,
    roles, removeRole, removeSkill, editingRoleIndex,
    setEditingRoleIndex, newSkill, setNewSkill, addSkillToRole,
    newRole, setNewRole, addRole
}: any) {
    return (
        <div className="space-y-8">
            {/* --- SECTION 1: LEADER'S ROLE (Ketik Sendiri) --- */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-[#5A8D39]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Your Role (Leader)</h3>
                </div>
                <div className="rounded-[1.5rem] border-2 border-[#5A8D39] bg-white p-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase mb-3 tracking-tight">
                        What is your specific responsibility in this team?
                    </p>
                    <Input
                        placeholder="e.g. Fullstack Developer / Project Manager"
                        value={leaderRole}
                        onChange={(e) => setLeaderRole(e.target.value)}
                        className="rounded-xl border-slate-200 text-slate-900 font-bold placeholder:text-slate-300 focus-visible:ring-[#5A8D39]"
                    />
                    {!leaderRole && (
                        <p className="mt-2 text-[10px] text-amber-600 font-bold flex items-center gap-1 italic">
                            <AlertCircle className="h-3 w-3" /> This field is required for the team to be valid.
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* --- SECTION 2: OPEN ROLES (Untuk Member Lain) --- */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-slate-400" />
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Open Positions</h3>
                </div>

                <div className="space-y-4">
                    {roles.map((role: any, i: number) => (
                        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-slate-900">{role.role}</h4>
                                <button onClick={() => removeRole(i)} className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {role.skills.map((skill: string, si: number) => (
                                    <Badge key={si} variant="secondary" className="rounded-xl px-3 py-1 gap-1 items-center">
                                        {skill}
                                        <button onClick={() => removeSkill(i, si)} className="cursor-pointer hover:text-red-500">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>

                            {editingRoleIndex === i ? (
                                <div className="flex gap-2 mt-3 animate-in fade-in slide-in-from-top-1">
                                    <Input
                                        placeholder="Add required skill..."
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addSkillToRole(i)}
                                        className="rounded-xl border-slate-200 text-slate-900 text-sm"
                                    />
                                    <Button
                                        onClick={() => addSkillToRole(i)}
                                        className="rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white px-4 font-bold"
                                    >
                                        Add
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setEditingRoleIndex(i)}
                                    className="mt-2 text-xs font-bold text-[#5A8D39] hover:underline flex items-center gap-1"
                                >
                                    <Plus className="h-3 w-3" /> Add skills
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {roles.length === 0 && (
                    <div className="flex items-center gap-3 text-sm text-amber-600 bg-amber-50 p-4 rounded-2xl border border-amber-100 font-medium italic">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>Add roles you need from other students (e.g. Designer).</p>
                    </div>
                )}

                {/* Input untuk tambah role baru */}
                <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Input
                        placeholder="Role Name (e.g. Backend Dev)"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addRole()}
                        className="border-none bg-transparent focus-visible:ring-0 text-slate-900 font-bold"
                    />
                    <Button variant="ghost" onClick={addRole} className="rounded-xl text-[#5A8D39] font-black hover:bg-white">
                        <Plus className="h-4 w-4 mr-1" /> Add Role
                    </Button>
                </div>
            </div>
        </div>
    );
}