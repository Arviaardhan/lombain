"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { masterCategories } from "@/data/signup-data";

export default function SkillSection({ 
  category, skills, setSkills 
}: { 
  category: string, skills: string[], setSkills: (s: string[]) => void 
}) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = category
    ? masterCategories[category].filter(
        (s) => s.toLowerCase().includes(input.toLowerCase()) && !skills.includes(s)
      )
    : [];

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <Label className="text-sm font-bold text-slate-700">Your Skills</Label>
      <div className="relative mt-2">
        <Input
          placeholder="Type a skill and press Enter..."
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill(input);
            }
          }}
          className="rounded-xl border-slate-200 h-11"
        />
        
        {showSuggestions && input && suggestions.length > 0 && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-100 bg-white p-1 shadow-xl">
            {suggestions.slice(0, 5).map((s) => (
              <button
                key={s}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); addSkill(s); }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} className="rounded-lg px-3 py-1 bg-[#5A8D39]/10 text-[#5A8D39] border-[#5A8D39]/20 gap-1">
            {skill}
            <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="cursor-pointer">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}