"use client";

import { Textarea } from "@/components/ui/textarea";
import Field from "./Field";

const DESC_MAX = 500;

export default function Step1Description({ description, setDescription, errors, fieldClass }: any) {
    return (
        <div className="space-y-5">
            <Field label="Project Description" value={description} required error={errors?.description}>
                <Textarea
                    placeholder="Jelaskan proyekmu, apa yang sedang dibangun, dan kenapa ini menarik..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, DESC_MAX))}
                    className={`min-h-[200px] rounded-2xl p-4 leading-relaxed ${fieldClass("description")}`}
                />
                <p className={`text-[10px] font-bold mt-2 text-right transition-colors ${description.length < 10 ? "text-red-500" : "text-slate-400"
                    }`}>
                    {description.length < 10
                        ? "MINIMUM 10 CHARACTERS TO PROCEED"
                        : `${description.length} / 500`
                    }
                </p>
            </Field>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-[#5A8D39]">Tip:</strong> Masukkan visi tim, masalah yang ingin diselesaikan, dan target yang ingin dicapai agar orang tertarik bergabung.
                </p>
            </div>
        </div>
    );
}