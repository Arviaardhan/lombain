import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export default function StatCards({ stats }: { stats: StatProps[] }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
          <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}