"use client";

import { Label } from "@/components/ui/label";

interface FieldProps {
  label: string;
  value?: any;        // Kita butuh value untuk cek isinya
  required?: boolean;  // Penanda apakah field ini wajib
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export default function Field({ label, value, required, hint, error, children }: FieldProps) {
  // Logika: Jika required tapi value kosong (string kosong, null, atau array kosong)
  const isMissing = required && (
    !value || 
    (typeof value === 'string' && value.trim() === '') || 
    (Array.isArray(value) && value.length === 0)
  );

  return (
    <div className="flex flex-col">
      <Label className="text-sm font-bold text-slate-700 tracking-wide flex items-center">
        {label}
        {required && (
          <span className={`ml-1 transition-colors duration-300 ${isMissing ? "text-red-500" : "text-slate-300"}`}>
            *
          </span>
        )}
      </Label>

      <div className="mt-3"> 
        {children}
      </div>

      {hint && !error && (
        <p className="text-[10px] text-slate-500 mt-2 italic opacity-80">{hint}</p>
      )}
      {error && (
        <p className="text-[10px] text-red-500 font-bold mt-2">{error}</p>
      )}
    </div>
  );
}