"use client";

import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  categories: string[];
  skillsList: string[];
  selectedCategories: string[];
  selectedSkills: string[];
  toggleCategory: (cat: string) => void;
  toggleSkill: (skill: string) => void;
  clearAll: () => void;
}

export default function FilterSidebar({
  categories,
  skillsList,
  selectedCategories,
  selectedSkills,
  toggleCategory,
  toggleSkill,
  clearAll
}: FilterSidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Filters</h3>
          {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
            <button onClick={clearAll} className="text-xs text-primary font-bold hover:underline">
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
                <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer group">
                  {/* Lingkaran Kustom sebagai pengganti Checkbox kotak */}
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={isChecked}
                      onChange={() => toggleCategory(cat)}
                    />
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                      isChecked 
                        ? "border-primary bg-primary shadow-sm" 
                        : "border-muted-foreground/30 bg-transparent group-hover:border-primary/50"
                    )}>
                      {/* Titik putih di tengah */}
                      <div className={cn(
                        "h-2 w-2 rounded-full bg-white transition-transform duration-200",
                        isChecked ? "scale-100" : "scale-0"
                      )} />
                    </div>
                  </div>
                  <span className={cn(
                    "transition-colors duration-200",
                    isChecked ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-primary"
                  )}>
                    {cat}
                  </span>
                </label>
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
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
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