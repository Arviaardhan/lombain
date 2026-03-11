"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface NotificationProps {
  notif: {
    id: number;
    message: string;
    type: "success" | "info" | "warning";
    time: string;
  };
}

export default function NotificationItem({ notif }: NotificationProps) {
  // Pilih ikon dan warna berdasarkan tipe
  const getStyle = () => {
    switch (notif.type) {
      case "success":
        return { icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" };
      case "warning":
        return { icon: AlertTriangle, color: "bg-amber-100 text-amber-600" };
      case "info":
      default:
        return { icon: Info, color: "bg-blue-100 text-blue-600" };
    }
  };

  const { icon: Icon, color } = getStyle();

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 leading-snug">
          {notif.message}
        </p>
        <p className="mt-1 text-[10px] font-medium text-slate-500 uppercase tracking-wider">
          {notif.time}
        </p>
      </div>
    </motion.div>
  );
}