import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban } from "lucide-react";

export default function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
        <FolderKanban className="h-5 w-5 text-primary" /> Projects
      </h2>
      <div className="space-y-3">
        {projects.map((project) => (
          <Card
            key={project.name}
            className="hover-lift border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
          >
            <CardContent className="p-4">
              <p className="font-medium text-sm text-foreground">
                {project.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
