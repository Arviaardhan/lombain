"use client";

import { useState, useEffect } from "react";
import { ENDPOINTS } from "@/lib/api-constant";
import Cookies from "js-cookie";

export function useProfile() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = Cookies.get("token") || localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(ENDPOINTS.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const result = await res.json();

      if (result.success) {
        setProfile(result.data);
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Helper untuk memproses Skill (Menggabungkan skills array baru atau custom_skill lama)
  const getSkillsArray = () => {
    if (!profile) return [];
    
    // 1. Cek kolom 'skills' (array dari update terbaru)
    if (Array.isArray(profile.skills) && profile.skills.length > 0) {
      return profile.skills;
    }
    
    // 2. Fallback ke 'custom_skill' (string koma dari registrasi lama)
    if (profile.custom_skill) {
      return profile.custom_skill.split(",").map((s: string) => s.trim());
    }

    return [];
  };

  const getInitials = () => {
    if (!profile?.name) return "??";
    return profile.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return {
    profile,
    loading,
    initials: getInitials(),
    skills: getSkillsArray(),
    teams: profile?.joined_teams || [],
    refresh: fetchProfile
  };
}