"use client";

import { useState, useEffect, useCallback } from "react";
import { Talent } from "@/types/talent";
import { API_BASE_URL } from "@/lib/api-constant";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

export function useTalents() {
  const { toast } = useToast();
  const [talents, setTalents] = useState<Talent[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchTalents = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("token");

      // Membangun Query Params untuk Filtering di Backend
      const params = new URLSearchParams({
        search: search,
        majors: selectedMajors.join(","),
        institutions: selectedInstitutions.join(","),
        skills: selectedSkills.join(","),
      });

      const res = await fetch(`${API_BASE_URL}/talents?${params.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      const result = await res.json();
      if (result.success) {
        // Karena menggunakan paginate, datanya ada di result.data.data
        setTalents(result.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data talent:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data bakat. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedMajors, selectedInstitutions, selectedSkills, toast]);

  // Trigger fetch saat filter atau search berubah
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTalents();
    }, 400); // Debounce agar tidak terlalu banyak hit API saat mengetik

    return () => clearTimeout(delayDebounceFn);
  }, [fetchTalents]);

  const toggleFilter = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return {
    search,
    setSearch,
    selectedMajors,
    setSelectedMajors,
    selectedInstitutions,
    setSelectedInstitutions,
    selectedSkills,
    setSelectedSkills,
    toggleFilter,
    filtered: talents, // Data dari API
    isLoading,
    visibleCount,
    setVisibleCount,
    activeFilterCount: selectedMajors.length + selectedInstitutions.length + selectedSkills.length,
    refresh: fetchTalents
  };
}