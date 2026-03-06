import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Users } from "lucide-react";

export default function ProfileHeader({ user, onContact, onInvite }: { user: any, onContact: () => void, onInvite: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-5">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-2 ring-border">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <Badge variant="secondary" className="mt-2 font-bold pt-1 pb-1 pl-3 pr-3">{user.institution}</Badge>
            <p className="text-sm font-semibold text-muted-foreground mt-2">{user.major}</p>
          </div>
        </div>
        <div className="flex gap-4 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onContact}
            className="rounded-xl px-5" // Tambahkan rounded-xl
          >
            <Mail className="h-4 w-4 mr-1.5" /> Contact
          </Button>

          <Button
            size="sm"
            onClick={onInvite}
            className="rounded-xl px-5 bg-[#5A8D39] hover:bg-[#4a752f]" // Tambahkan rounded-xl
          >
            <Users className="h-4 w-4 mr-1.5" /> Invite to Team
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
        <div className="text-center grid gap-2">
          <p className="text-2xl font-bold text-primary">{user.teamsJoined}</p>
          <p className="text-xs text-muted-foreground font-medium">Teams Joined</p>
        </div>
        <div className="text-center grid gap-2">
          <p className="text-2xl font-bold text-primary">{user.projectsCompleted}</p>
          <p className="text-xs text-muted-foreground font-medium">Projects</p>
        </div>
        <div className="text-center grid gap-2">
          <p className="text-2xl font-bold text-primary">{user.teams.filter((t: any) => t.status === "Active").length}</p>
          <p className="text-xs text-muted-foreground font-medium">Active Teams</p>
        </div>
      </div>
    </div>
  );
}