"use client";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface FilterSidebarProps {
  categories: string[];
  skillsList: string[];
  selectedCategories: string[];
  selectedSkills: string[];
  toggleCategory: (cat: string) => void;
  toggleSkill: (skill: string) => void;
  clearAll: () => void;
  isMobile?: boolean;
}

export default function FilterSidebar({
  categories,
  skillsList,
  selectedCategories,
  selectedSkills,
  toggleCategory,
  toggleSkill,
  clearAll,
  isMobile
}: FilterSidebarProps) {
  return (
    <aside className={isMobile ? "w-full" : "w-64 shrink-0"}>
      <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">
            Filters
          </h3>
          {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
            <button
              onClick={clearAll}
              className="text-xs text-primary font-bold hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold mb-4">Category</h4>
          <div className="space-y-3">
            {categories.map((cat) => {
              const isChecked = selectedCategories.includes(cat);
              return (
                <div key={cat} className="flex items-center gap-3 group">
                  <Checkbox
                    id={cat}
                    checked={isChecked}
                    onCheckedChange={() => toggleCategory(cat)}
                  />
                  <Label
                    htmlFor={cat}
                    className={cn(
                      "text-sm cursor-pointer transition-colors duration-200",
                      isChecked
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground group-hover:text-primary",
                    )}
                  >
                    {cat}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  selectedSkills.includes(skill)
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
