"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api-constant";

export function useEditProfile() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile States
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    institution: "",
    bio: "",
    skill_category_id: "",
    github_url: "",
    linkedin_url: "",
    portfolio_url: "",
    phone: "",
    email: "",
    skills: [] as string[],
  });

  const [skillInput, setSkillInput] = useState("");

  // 1. Fetch Data Profil saat ini
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (result.success) {
          const u = result.data;
          setFormData({
            name: u.name || "",
            major: u.major || "",
            institution: u.institution || "",
            bio: u.bio || "",
            skill_category_id: u.skill_category_id?.toString() || "",
            github_url: u.github_url || "",
            linkedin_url: u.linkedin_url || "",
            portfolio_url: u.portfolio_url || "",
            phone: u.phone || "",
            email: u.email || "",
            skills: u.skills || [],
          });
        }
      } catch (error) {
        toast({ title: "Error", description: "Gagal memuat profil.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  // 2. Logic Tambah/Hapus Skill
  const addSkill = (skill?: string) => {
    const value = (skill || skillInput).trim();
    if (value && !formData.skills.includes(value)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, value] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  // 3. Handle Save (Update ke Laravel)
  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({ title: "Validation Error", description: "Name is required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/profile/update`, {
        method: "POST", // Laravel Route kita pakai POST untuk update profile
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _method: "POST" // Jika route Laravel mu menggunakan Route::put
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast({ title: "Success! ✨", description: "Profil berhasil diperbarui." });
        router.push("/profile");
        router.refresh();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return {
    formData, setFormData,
    isLoading, saving,
    skillInput, setSkillInput,
    addSkill, removeSkill, handleSave
  };
}