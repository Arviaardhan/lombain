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

  // Profile States - Sekarang menggunakan first_name dan last_name
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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

          let firstName = u.first_name || "";
          let lastName = u.last_name || "";

          if (!firstName && u.name) {
            const nameParts = u.name.split(" ");
            firstName = nameParts[0]; 
            lastName = nameParts.slice(1).join(" "); 
          }

          setFormData({
            first_name: firstName,
            last_name: lastName,
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

  const handleSave = async () => {
    if (!formData.first_name.trim()) {
      toast({ title: "Validation Error", description: "First name is required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const token = Cookies.get("token");

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        major: formData.major,
        institution: formData.institution,
        bio: formData.bio,
        skills: formData.skills,
        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        portfolio_url: formData.portfolio_url,
      };

      const res = await fetch(`${API_BASE_URL}/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Server Error");
      }

      if (result.success) {
        toast({ title: "Success! ✨", description: "Profil berhasil diperbarui." });
        router.push("/profile");
        setTimeout(() => router.refresh(), 100);
      }
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    saving,
    skillInput,
    setSkillInput,
    addSkill,
    removeSkill,
    handleSave
  };
}