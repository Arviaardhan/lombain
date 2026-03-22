"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/lib/api-constant";
import Cookies from "js-cookie";

interface SkillCat {
  id: number;
  name: string;
}

// Map ID Kategori ke Saran Skill (Sesuaikan dengan ID di Database-mu)
export const SKILL_SUGGESTIONS: Record<string, string[]> = {
  "1": ["Web Development", "Mobile Apps", "Laravel", "React Native", "AI/ML", "Python"], // Technology
  "2": ["Business Plan", "Pitching", "Marketing", "Financial Analysis", "BMC"], // Business
  "3": ["UI/UX Design", "Graphic Design", "Video Editing", "Figma", "Canva"], // Creative
  "4": ["Scientific Writing", "Data Analysis", "Research", "Public Speaking"], // Science
  "5": ["Debate", "Leadership", "Community Service", "Social Research"], // Social
};

export function useSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiCategories, setApiCategories] = useState<SkillCat[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    institution: "",
    major: "",
    password: "",
    password_confirmation: "",
    skill_category_id: "",
    skills: [] as string[], // Simpan array skill
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(ENDPOINTS.SKILL_CATEGORIES);
        const result = await res.json();
        if (result.success) setApiCategories(result.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setSkillInput("");
  };

  const removeSkill = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      setIsLoading(false);
      return;
    }

    if (formData.skills.length === 0) {
      setError("Minimal tambahkan satu keahlian (skill)!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skill_category_id: Number(formData.skill_category_id),
          // Backend Laravel butuh 'skills' sebagai array/JSON
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registrasi gagal");

      if (data.data.access_token) {
        localStorage.setItem("token", data.data.access_token);
        Cookies.set("token", data.data.access_token);
        router.push("/explore");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    apiCategories,
    skillInput,
    setSkillInput,
    handleChange,
    handleSelectChange,
    addSkill,
    removeSkill,
    handleSubmit,
  };
}