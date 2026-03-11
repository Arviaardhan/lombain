"use client";

import { CheckCircle2, Trophy, FileText, Users, ClipboardCheck, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export const stepLabels: { icon: LucideIcon; label: string }[] = [
  { icon: Trophy, label: "Competition" },
  { icon: FileText, label: "Details" },
  { icon: Users, label: "Roles" },
  { icon: ClipboardCheck, label: "Review" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="relative mb-14 w-full">
      {/* 1. Jalur Garis di Latar Belakang */}
      <div className="absolute top-5 left-0 w-full flex justify-center px-[12.5%]">
        <div className="relative h-[2px] w-full bg-slate-200">
          {/* Progress Line - Bergerak mulus sesuai step */}
          <motion.div 
            className="absolute h-full bg-[#5A8D39]"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (stepLabels.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* 2. Barisan Ikon & Label */}
      <div className="relative z-10 flex w-full justify-between items-start">
        {stepLabels.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center gap-3 flex-1">
            
            {/* Lingkaran Ikon - bg-white di sini fungsinya menutupi garis tepat di belakangnya */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                i <= currentStep
                  ? "border-[#5A8D39] bg-[#5A8D39] text-white shadow-lg shadow-green-100"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {i < currentStep ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <s.icon className="h-5 w-5" />
              )}
            </div>

            {/* Label Teks - Uppercase agar terlihat lebih tegas */}
            <span
              className={`text-[10px] font-black uppercase tracking-[0.1em] text-center transition-colors duration-500 ${
                i <= currentStep ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}