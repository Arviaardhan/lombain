"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api-constant";
import { useToast } from "@/hooks/use-toast";
import { competitionSuggestions } from "@/data/recruitment";

export function useCreateRecruitment() {
    const router = useRouter();
    const { toast } = useToast();
    const titleRef = useRef<HTMLDivElement>(null);

    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [headline, setHeadline] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState(""); // Ini untuk "Visi"
    const [deadline, setDeadline] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [resourceLink, setResourceLink] = useState("");
    
    // --- TAMBAHAN STATE OBJEKTIF ---
    const [objectives, setObjectives] = useState<string[]>([""]); 

    // --- UPDATE STRUKTUR ROLES ---
    // Sekarang menggunakan 'role_name' dan 'description' (untuk tanggung jawab)
    const [roles, setRoles] = useState<{ 
        role_name: string; 
        description: string; 
        skills: string[]; 
        max_slot: number 
    }[]>([]);

    const [leaderRole, setLeaderRole] = useState("");
    const [newSkill, setNewSkill] = useState("");
    const [editingRoleIndex, setEditingRoleIndex] = useState<number | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);

    // Suggestions Logic
    const titleSuggestions = useMemo(() => {
        if (!category) return [];
        return (competitionSuggestions[category] || []).filter((s) =>
            s.toLowerCase().includes(title.toLowerCase())
        );
    }, [category, title]);

    const fieldClass = (key: string) => (errors[key] ? "border-destructive" : "");

    // --- LOGIC OBJEKTIF ---
    const addObjective = () => setObjectives([...objectives, ""]);
    const updateObjective = (index: number, value: string) => {
        const newObj = [...objectives];
        newObj[index] = value;
        setObjectives(newObj);
    };
    const removeObjective = (index: number) => setObjectives(objectives.filter((_, i) => i !== index));

    // --- LOGIC ROLES (UPDATED) ---
    const addRole = () => {
        // Menambah section role kosong baru
        setRoles([...roles, { role_name: "", description: "", skills: [], max_slot: 1 }]);
    };

    const updateRoleField = (index: number, field: string, value: any) => {
        const updated = [...roles];
        (updated[index] as any)[field] = value;
        setRoles(updated);
    };

    const addSkillToRole = (index: number, skill: string) => {
        if (skill.trim()) {
            const updated = [...roles];
            updated[index].skills.push(skill.trim());
            setRoles(updated);
            setNewSkill("");
        }
    };

    const removeRole = (index: number) => {
        setRoles(roles.filter((_, i) => i !== index));
    };

    const removeSkill = (roleIndex: number, skillIndex: number) => {
        const updated = [...roles];
        updated[roleIndex].skills.splice(skillIndex, 1);
        setRoles(updated);
    };

    // Submit Logic
    const handleSubmit = async () => {
        const totalSlots = roles.reduce((acc, curr) => acc + (curr.max_slot || 1), 0);
        const calculatedMaxMembers = 1 + totalSlots;
        setIsLoading(true);
        try {
            const token = Cookies.get("token");

            const payload = {
                name: `Team ${title}`,
                headline: headline,
                competition_name: title,
                category: category,
                description: description, // Visi
                objectives: objectives.filter(o => o.trim() !== ""), // Simpan poin yang ada isinya
                max_members: calculatedMaxMembers,
                deadline: deadline,
                guidebook_url: resourceLink,
                leader_role_name: leaderRole,
                roles: roles.map(r => ({
                    role_name: r.role_name,
                    description: r.description, // Tanggung Jawab
                    max_slot: r.max_slot || 1,
                    skills: r.skills
                }))
            };

            const res = await fetch(`${API_BASE_URL}/create-teams`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                toast({ title: "Berhasil! 🚀", description: "Tim kamu telah dibuat." });
                router.push("/explore");
            } else {
                setErrors(result.errors || {});
                toast({
                    variant: "destructive",
                    title: "Gagal Membuat Tim",
                    description: result.message || "Periksa kembali data form kamu."
                });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Kesalahan koneksi ke server." });
        } finally {
            setIsLoading(false);
        }
    };

    const isNextDisabled = useMemo(() => {
        if (step === 0) {
            const baseValid = !title.trim() || !category || !headline.trim() || !deadline;
            const selectedDate = new Date(deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isDateInvalid = deadline ? selectedDate <= today : true;
            return baseValid || isDateInvalid;
        }
        if (step === 1) return description.trim().length < 10;
        if (step === 2) return roles.length === 0 || !leaderRole.trim();
        return false;
    }, [step, title, category, headline, description, roles, leaderRole, deadline]);

    return {
        step, setStep, isLoading,
        title, setTitle, category, setCategory, headline, setHeadline,
        link, setLink, description, setDescription, deadline, setDeadline,
        whatsappLink, setWhatsappLink, resourceLink, setResourceLink,
        objectives, addObjective, updateObjective, removeObjective,
        roles, setRoles, leaderRole, setLeaderRole, newSkill, setNewSkill,
        editingRoleIndex, setEditingRoleIndex, errors, showTitleSuggestions,
        setShowTitleSuggestions, titleSuggestions, titleRef,
        fieldClass, addRole, updateRoleField, addSkillToRole, removeRole, removeSkill,
        handleSubmit, isNextDisabled
    };
}