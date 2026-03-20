"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Edit,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Trophy,
  Users,
  BookOpen,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { ENDPOINTS, BASE_URL } from "@/lib/api-constant";
import Cookies from "js-cookie";

// Interface sesuai dengan response API Laravel kita
interface ProfileData {
  name: string;
  avatar: string | null;
  institution: string;
  major: string;
  bio: string | null;
  custom_skill: string | null;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  joined_teams: any[];
  stats: {
    competitions: number;
    wins: number;
    teams: number;
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token") || localStorage.getItem("token");

      console.log("Token yang dikirim:", token); // Pastikan ini bukan 'undefined' lagi

      if (!token) {
        console.error("Token tidak ditemukan, silakan login ulang.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(ENDPOINTS.GET_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const result = await res.json();
        console.log("Data dari Laravel:", result); // CEK INI DI CONSOLE BROWSER

        if (result.success) {
          setProfile(result.data);
        }

        if (result.success) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#5A8D39]" />
      </div>
    );
  }

  if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "??";

  // 2. Helper untuk parse skills (Proteksi jika custom_skill null)
  const skillsArray = profile.custom_skill
    ? profile.custom_skill.split(",").map(s => s.trim())
    : [];

  // 3. PROTEKSI UTAMA: Pastikan joined_teams selalu berupa array
  const teamsArray = profile.joined_teams || [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-fade-in">
        {/* Card Header Profile */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-[#5A8D39]/20">
                <AvatarImage src={profile.avatar ? `${BASE_URL}/storage/${profile.avatar}` : ""} />
                <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
                <p className="mt-1 text-muted-foreground font-medium">{profile.major}</p>
                <p className="text-sm text-muted-foreground">{profile.institution}</p>
                <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
                  {profile.bio || "Belum ada bio. Ceritakan sedikit tentang dirimu!"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 shrink-0 rounded-xl hover:bg-[#5A8D39]/5 hover:text-[#5A8D39]">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#5A8D39]">
                {/* Tambahkan ?. di sini */}
                {profile.stats?.competitions || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Competitions</p>
            </div>
            <div className="text-center border-x border-border/50">
              <p className="text-2xl font-bold text-[#5A8D39]">
                {profile.stats?.wins || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#5A8D39]">
                {profile.stats?.teams || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Teams</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Skills Section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#5A8D39]" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillsArray.length > 0 ? (
                  skillsArray.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Belum ada skill yang ditambahkan.</p>
                )}
              </div>
            </div>

            {/* Teams & Projects Section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#5A8D39]" /> Teams & Projects
              </h2>
              <div className="space-y-3">
                {/* Gunakan teamsArray yang sudah kita amankan di atas */}
                {teamsArray.length > 0 ? (
                  teamsArray.map((team: any) => (
                    <div key={team.id} className="...">
                      {/* ... isi card tim ... */}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Kamu belum bergabung dengan tim manapun.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Portfolio */}
          <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Portfolio Links</h2>
              {/* Tombol Edit Global jika ingin sekali klik edit semua */}
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#5A8D39]">
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { id: "github_url", label: "GitHub", url: profile.github_url, icon: Github },
                { id: "linkedin_url", label: "LinkedIn", url: profile.linkedin_url, icon: Linkedin },
                { id: "portfolio_url", label: "Portfolio", url: profile.portfolio_url, icon: Globe },
              ].map((link) => (
                <div key={link.label} className="group relative">
                  {link.url ? (
                    // Jika URL ADA: Tampilkan link aslinya
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-all hover:translate-x-1"
                    >
                      <link.icon className="h-5 w-5 text-slate-500" />
                      <span className="flex-1 text-sm font-medium">{link.label}</span>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </a>
                  ) : (
                    // Jika URL KOSONG: Tampilkan tombol "Add Link"
                    <button
                      onClick={() => alert(`Buka Modal untuk tambah ${link.label}`)} // Nanti ganti dengan Modal
                      className="flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-300 p-3 text-slate-400 hover:border-[#5A8D39] hover:text-[#5A8D39] hover:bg-[#5A8D39]/5 transition-all"
                    >
                      <link.icon className="h-5 w-5 opacity-50" />
                      <span className="flex-1 text-left text-sm font-medium">Add {link.label}</span>
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}