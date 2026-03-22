"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Edit,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Users,
  BookOpen,
  Loader2,
  PlusCircle,
  Trophy,
  MapPin,
  Save,
  Link2,
} from "lucide-react";
import { BASE_URL, API_BASE_URL } from "@/lib/api-constant";
import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export default function Profile() {
  const router = useRouter();
  const { toast } = useToast();
  const { profile, loading, initials, skills, teams, refresh } = useProfile();

  // State untuk Pop-up Portfolio Terpadu
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isSavingLink, setIsSavingLink] = useState(false);
  const [linksFormData, setLinksFormData] = useState({
    github_url: "",
    linkedin_url: "",
    portfolio_url: "",
  });

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#5A8D39]" />
      </div>
    );
  }

  if (!profile) return <p className="text-center mt-10 font-bold text-slate-400">Profile not found.</p>;

  // Fungsi untuk membuka modal dengan data yang sudah ada di profil
  const openEditLinksModal = () => {
    setLinksFormData({
      github_url: profile.github_url || "",
      linkedin_url: profile.linkedin_url || "",
      portfolio_url: profile.portfolio_url || "",
    });
    setIsLinkModalOpen(true);
  };

  // Fungsi untuk menyimpan semua link sekaligus
  const handleSaveAllLinks = async () => {
    setIsSavingLink(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...linksFormData,
          _method: "POST",
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast({ title: "Portfolio Updated! 🚀", description: "Tautan portofolio telah berhasil diperbarui." });
        await refresh(); 
        setIsLinkModalOpen(false);
      }
    } catch (error) {
      toast({ title: "Error", description: "Gagal memperbarui tautan portofolio.", variant: "destructive" });
    } finally {
      setIsSavingLink(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-fade-in">

        {/* --- HEADER SECTION --- */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-white shadow-xl">
                <AvatarImage src={profile.avatar ? `${BASE_URL}/storage/${profile.avatar}` : ""} />
                <AvatarFallback className="bg-[#5A8D39]/10 text-[#5A8D39] text-3xl font-black">{initials}</AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left space-y-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profile.name}</h1>

                {/* Major/Jurusan - Style Bold Green */}
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Trophy className="h-4 w-4 text-[#5A8D39]" />
                  <p className="text-sm font-bold text-[#5A8D39] uppercase tracking-wider">{profile.major || "No Major Set"}</p>
                </div>

                {/* Institution - Style Subtle Gray */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <p className="text-sm font-medium">{profile.institution || "No Campus Set"}</p>
                </div>

                {/* Bio - Diberi separator border top */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="max-w-lg text-[13px] text-slate-600 leading-relaxed italic">
                    {profile.bio ? `"${profile.bio}"` : "Belum ada bio. Ceritakan sedikit tentang dirimu!"}
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 shrink-0 rounded-xl border-slate-200 hover:bg-[#5A8D39]/5 hover:text-[#5A8D39] font-bold"
              onClick={() => router.push("/profile/edit")}
            >
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl bg-slate-50/50 border border-slate-100 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#5A8D39]">{profile.stats?.competitions || 0}</p>
              <p className="text-xs text-muted-foreground font-medium">Competitions</p>
            </div>
            <div className="text-center border-x border-border/50">
              <p className="text-2xl font-bold text-[#5A8D39]">{profile.stats?.wins || 0}</p>
              <p className="text-xs text-muted-foreground font-medium">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#5A8D39]">{profile.stats?.teams || 0}</p>
              <p className="text-xs text-muted-foreground font-medium">Teams</p>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="md:col-span-2 space-y-6">
            {/* Skills Section - Style Indigo Badges */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#5A8D39]" /> Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 ">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">Belum ada skill yang ditambahkan.</p>
                )}
              </div>
            </div>

            {/* Teams & Projects Section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#5A8D39]" /> Teams & Projects
              </h2>
              <div className="space-y-3">
                {teams.length > 0 ? (
                  teams.map((team: any) => (
                    <div key={team.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#5A8D39]/10 flex items-center justify-center font-bold text-[#5A8D39]">
                          {team.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{team.name}</p>
                          <p className="text-[11px] text-muted-foreground">{team.competition_name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500">
                        {team.pivot?.role || "Member"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Kamu belum bergabung dengan tim manapun.</p>
                )}
              </div>
            </div>
          </div>

          {/* --- SIDEBAR PORTFOLIO LINKS --- */}
          <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Portfolio</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-[#5A8D39] hover:bg-[#5A8D39]/10 rounded-lg"
                onClick={openEditLinksModal}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { label: "GitHub", url: profile.github_url, icon: Github },
                { label: "LinkedIn", url: profile.linkedin_url, icon: Linkedin },
                { label: "Portfolio", url: profile.portfolio_url, icon: Globe },
              ].map((link) => (
                <div key={link.label}>
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-[#5A8D39]/5 hover:border-[#5A8D39]/20 transition-all group"
                    >
                      <link.icon className="h-5 w-5 text-slate-500 group-hover:text-[#5A8D39]" />
                      <span className="flex-1 text-xs font-bold text-slate-700">{link.label}</span>
                      <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-[#5A8D39]" />
                    </a>
                  ) : (
                    <button
                      onClick={openEditLinksModal}
                      className="flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-300 p-3 text-slate-400 hover:border-[#5A8D39] hover:text-[#5A8D39] hover:bg-[#5A8D39]/5 transition-all"
                    >
                      <link.icon className="h-5 w-5 opacity-40" />
                      <span className="flex-1 text-left text-xs font-bold tracking-tight">Add {link.label}</span>
                      <PlusCircle className="h-4 w-4 opacity-40" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- POP-UP MODAL UPDATE LINKS --- */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8 border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#5A8D39]/10 text-[#5A8D39]">
                <Link2 className="h-6 w-6" />
              </div>
              Update Links
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Github className="h-3 w-3" /> GitHub URL
              </label>
              <Input
                placeholder="https://github.com/username"
                value={linksFormData.github_url}
                onChange={(e) => setLinksFormData({ ...linksFormData, github_url: e.target.value })}
                className="rounded-xl h-12 border-2 border-slate-100 focus:border-[#5A8D39] font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Linkedin className="h-3 w-3" /> LinkedIn URL
              </label>
              <Input
                placeholder="https://linkedin.com/in/username"
                value={linksFormData.linkedin_url}
                onChange={(e) => setLinksFormData({ ...linksFormData, linkedin_url: e.target.value })}
                className="rounded-xl h-12 border-2 border-slate-100 focus:border-[#5A8D39] font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Globe className="h-3 w-3" /> Personal Portfolio / Website
              </label>
              <Input
                placeholder="https://yourwebsite.com"
                value={linksFormData.portfolio_url}
                onChange={(e) => setLinksFormData({ ...linksFormData, portfolio_url: e.target.value })}
                className="rounded-xl h-12 border-2 border-slate-100 focus:border-[#5A8D39] font-medium"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:justify-end pt-2">
            <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)} className="rounded-xl font-bold text-slate-400">Cancel</Button>
            <Button
              onClick={handleSaveAllLinks}
              disabled={isSavingLink}
              className="bg-[#5A8D39] hover:bg-[#4a752f] rounded-xl px-8 font-black gap-2 shadow-lg shadow-green-100 text-white"
            >
              {isSavingLink ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save All Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}