import { useState, useEffect, useMemo } from "react";
import { ENDPOINTS } from "@/lib/api-constant";
import Cookies from "js-cookie";

export function useCompetitions() {
    const [allTeams, setAllTeams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);

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

            // 1. SEARCH MATCHING (Judul Tim / Nama Lomba)
            const matchesSearch =
                search === "" ||
                (team.title || team.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (team.competition_name || "").toLowerCase().includes(search.toLowerCase());

            // 2. CATEGORY MATCHING (Case Insensitive)
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.some(cat =>
                    cat.toLowerCase() === (team.category || "").toLowerCase()
                );

            // 3. SKILLS MATCHING (The Glints Logic)
            // Cek apakah ada SKILL di tim yang cocok dengan FILTER yang dipilih user
            const teamSkills = Array.isArray(team.skills) ? team.skills : [];
            const matchesSkills =
                selectedSkills.length === 0 ||
                selectedSkills.some(selectedSkill =>
                    teamSkills.some((ts: string) => ts.toLowerCase() === selectedSkill.toLowerCase())
                );

            return matchesSearch && matchesCategory && matchesSkills;
        });
    }, [allTeams, search, selectedCategories, selectedSkills]);

    return {
        search, setSearch,
        selectedCategories, selectedSkills,
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
        filtered: filtered || [],
        isLoading,
        visibleCount,
        setVisibleCount,
        activeFiltersCount: selectedCategories.length + selectedSkills.length,
    };
}