"use client";

import { cn } from "@/lib/utils";
import { allMajors, allInstitutions, allSkills } from "@/data/talents";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

interface FilterSidebarProps {
  selectedMajors: string[];
  setSelectedMajors: (v: string[]) => void;
  selectedInstitutions: string[];
  setSelectedInstitutions: (v: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (v: string[]) => void;
  toggleFilter: (
    arr: string[],
    val: string,
    setter: (v: string[]) => void,
  ) => void;
  activeFilterCount: number;
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
}: FilterSidebarProps) {
  const renderCheckbox = (
    label: string,
    isChecked: boolean,
    onToggle: () => void,
  ) => (
    <div key={label} className="flex items-center gap-3 group">
      <Checkbox
        id={label}
        checked={isChecked}
        onCheckedChange={() => onToggle()}
      />
      <Label
        htmlFor={label}
        className={cn(
          "text-sm cursor-pointer transition-colors duration-200",
          isChecked
            ? "text-foreground font-semibold"
            : "text-muted-foreground group-hover:text-primary",
        )}
      >
        {label}
      </Label>
    </div>
  );

  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
          Filter Bakat
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={() => {
              setSelectedMajors([]);
              setSelectedInstitutions([]);
              setSelectedSkills([]);
            }}
            className="text-xs text-primary font-bold hover:underline"
          >
            Hapus
          </button>
        )}
      </div>

      {/* Major Filter */}
      <div>
        <h4 className="text-sm font-bold mb-4">Jurusan</h4>
        <div className="space-y-3">
          {allMajors.map((m) =>
            renderCheckbox(m, selectedMajors.includes(m), () =>
              toggleFilter(selectedMajors, m, setSelectedMajors),
            ),
          )}
        </div>
      </div>

      {/* Institution Filter */}
      <div>
        <h4 className="text-sm font-bold mb-4">Institusi</h4>
        <div className="space-y-3">
          {allInstitutions.map((i) =>
            renderCheckbox(i, selectedInstitutions.includes(i), () =>
              toggleFilter(selectedInstitutions, i, setSelectedInstitutions),
            ),
          )}
        </div>
      </div>

      {/* Skills Filter */}
      <div>
        <h4 className="text-sm font-bold mb-3">Keahlian</h4>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((s) => (
            <button
              key={s}
              onClick={() => toggleFilter(selectedSkills, s, setSelectedSkills)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                selectedSkills.includes(s)
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
