"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/create-recruitment/StepIndicator";
import ReviewStep from "@/components/create-recruitment/ReviewStep";
import RolesStep from "@/components/create-recruitment/RolesStep";
import Step0Info from "@/components/create-recruitment/StepInfo";
import Step1Description from "@/components/create-recruitment/StepDescription";

import { competitionSuggestions } from "@/data/recruitment";

export default function CreateRecruitment() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [roles, setRoles] = useState<{ role: string; skills: string[] }[]>([]);
  const [newRole, setNewRole] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [editingRoleIndex, setEditingRoleIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);

  const titleSuggestions = category
    ? (competitionSuggestions[category] || []).filter((s) =>
      s.toLowerCase().includes(title.toLowerCase())
    )
    : [];

  const fieldClass = (key: string) => (errors[key] ? "border-destructive" : "");

  const addRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, { role: newRole.trim(), skills: [] }]);
      setNewRole("");
      setEditingRoleIndex(roles.length);
    }
  };

  const addSkillToRole = (index: number) => {
    if (newSkill.trim()) {
      const updated = [...roles];
      updated[index].skills.push(newSkill.trim());
      setRoles(updated);
      setNewSkill("");
    }
  };

  const removeRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
    setEditingRoleIndex(null);
  };

  const removeSkill = (roleIndex: number, skillIndex: number) => {
    const updated = [...roles];
    updated[roleIndex].skills.splice(skillIndex, 1);
    setRoles(updated);
  };

  const handleSubmit = () => router.push("/explore");

  const infoProps = {
    category, setCategory,
    title, setTitle,
    link, setLink,
    deadline, setDeadline,
    whatsappLink, setWhatsappLink,
    resourceLink, setResourceLink,
    errors, showTitleSuggestions,
    setShowTitleSuggestions, titleSuggestions,
    titleRef, fieldClass
  };

  const roleProps = {
    roles, removeRole, removeSkill,
    editingRoleIndex, setEditingRoleIndex,
    newSkill, setNewSkill, addSkillToRole,
    newRole, setNewRole, addRole
  };

  const allData = {
    title, category, link, deadline,
    whatsappLink, resourceLink, description, roles
  };

  const isNextDisabled = useMemo(() => {
    if (step === 0) {
      return !title.trim() || !category;
    }
    if (step === 1) {
      return description.trim().length < 10;
    }
    if (step === 2) {
      return roles.length === 0;
    }
    return false;
  }, [step, title, category, description, roles]);

  return (
    <div className="min-h-screen bg-accent/10">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Recruitment</h1>
          <p className="text-slate-700 font-medium opacity-80 mt-2">
            Build your dream team for the next big competition.
          </p>
        </header>

        <StepIndicator currentStep={step} />

        <div className="mt-8 rounded-2xl bg-white p-8 md:p-12 shadow-2xl shadow-black/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && <Step0Info {...infoProps} />}
              {step === 1 && (
                <Step1Description
                  description={description}
                  setDescription={setDescription}
                  errors={errors}
                  fieldClass={fieldClass}
                />
              )}
              {step === 2 && <RolesStep {...roleProps} />}
              {step === 3 && <ReviewStep {...allData} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-2xl px-8 h-12 font-bold cursor-pointer transition-all"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={isNextDisabled}
                className={`rounded-2xl px-10 h-12 font-bold transition-all duration-300 ${isNextDisabled
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                    : "bg-[#5A8D39] hover:bg-[#4a752f] text-white shadow-lg shadow-green-100 cursor-pointer"
                  }`}
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="rounded-2xl px-10 h-12 bg-[#5A8D39] hover:bg-[#4a752f] font-bold shadow-xl shadow-green-200 cursor-pointer transition-all"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" /> Post Recruitment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}