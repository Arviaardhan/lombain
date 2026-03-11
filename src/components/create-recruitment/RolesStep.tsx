"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, AlertCircle } from "lucide-react"; // Tambahkan AlertCircle untuk ikon

export default function RolesStep({
    roles, removeRole, removeSkill, editingRoleIndex,
    setEditingRoleIndex, newSkill, setNewSkill, addSkillToRole,
    newRole, setNewRole, addRole
}: any) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {roles.map((role: any, i: number) => (
                    <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-[#5A8D39]">{role.role}</h4>
                            <button onClick={() => removeRole(i)} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {role.skills.map((skill: string, si: number) => (
                                <Badge key={si} variant="secondary" className="rounded-xl px-3 py-1 gap-1 border-slate-200">
                                    {skill}
                                    <button onClick={() => removeSkill(i, si)} className="cursor-pointer">
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>

                        {editingRoleIndex === i ? (
                            <div className="flex gap-2 mt-3 animate-in fade-in slide-in-from-top-1">
                                <Input
                                    placeholder="e.g. React, Figma..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addSkillToRole(i)}
                                    className="rounded-xl border-slate-200 text-slate-900 placeholder:text-slate-400"
                                />
                                <Button
                                    onClick={() => addSkillToRole(i)}
                                    className="rounded-xl bg-[#5A8D39] hover:bg-[#4a752f] text-white px-4 font-bold cursor-pointer"
                                >
                                    Add
                                </Button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setEditingRoleIndex(i)}
                                className="mt-2 text-xs font-bold text-[#5A8D39] hover:text-[#4a752f] hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-none p-0"
                            >
                                <Plus className="h-3 w-3" /> Add skills
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {roles.length === 0 && (
                <div className="flex items-center gap-3 text-sm text-amber-600 bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-4 font-medium italic animate-in fade-in zoom-in duration-300">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>Please add at least one role (e.g., Designer or Developer) to continue.</p>
                </div>
            )}

            <div className="flex gap-2 p-2 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <Input
                    placeholder="New Role (e.g. UI Designer)"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addRole()}
                    className="border-none focus-visible:ring-0 text-slate-900"
                />
                <Button variant="ghost" onClick={addRole} className="rounded-xl text-[#5A8D39] hover:bg-slate-100 cursor-pointer font-bold">
                    <Plus className="h-4 w-4 mr-1" /> Add Role
                </Button>
            </div>
        </div>
    );
}