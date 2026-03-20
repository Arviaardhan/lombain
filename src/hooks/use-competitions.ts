// hooks/use-competitions.ts
import { useState, useEffect, useMemo } from "react";
import { ENDPOINTS } from "@/lib/api-constant";
import Cookies from "js-cookie";

export function useCompetitions() {
    // Pastikan inisialisasi awal adalah array kosong [], bukan null/undefined
    const [allTeams, setAllTeams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const fetchTeams = async () => {
            setIsLoading(true);
            try {
                const token = Cookies.get("token") || localStorage.getItem("token");
                const res = await fetch(ENDPOINTS.EXPLORE_TEAMS, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });
                const result = await res.json();

                // PERBAIKAN DI SINI: Laravel kirim 'teams', bukan 'data'
                if (result.success && Array.isArray(result.teams)) {
                    setAllTeams(result.teams);
                } else {
                    setAllTeams([]);
                }
            } catch (error) {
                console.error("Failed to fetch teams:", error);
                setAllTeams([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const filtered = useMemo(() => {
        if (!Array.isArray(allTeams)) return [];

        return allTeams.filter((team) => {
            if (!team) return false;

            // Sesuaikan mapping filter dengan properti dari Laravel
            const matchesSearch =
                (team.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (team.competition_name || "").toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(team.category); // Propertinya 'category'

            return matchesSearch && matchesCategory;
        });
    }, [allTeams, search, selectedCategories]);

    return {
        search,
        setSearch,
        selectedCategories,
        selectedSkills,
        toggleCategory: (cat: string) => {
            setSelectedCategories(prev =>
                prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
            );
        },
        toggleSkill: (skill: string) => {
            setSelectedSkills(prev =>
                prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
            );
        },
        clearFilters: () => {
            setSelectedCategories([]);
            setSelectedSkills([]);
            setSearch("");
        },
        filtered: filtered || [], // Selalu pastikan return array
        isLoading,
        visibleCount,
        setVisibleCount,
        activeFiltersCount: (selectedCategories?.length || 0) + (selectedSkills?.length || 0),
    };
}