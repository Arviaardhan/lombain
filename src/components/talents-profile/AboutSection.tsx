import { Github, Linkedin } from "lucide-react";

export default function AboutSection({ user }: { user: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-3 text-foreground">About</h2>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{user.bio}</p>
      <div className="flex gap-3 mt-4">
        {user.github && (
          <a href={user.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-4 w-4" /> GitHub
          </a>
        )}
        {user.linkedin && (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}