"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, Info } from "lucide-react";
import Field from "./Field";
import { categories } from "@/data/recruitment";

export default function Step0Info({
  category, setCategory,
  title, setTitle,
  headline, setHeadline,
  link, setLink,
  deadline, setDeadline,
  resourceLink, setResourceLink, // Pastikan prop ini diterima
  errors, showTitleSuggestions,
  setShowTitleSuggestions, titleSuggestions,
  titleRef, fieldClass
}: any) {

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex items-start gap-4 mb-10">
        <div className="p-3 bg-green-50 rounded-2xl">
          <Trophy className="h-6 w-6 text-[#5A8D39]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Informasi Dasar</h2>
          <p className="text-sm text-slate-500 font-medium tracking-tight">
            Detail dasar tentang kompetisi yang kamu ikuti
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* CATEGORY */}
        <Field label="Kategori Kompetisi" value={category} required error={errors.category}>
          <Select value={category} onValueChange={(v) => setCategory(v)}>
            <SelectTrigger className={`rounded-xl h-12 bg-slate-50/50 border-slate-300 mt-1.5 ${fieldClass("category")}`}>
              <SelectValue placeholder="Pilih kategori..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value} className="cursor-pointer font-medium">
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* TITLE */}
        <Field label="Nama Kompetisi" value={title} required error={errors.title}>
          <div className="relative mt-1.5" ref={titleRef}>
            <Input
              placeholder="e.g., Hackathon UI/UX 2026"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setShowTitleSuggestions(true); }}
              onFocus={() => setShowTitleSuggestions(true)}
              onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 150)}
              className={`rounded-xl h-12 bg-slate-50/50 border-slate-300 font-bold focus-visible:ring-[#5A8D39] ${fieldClass("title")}`}
            />
            {showTitleSuggestions && titleSuggestions.length > 0 && title.length > 0 && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-100 bg-white p-1 shadow-2xl animate-in fade-in zoom-in-95">
                {titleSuggestions.slice(0, 5).map((s: string) => (
                  <button key={s} type="button" className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold hover:bg-slate-50 text-slate-700 transition-colors"
                    onMouseDown={(e) => { e.preventDefault(); setTitle(s); setShowTitleSuggestions(false); }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Field>

        {/* HEADLINE */}
        <Field label="Tagline Tim" value={headline} required error={errors.headline} hint="Kalimat singkat yang menarik (Max 150 karakter)">
          <Input
            placeholder='e.g., "Membangun solusi AI untuk kelestarian hutan"'
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            maxLength={150}
            className={`rounded-xl h-12 bg-slate-50/50 border-slate-300 mt-1.5 font-medium focus-visible:ring-[#5A8D39] ${fieldClass("headline")}`}
          />
        </Field>

        {/* LINKS & DEADLINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Link Resmi Kompetisi" error={errors.link}>
            <Input 
              placeholder="https://..." 
              value={link} 
              onChange={(e) => setLink(e.target.value)} 
              className="rounded-xl h-12 bg-slate-50/50 border-slate-300 mt-1.5" 
            />
          </Field>
          <Field label="Deadline Registrasi Tim" required error={errors.deadline}>
            <Input 
              type="date" 
              min={minDate} 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)} 
              className="rounded-xl h-12 bg-slate-50/50 border-slate-300 mt-1.5 cursor-pointer font-bold text-slate-700" 
            />
          </Field>
        </div>

        {/* GUIDE BOOK LINK (ADDITION) */}
        <Field label="Guide Book / Pedoman Lomba" error={errors.resourceLink} hint="Berikan link pedoman lomba agar tim kamu paham aturannya.">
          <Input 
            placeholder="e.g., Link Google Drive / Website" 
            value={resourceLink} 
            onChange={(e) => setResourceLink(e.target.value)} 
            className="rounded-xl h-12 bg-slate-50/50 border-slate-300 mt-1.5 focus-visible:ring-[#5A8D39]" 
          />
        </Field>
      </div>

      {/* FOOTER TIP */}
      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex gap-3 mt-4">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-blue-700 leading-relaxed font-medium">
          Pastikan link kompetisi dan deadline sudah benar agar calon anggota tim bisa melakukan riset mandiri sebelum mendaftar.
        </p>
      </div>
    </div>
  );
}