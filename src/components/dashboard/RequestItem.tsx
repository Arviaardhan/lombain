import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function RequestItem({ req, onApprove, onDecline, onViewProfile }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {req.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <button onClick={() => onViewProfile(req)} className="font-semibold hover:text-primary hover:underline">
                {req.name}
              </button>
              <span className="text-xs text-muted-foreground">· {req.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Wants to join <span className="font-medium text-foreground">{req.team}</span> as {req.role}
            </p>
            <p className="mt-2 text-sm text-muted-foreground italic">"{req.message}"</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {req.skills.map((skill: string) => (
                <span key={skill} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="outline" className="text-destructive rounded-xl" onClick={() => onDecline(req.id)}>
            <X className="h-4 w-4" /> Decline
          </Button>
          <Button size="sm" className="rounded-xl bg-[#5A8D39] hover:bg-[#4a752f]" onClick={() => onApprove(req)}>
            <Check className="h-4 w-4" /> Approve
          </Button>
        </div>
      </div>
    </motion.div>
  );
}