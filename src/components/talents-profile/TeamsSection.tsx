import { Badge } from "@/components/ui/badge";
import { Trophy, Users } from "lucide-react";

export default function TeamsSection({ teams }: { teams: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
        <Users className="h-5 w-5 text-primary" /> Teams Joined
      </h2>
      <div className="space-y-3">
        {teams.map(team => (
          <div key={team.name} className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Trophy className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{team.name}</p>
                <p className="text-xs text-muted-foreground">{team.role}</p>
              </div>
            </div>
            <Badge variant={team.status === "Active" ? "default" : "outline"} className="text-xs">
              {team.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}