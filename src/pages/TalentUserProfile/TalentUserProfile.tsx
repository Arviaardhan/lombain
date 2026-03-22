"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api-constant";

// Widgets
import ProfileHeader from "@/components/talents-profile/ProfileHeader";
import AboutSection from "@/components/talents-profile/AboutSection";
import SkillsSection from "@/components/talents-profile/SkillsSection";
import ProjectsSection from "@/components/talents-profile/ProjectsSection";
import TeamsSection from "@/components/talents-profile/TeamsSection";
import TrophyRoom from "@/components/talents-profile/TrophyRoom";
import InviteToTeamModal from "@/components/InviteToTeamModal";
import ContactModal from "@/components/global-components/ContactModal";
import PerformanceHistory from "@/components/talents-profile/PerformanceHistory";

export default function UserProfile() {
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const fetchTalentDetail = async () => {
      if (!params?.id) return;
      
      setIsLoading(true);
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE_URL}/talents/${params.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        });
        const result = await res.json();

        if (result.success) {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat detail talent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTalentDetail();
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F9FBFB]">
        <Loader2 className="h-8 w-8 animate-spin text-[#5A8D39]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">User not found</h1>
        <p className="text-muted-foreground mt-2">Profil ini tidak ditemukan atau sudah dihapus.</p>
        <Button variant="outline" className="mt-6" asChild>
          <Link href="/talent">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Discover
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F9FBFB]">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="animate-fade-in">
          <Link
            href="/talent"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Discover Talent
          </Link>

          {/* Pastikan widget di bawah ini sudah menerima props dari API */}
          <ProfileHeader
            user={user}
            onContact={() => setContactOpen(true)}
            onInvite={() => setInviteOpen(true)}
          />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <AboutSection user={user} />
              {/* Jika Performance History belum ada di API, bisa kita beri default empty array [] */}
              <PerformanceHistory performance={user.performance || []} />
              <SkillsSection skills={user.skills || []} />
              <TeamsSection teams={user.current_projects || []} />
              <TrophyRoom history={user.achievements || []} />
            </div>
            <div>
              <ProjectsSection projects={user.achievements || []} />
            </div>
          </div>
        </div>

        <InviteToTeamModal
          open={inviteOpen}
          onOpenChange={setInviteOpen}
          targetUser={user ? {
            ...user,
            initials: user.name?.substring(0, 2).toUpperCase()
          } : null}
        />
        
        <ContactModal
          open={contactOpen}
          onOpenChange={setContactOpen}
          user={user}
        />
      </div>
    </div>
  );
}