import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export default function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
        <BookOpen className="h-5 w-5 text-primary" /> Skills & Expertise
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <Badge key={skill} variant="secondary" className="px-3 py-1">{skill}</Badge>
        ))}
      </div>
    </div>
  );
}