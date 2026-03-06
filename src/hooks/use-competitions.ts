// src/hooks/use-competitions.ts
import { useState, useEffect } from "react";
import { mockPosts } from "@/data/competitions";
import { Competition } from "@/types/competition";

export function useCompetitions() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedSkills([]);
    };

    // Cari bagian ini di use-competitions.ts kamu
    const filtered = mockPosts.filter((post: Competition) => {
        const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.desc.toLowerCase().includes(search.toLowerCase());

        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);

        const matchSkills = selectedSkills.length === 0 || post.skills.some((s) => selectedSkills.includes(s));

        return matchSearch && matchCategory && matchSkills;
    });

    return {
        search,
        setSearch,
        selectedCategories,
        selectedSkills,
        toggleCategory,
        toggleSkill,
        clearFilters,
        filtered,
        isLoading,
        visibleCount,
        setVisibleCount,
        activeFiltersCount: selectedCategories.length + selectedSkills.length,
    };
}