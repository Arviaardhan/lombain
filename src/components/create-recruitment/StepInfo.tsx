"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Field from "./Field";
import { categories } from "@/data/recruitment";

export default function Step0Info({
  category, setCategory,
  title, setTitle,
  headline, setHeadline,
  link, setLink,
  deadline, setDeadline,
  whatsappLink, setWhatsappLink,
  resourceLink, setResourceLink,
  errors, showTitleSuggestions,
  setShowTitleSuggestions, titleSuggestions,
  titleRef, fieldClass
}: any) {

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="space-y-10">
      <Field label="Category" value={category} required error={errors.category}>
        <Select
          value={category}
          onValueChange={(v) => {
            setCategory(v);
          }}
        >
          <SelectTrigger className={`rounded-xl h-11 ${fieldClass("category")}`}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {categories.map((c) => (
              <SelectItem key={c.value} value={c.value} className="cursor-pointer">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Competition Title" value={title} required error={errors.title}>
        <div className="relative" ref={titleRef}>
          <Input
            placeholder="e.g., Hackathon UI/UX 2026"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowTitleSuggestions(true);
            }}
            onFocus={() => setShowTitleSuggestions(true)}
            onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 150)}
            className={`rounded-xl h-11 ${fieldClass("title")}`}
          />
          {showTitleSuggestions && titleSuggestions.length > 0 && title.length > 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-white p-1 shadow-xl">
              {titleSuggestions.slice(0, 5).map((s: string) => (
                <button
                  key={s}
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setTitle(s);
                    setShowTitleSuggestions(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </Field>

      <Field
        label="Team Headline"
        value={headline}
        required
        error={errors.headline}
        hint="Kalimat singkat yang muncul di kartu (Max 150 karakter)"
      >
        <Input
          placeholder='e.g., "Need a passionate UI Designer to build an innovative travel app"'
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          maxLength={150}
          className={`rounded-xl h-11 ${fieldClass("headline")}`}
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Competition Link" error={errors.link}>
          <Input
            placeholder="https://..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={`rounded-xl h-11 ${fieldClass("link")}`}
          />
        </Field>
        {/* Update di sini: Ditambahkan Required dan Error mapping */}
        <Field label="Recruitment Closes On" required error={errors.deadline}>
          <Input
            type="date"
            min={minDate}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={`rounded-xl h-11 cursor-pointer ${fieldClass("deadline")}`}
          />
        </Field>
      </div>

      <Field
        label="WhatsApp Group Link"
        hint="Hanya terlihat oleh anggota tim yang disetujui"
        error={errors.whatsappLink}
      >
        <Input
          placeholder="https://chat.whatsapp.com/..."
          value={whatsappLink}
          onChange={(e) => setWhatsappLink(e.target.value)}
          className={`rounded-xl h-11 ${fieldClass("whatsappLink")}`}
        />
      </Field>

      <Field
        label="Guidebook Link"
        hint="Berikan link pedoman lomba agar tim kamu paham aturannya."
        error={errors.resourceLink}
      >
        <Input
          placeholder="e.g., Google Drive link"
          value={resourceLink}
          onChange={(e) => setResourceLink(e.target.value)}
          className={`rounded-xl h-11 ${fieldClass("resourceLink")}`}
        />
      </Field>
    </div>
  );
}