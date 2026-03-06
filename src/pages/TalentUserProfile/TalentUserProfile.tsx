"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Data
import { mockUsers } from "@/data/users";

// Widgets
import ProfileHeader from "@/components/talents-profile/ProfileHeader";
import AboutSection from "@/components/talents-profile/AboutSection";
import SkillsSection from "@/components/talents-profile/SkillsSection";
import ProjectsSection from "@/components/talents-profile/ProjectsSection";
import TeamsSection from "@/components/talents-profile/TeamsSection";
import TrophyRoom from "@/components/talents-profile/TrophyRoom";
import InviteToTeamModal from "@/components/InviteToTeamModal";
import ContactModal from "@/components/global-components/ContactModal";

export default function UserProfile() {
  const params = useParams();
  if (!params) return null;

  const user = mockUsers[Number(params.id)];
  const [inviteOpen, setInviteOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">User not found</h1>
        <p className="text-muted-foreground mt-2">This profile doesn't exist.</p>
        <Button variant="outline" className="mt-6" asChild>
          <Link href="/talent"><ArrowLeft className="h-4 w-4 mr-2" />Back to Discover</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F9FBFB]">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="animate-fade-in">
          <Link href="/talent" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Discover Talent
          </Link>

          <ProfileHeader user={user} onContact={() => setContactOpen(true)} onInvite={() => setInviteOpen(true)} />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <AboutSection user={user} />
              <SkillsSection skills={user.skills} />
              <TeamsSection teams={user.teams} />
              <TrophyRoom history={user.competitionHistory} />
            </div>
            <div>
              <ProjectsSection projects={user.projects} />
            </div>
          </div>
        </div>

        <InviteToTeamModal open={inviteOpen} onOpenChange={setInviteOpen} targetUser={user} />
        <ContactModal open={contactOpen} onOpenChange={setContactOpen} user={user} />
      </div>
    </div>
  );
}