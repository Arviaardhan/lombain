"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Users, Filter } from "lucide-react";
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
import { cn } from "@/lib/utils";

export default function DiscoverTalentPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [inviteUser, setInviteUser] = useState<Talent | null>(null);

  const {
    search,
    setSearch,
    selectedMajors,
    setSelectedMajors,
    selectedInstitutions,
    setSelectedInstitutions,
    selectedSkills,
    setSelectedSkills,
    toggleFilter,
    filtered,
    isLoading,
    visibleCount,
    setVisibleCount,
    activeFilterCount,
  } = useTalents();

  const filterProps = {
    selectedMajors,
    setSelectedMajors,
    selectedInstitutions,
    setSelectedInstitutions,
    selectedSkills,
    setSelectedSkills,
    toggleFilter,
    activeFilterCount,
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-slate-50/30">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Cari Bakat</h1>
        <p className="text-lg text-slate-600 mt-2">
          Temukan rekan setim hebat untuk kolaborasi lombamu di AlmamaterConnect.
        </p>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Cari nama, jurusan, atau keahlian..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-[#5A8D39] transition-all"
          />
        </div>

        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="hidden lg:flex gap-2 h-12 px-6 rounded-xl font-bold bg-[#5A8D39] hover:bg-[#4a752f] text-white transition-all shadow-md shadow-green-100/50"
        >
          <Filter className="h-4 w-4" /> Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-white text-[#5A8D39] rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-black">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden h-12 px-5 gap-2 rounded-2xl border-slate-200 bg-white shadow-sm active:scale-95 transition-all"
        >
          <SlidersHorizontal className="h-4 w-4 text-[#5A8D39]" />
          <span className="font-bold text-slate-700">Filter</span>
          {activeFilterCount > 0 && (
            <Badge className="bg-[#5A8D39] text-white rounded-full px-1.5 h-5 min-w-5 flex items-center justify-center text-[10px] font-black">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex gap-8 items-start">
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="hidden w-64 shrink-0 lg:block"
            >
              <div className="sticky top-24">
                <TalentFilterSidebar {...filterProps} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {isLoading ? "Mencari bakat..." : `${filtered.length} Talent Ditemukan`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "grid gap-6 transition-all duration-500",
                  showFilters
                    ? "sm:grid-cols-2 xl:grid-cols-3"
                    : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {Array.from({ length: showFilters ? 6 : 8 }).map((_, i) => (
                  <TalentSkeleton key={i} />
                ))}
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-20 text-center shadow-sm"
              >
                <Users className="h-16 w-16 mx-auto text-slate-200 mb-4" />
                <p className="text-xl font-bold text-slate-900">Talent tidak ditemukan</p>
                <p className="text-slate-500 mt-1">Coba sesuaikan filter atau kata kunci pencarianmu.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "grid gap-6 transition-all duration-500",
                  showFilters
                    ? "sm:grid-cols-2 xl:grid-cols-3"
                    : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {filtered.slice(0, visibleCount).map((user) => (
                  <TalentCard
                    key={user.id}
                    user={user}
                    onInvite={() => setInviteUser(user)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {visibleCount < filtered.length && !isLoading && (
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((v) => v + 6)}
                className="px-12 rounded-xl font-bold border-slate-200 hover:bg-[#5A8D39] hover:text-white transition-all shadow-md active:scale-95"
              >
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.y > 150) setShowMobileFilters(false);
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[3rem] border-t border-slate-100 bg-white p-8 pb-14 shadow-2xl touch-none"
            >
              <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-slate-200" />

              <div className="mb-8 text-center">
                <h3 className="text-2xl font-black text-slate-900">Filter Bakat</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Geser ke bawah untuk menutup
                </p>
              </div>

              <div className="space-y-8">
                <TalentFilterSidebar {...filterProps} isMobile />
              </div>

              <div className="mt-12 text-center py-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  AlmamaterConnect &bull; 2026
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <InviteToTeamModal
        open={!!inviteUser}
        onOpenChange={(open) => !open && setInviteUser(null)}
        targetUser={inviteUser}
      />
    </div>
  );
}