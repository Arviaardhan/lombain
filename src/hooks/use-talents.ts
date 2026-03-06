import { useState, useMemo, useEffect } from "react";
import { mockUsers } from "@/data/talents";
import { Talent } from "@/types/talent";

export function useTalents() {
  const [search, setSearch] = useState("");
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [search, selectedMajors, selectedInstitutions, selectedSkills]);

  const toggleFilter = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    return mockUsers.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchMajor = selectedMajors.length === 0 || selectedMajors.includes(u.major);
      const matchInst = selectedInstitutions.length === 0 || selectedInstitutions.includes(u.institution);
      const matchSkill = selectedSkills.length === 0 || selectedSkills.some(s => u.skills.includes(s));
      return matchSearch && matchMajor && matchInst && matchSkill;
    });
  }, [search, selectedMajors, selectedInstitutions, selectedSkills]);

  return {
    search, setSearch,
    selectedMajors, setSelectedMajors,
    selectedInstitutions, setSelectedInstitutions,
    selectedSkills, setSelectedSkills,
    toggleFilter,
    filtered,
    isLoading,
    visibleCount,
    setVisibleCount,
    activeFilterCount: selectedMajors.length + selectedInstitutions.length + selectedSkills.length
  };
}