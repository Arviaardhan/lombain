"use client";

import { cn } from "@/lib/utils";
import { allMajors, allInstitutions, allSkills } from "@/data/talents";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { GraduationCap, School, Star, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface FilterSidebarProps {
  selectedMajors: string[];
  setSelectedMajors: (v: string[]) => void;
  selectedInstitutions: string[];
  setSelectedInstitutions: (v: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (v: string[]) => void;
  toggleFilter: (arr: string[], val: string, setter: (v: string[]) => void) => void;
  activeFilterCount: number;
  isMobile?: boolean;
}

export default function TalentFilterSidebar({
  selectedMajors,
  setSelectedMajors,
  selectedInstitutions,
  setSelectedInstitutions,
  selectedSkills,
  setSelectedSkills,
  toggleFilter,
  activeFilterCount,
  isMobile,
}: FilterSidebarProps) {

  const renderCheckbox = (label: string, isChecked: boolean, onToggle: () => void) => (
    <div key={label} className="flex items-center gap-3 group py-0.5">
      <Checkbox
        id={label}
        checked={isChecked}
        onCheckedChange={() => onToggle()}
        className="data-[state=checked]:bg-[#5A8D39] data-[state=checked]:border-[#5A8D39] rounded-md transition-all"
      />
      <Label
        htmlFor={label}
        className={cn(
          "text-[13px] cursor-pointer transition-all duration-200 select-none",
          isChecked
            ? "text-[#5A8D39] font-bold"
            : "text-slate-500 font-medium group-hover:text-slate-900"
        )}
      >
        {label}
      </Label>
    </div>
  );

  return (
    <div className={cn(
      "space-y-8",
      !isMobile && "sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm"
    )}>
      {/* Header Filter */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-50">
        <h3 className="font-black text-[11px] uppercase tracking-[0.15em] text-slate-400">
          Filter Bakat
        </h3>
        {activeFilterCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              setSelectedMajors([]);
              setSelectedInstitutions([]);
              setSelectedSkills([]);
            }}
            className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </motion.button>
        )}
      </div>

      {/* Major Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <GraduationCap className="h-4 w-4 text-[#5A8D39]" />
          <h4 className="text-sm font-black tracking-tight">Jurusan</h4>
        </div>
        <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-100">
          {allMajors.map((m) =>
            renderCheckbox(m, selectedMajors.includes(m), () =>
              toggleFilter(selectedMajors, m, setSelectedMajors)
            )
          )}
        </div>
      </div>

      {/* Institution Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <School className="h-4 w-4 text-[#5A8D39]" />
          <h4 className="text-sm font-black tracking-tight">Institusi</h4>
        </div>
        <div className="space-y-2.5">
          {allInstitutions.map((i) =>
            renderCheckbox(i, selectedInstitutions.includes(i), () =>
              toggleFilter(selectedInstitutions, i, setSelectedInstitutions)
            )
          )}
        </div>
      </div>

      {/* Skills Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Star className="h-4 w-4 text-[#5A8D39]" />
          <h4 className="text-sm font-black tracking-tight">Keahlian</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((s) => {
            const isSelected = selectedSkills.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleFilter(selectedSkills, s, setSelectedSkills)}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-all border",
                  isSelected
                    ? "bg-[#5A8D39] text-white border-[#5A8D39] shadow-md shadow-green-100 scale-105"
                    : "bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-800"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}