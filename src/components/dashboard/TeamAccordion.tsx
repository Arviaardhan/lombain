import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight, Crown, Shield, UserMinus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function TeamAccordion({ team, isExpanded, onToggle, onRemoveTrigger }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button onClick={onToggle} className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-[#5A8D39]">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">{team.name}</p>
            <p className="text-xs text-muted-foreground">{team.filled}/{team.total} members</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={team.status === "Recruiting" ? "default" : "outline"}>{team.status}</Badge>
          <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border bg-slate-50/30">
            <div className="p-4 space-y-2">
              {team.members.map((member: any) => (
                <div key={member.name} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-white text-xs font-bold">{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <Badge variant="outline" className="text-[10px] h-4">
                        {member.isLeader ? <Crown className="h-2.5 w-2.5 mr-1" /> : <Shield className="h-2.5 w-2.5 mr-1" />}
                        {member.isLeader ? "Leader" : "Member"}
                      </Badge>
                    </div>
                  </div>
                  {!member.isLeader && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-destructive" onClick={() => onRemoveTrigger(team.name, member.name)}>
                      <UserMinus className="h-3 w-3 mr-1" /> Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}