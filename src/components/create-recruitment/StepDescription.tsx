"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Lightbulb, Target } from "lucide-react";
import Field from "./Field";

export default function Step1Description({ 
  description, setDescription, 
  objectives, addObjective, updateObjective, removeObjective, 
  errors, fieldClass 
}: any) {
  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex items-start gap-4 mb-10">
        <div className="p-3 bg-amber-50 rounded-2xl">
          <Lightbulb className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Visi & Deskripsi</h2>
          <p className="text-sm text-slate-500 font-medium tracking-tight">
            Ceritakan visi timmu untuk menarik anggota terbaik
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* VISI TIM */}
        <Field label="Visi Tim" value={description} required error={errors?.description}>
          <Textarea
            placeholder="Jelaskan visi besar timmu, masalah yang ingin diselesaikan, dan apa yang ingin dicapai..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`min-h-[180px] rounded-xl p-4 leading-relaxed bg-slate-50/50 border-slate-300 mt-2 focus-visible:ring-[#5A8D39] ${fieldClass("description")}`}
          />
        </Field>

        {/* OBJEKTIF TIM */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-slate-400" />
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Objektif Tim (Poin-poin)
            </label>
          </div>
          
          <div className="space-y-3">
            {(objectives || []).map((obj: string, index: number) => (
              <div key={index} className="flex gap-2 animate-in fade-in slide-in-from-left-2 transition-all">
                <Input 
                  placeholder={`Contoh: Memenangkan Juara 1 Nasional...`}
                  value={obj}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  className="rounded-xl bg-slate-50/50 border-slate-200 h-12 font-medium focus-visible:ring-[#5A8D39]"
                />
                {objectives.length > 1 && (
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeObjective(index)} 
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl h-12 w-12"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button 
            type="button"
            variant="outline" 
            onClick={addObjective} 
            className="w-full rounded-xl border-dashed border-2 py-7 text-slate-500 font-bold hover:text-[#5A8D39] hover:border-[#5A8D39] hover:bg-green-50/30 transition-all group"
          >
            <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> Tambah Poin Objektif
          </Button>
        </div>
      </div>
    </div>
  );
}