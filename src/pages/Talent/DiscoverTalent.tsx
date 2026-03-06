"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

import TalentCard from "@/components/talents/TalentCard";
import TalentSkeleton from "@/components/talents/TalentSkeleton";
import TalentFilterSidebar from "@/components/talents/TalentFilterSidebar";
import InviteToTeamModal from "@/components/InviteToTeamModal";

import { useTalents } from "@/hooks/use-talents";
import { Talent } from "@/types/talent";

export default function DiscoverTalentPage() {
  const {
    search, setSearch,
    selectedMajors, setSelectedMajors,
    selectedInstitutions, setSelectedInstitutions,
    selectedSkills, setSelectedSkills,
    toggleFilter, filtered, isLoading,
    visibleCount, setVisibleCount, activeFilterCount
  } = useTalents();

  const [inviteUser, setInviteUser] = useState<Talent | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Cari Bakat</h1>
        <p className="text-lg text-muted-foreground mt-2">Temukan rekan setim hebat untuk kolaborasi lombamu.</p>
      </div>

      {/* Search & Filter Trigger */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau keahlian..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl shadow-sm"
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filter dengan Checkbox Lingkaran */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <TalentFilterSidebar
            selectedMajors={selectedMajors}
            setSelectedMajors={setSelectedMajors}
            selectedInstitutions={selectedInstitutions}
            setSelectedInstitutions={setSelectedInstitutions}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            toggleFilter={toggleFilter}
            activeFilterCount={activeFilterCount}
          />
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              {isLoading ? "Mencari..." : `${filtered.length} Talent Ditemukan`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <TalentSkeleton key={i} />)}
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="rounded-3xl border-2 border-dashed border-muted-foreground/15 p-20 text-center">
                <Users className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-xl font-bold">Talent tidak ditemukan</p>
                <p className="text-muted-foreground">Coba sesuaikan filter atau kata kunci pencarianmu.</p>
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, visibleCount).map((user, i) => (
                  <TalentCard
                    user={user}
                    onInvite={() => setInviteUser(user)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {visibleCount < filtered.length && !isLoading && (
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" onClick={() => setVisibleCount(v => v + 6)} className="px-12 rounded-xl font-bold">
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </div>
      </div>

      <InviteToTeamModal
        open={!!inviteUser}
        onOpenChange={(open) => !open && setInviteUser(null)}
        targetUser={inviteUser}
      />
    </div>
  );
}