"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import DetailTeamHeader from "@/components/detail-team/DetailTeamHeader";
import DetailTeamStats from "@/components/detail-team/DetailTeamStats";
import TeamSidebar from "@/components/detail-team/ListTalent";
import QuickInfo from "@/components/detail-team/QuickInfo";
import TeamResources from "@/components/detail-team/TeamResources";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";
import JoinTeamModal from "@/components/JoinTeamModal";
import PerformanceHistory from "@/components/detail-team/PerformanceHistory";

const mockDetail = {
  id: "1",
  title: "Hackathon UI/UX 2026",
  category: "Design",
  campus: "Universitas Indonesia",
  deadline: "March 15, 2026",
  competitionLink: "https://hackathon-uiux.id",
  whatsappLink: "https://chat.whatsapp.com/example-invite-link",
  description: `We're building a healthcare app prototype for the national UI/UX Hackathon 2026. Our goal is to create an intuitive patient management system that helps rural clinics digitize their workflow.\n\nWe're looking for passionate designers and researchers who want to make a real impact.`,
  goals: [
    "Create a high-fidelity prototype in Figma",
    "Conduct user research with 5+ healthcare workers",
    "Present a compelling pitch to judges",
  ],
  members: [
    { id: 1, name: "Andi Pratama", role: "Team Lead", initials: "AP", isLeader: true },
    { id: 2, name: "Sarah Chen", role: "Visual Designer", initials: "SC", isLeader: false },
  ],
  openRoles: [
    { role: "Interaction Designer", skills: ["Figma", "Animation"], description: "Create micro-interactions" },
    { role: "UX Researcher", skills: ["User Testing"], description: "Conduct user interviews" },
  ],
  slots: "2/4",
  posted: "2 hours ago",
  achievements: [
    { 
      competition: "UI/UX Design Sprint 2025", 
      result: "Winner", 
      year: 2025, 
      roster: [{ name: "Andi", initials: "AP" }, { name: "Sarah", initials: "SC" }] 
    },
  ],
  memberWins: { "Andi Pratama": 3, "Sarah Chen": 2 },
  resourceLink: "https://drive.google.com/example-guidebook", // <--- INI LINKNYA
  resources: [
    { name: "Competition Rulebook 2026.pdf", type: "pdf", url: "#" },
    { name: "Design System Guidelines", type: "link", url: "#" },
  ],
};

export default function DetailTeamPage() {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "pending" | "joined">("idle");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 min-h-screen bg-slate-50/20">
      {/* 1. Navigation */}
      <Link href="/explore" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-[#5A8D39] transition-all mb-6 tracking-widest">
        <ArrowLeft className="h-3.5 w-3.5" /> BACK TO EXPLORE
      </Link>

      <div className="grid gap-6">
        <DetailTeamHeader detail={mockDetail} status={applicationStatus} onJoin={() => setJoinModalOpen(true)} />

        <div className="grid gap-6 md:grid-cols-3 items-start">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-[15px] font-bold mb-4 text-slate-900 uppercase tracking-tight">About Project</h2>
              <p className="text-slate-500 text-[13px] leading-relaxed whitespace-pre-line font-medium">{mockDetail.description}</p>
            </div>

            <PerformanceHistory />

            <DetailTeamStats wins={mockDetail.memberWins} achievements={mockDetail.achievements} />
          </div>

          {/* Sidebar Area - BERSIH & RAPI */}
          <aside className="space-y-6 sticky top-24">
            <TeamSidebar members={mockDetail.members} onMemberClick={(m: any) => { setSelectedMember(m); setDrawerOpen(true); }} />
            
            <QuickInfo 
              slots={mockDetail.slots} 
              category={mockDetail.category} 
              campus={mockDetail.campus} 
            />

            {/* PASSING LINK GUIDEBOOK DI SINI */}
            <TeamResources 
              resourceLink={mockDetail.resourceLink} 
              resources={mockDetail.resources} 
            />
          </aside>
        </div>
      </div>

      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />
      <JoinTeamModal open={joinModalOpen} onOpenChange={setJoinModalOpen} teamName={mockDetail.title} onSubmit={() => { setApplicationStatus("pending"); setJoinModalOpen(false); }} />
    </div>
  );
}