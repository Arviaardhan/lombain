"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/create-recruitment/StepIndicator";
import ReviewStep from "@/components/create-recruitment/ReviewStep";
import RolesStep from "@/components/create-recruitment/RolesStep";
import Step0Info from "@/components/create-recruitment/StepInfo";
import Step1Description from "@/components/create-recruitment/StepDescription";

import { useCreateRecruitment } from "@/hooks/use-create-recruitment";

export default function CreateRecruitment() {
  const {
    step, setStep, isLoading,
    title, setTitle, category, setCategory, headline, setHeadline,
    link, setLink, description, setDescription, deadline, setDeadline,
    whatsappLink, setWhatsappLink, resourceLink, setResourceLink,
    roles, newRole, setNewRole, leaderRole, setLeaderRole, newSkill, setNewSkill,
    editingRoleIndex, setEditingRoleIndex, errors, showTitleSuggestions,
    setShowTitleSuggestions, titleSuggestions, titleRef,
    fieldClass, addRole, updateRoleSlot, addSkillToRole, removeRole, removeSkill,
    handleSubmit, isNextDisabled
  } = useCreateRecruitment();

  const infoProps = {
    category, setCategory, title, setTitle, headline, setHeadline,
    link, setLink, deadline, setDeadline, whatsappLink, setWhatsappLink,
    resourceLink, setResourceLink, errors, showTitleSuggestions,
    setShowTitleSuggestions, titleSuggestions, titleRef, fieldClass
  };

  const roleProps = {
    roles, removeRole, removeSkill, editingRoleIndex, setEditingRoleIndex,
    newSkill, setNewSkill, addSkillToRole, newRole, updateRoleSlot, leaderRole, setLeaderRole, setNewRole, addRole
  };

  const allData = {
    title, category, headline, link, deadline,
    whatsappLink, resourceLink, description, roles
  };

  const containerWidth = step === 3 ? "max-w-5xl" : "max-w-2xl";

  return (
    <div className="min-h-screen bg-accent/10 transition-all duration-500">
      {/* Container dinamis berdasarkan step */}
      <div className={`container mx-auto ${containerWidth} px-4 py-12 transition-all duration-500`}>
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Recruitment</h1>
          <p className="text-slate-700 font-medium opacity-80 mt-2">
            Build your dream team for the next big competition.
          </p>
        </header>

        <StepIndicator currentStep={step} />

        {/* Padding dikurangi sedikit pada step 3 agar konten lebih menonjol */}
        <div className={`mt-8 rounded-2xl bg-white shadow-2xl shadow-black/5 transition-all duration-500 ${step === 3 ? "p-4 md:p-6" : "p-8 md:p-12"
          }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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

              {/* ReviewStep sekarang punya ruang yang lega */}
              {step === 3 && <ReviewStep {...allData} leaderRole={leaderRole} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigasi Buttons */}
          <div className={`mt-12 flex justify-between gap-4 ${step === 3 ? "px-4 pb-4" : ""}`}>
            <Button
              variant="outline"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0 || isLoading}
              className="rounded-2xl px-8 h-12 font-bold transition-all border-slate-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={isNextDisabled}
                className={`rounded-2xl px-10 h-12 font-bold transition-all duration-300 ${isNextDisabled ? "opacity-50" : "bg-[#5A8D39] text-white shadow-lg shadow-green-100"
                  }`}
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="rounded-2xl px-10 h-12 bg-[#5A8D39] hover:bg-[#4a752f] font-bold text-white shadow-xl shadow-green-200"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Posting..." : "Post Recruitment"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}