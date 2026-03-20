"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Save, Loader2, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL, ENDPOINTS } from "@/lib/api-constant";

import Step0Info from "@/components/create-recruitment/StepInfo";

interface RouteParams {
  id: string;
  [key: string]: string | string[]; 
}

export default function EditTeamPage() {
    const params = useParams() as RouteParams;
    const id = params.id;
    const router = useRouter();
    const { toast } = useToast();
    const titleRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [headline, setHeadline] = useState("");
    const [link, setLink] = useState("");
    const [deadline, setDeadline] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [resourceLink, setResourceLink] = useState("");

    const [errors, setErrors] = useState<any>({});
    const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = Cookies.get("token") || localStorage.getItem("token");
                const res = await fetch(ENDPOINTS.TEAM_DETAIL(id as string), {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                    },
                });
                const result = await res.json();

                if (result.success) {
                    const data = result.data;
                    setCategory(data.category || "");
                    setTitle(data.name || "");
                    setHeadline(data.headline || "");
                    setLink(data.competition_link || "");
                    setDeadline(data.deadline || "");
                    setWhatsappLink(data.whatsapp_link || "");
                    setResourceLink(data.guidebook_url || "");
                } else {
                    toast({ variant: "destructive", title: "Oops!", description: "Gagal mengambil data tim." });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchTeamData();
    }, [id, toast]);

    const handleUpdate = async () => {
        setIsSubmitting(true);
        setErrors({});

        try {
            const token = Cookies.get("token") || localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/teams/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name: title,
                    headline: headline,
                    competition_name: title,
                    category: category,
                    description: headline, // Gunakan headline sebagai desc sementara
                    deadline: deadline,
                    guidebook_url: resourceLink,
                    // Sesuaikan field lain jika ada
                }),
            });

            const result = await res.json();

            if (res.ok) {
                toast({ title: "Update Berhasil! 🚀", description: "Informasi tim kamu sudah diperbarui." });
                router.push("/dashboard");
                router.refresh();
            } else {
                setErrors(result.errors || {});
                toast({ variant: "destructive", title: "Gagal Update", description: result.message || "Periksa kembali inputan kamu." });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Terjadi kesalahan pada server." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fieldClass = (name: string) => errors[name] ? "border-red-500 bg-red-50" : "";

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-[#5A8D39]" />
                    <p className="text-slate-500 font-medium animate-pulse">Menyiapkan data tim...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <div className="container mx-auto max-w-3xl px-4 py-10">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6 gap-2 text-slate-500 hover:text-[#5A8D39] transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" /> Kembali ke Dashboard
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[2.5rem] border border-border bg-white p-10 shadow-sm"
                >
                    <header className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Team Info</h1>
                        <p className="text-slate-500 mt-2 font-medium">Perbarui headline dan detail kompetisi tim kamu.</p>
                    </header>

                    <Step0Info
                        category={category} setCategory={setCategory}
                        title={title} setTitle={setTitle}
                        headline={headline} setHeadline={setHeadline}
                        link={link} setLink={setLink}
                        deadline={deadline} setDeadline={setDeadline}
                        whatsappLink={whatsappLink} setWhatsappLink={setWhatsappLink}
                        resourceLink={resourceLink} setResourceLink={setResourceLink}
                        errors={errors}
                        showTitleSuggestions={showTitleSuggestions}
                        setShowTitleSuggestions={setShowTitleSuggestions}
                        titleSuggestions={[]}
                        titleRef={titleRef}
                        fieldClass={fieldClass}
                    />

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t pt-8 gap-6">
                        <div className="flex items-center gap-3 text-amber-600 bg-amber-50 px-5 py-3 rounded-2xl text-xs font-semibold">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>Info: Perubahan Role & Skill dapat dilakukan di tab "Team Structure".</span>
                        </div>

                        <Button
                            onClick={handleUpdate}
                            disabled={isSubmitting}
                            className="w-full md:w-auto bg-[#5A8D39] hover:bg-[#4a752f] text-white px-10 h-12 rounded-2xl font-bold gap-2 shadow-lg shadow-green-900/20 active:scale-95 transition-all"
                        >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Simpan Perubahan
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}