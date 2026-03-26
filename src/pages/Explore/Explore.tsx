"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import FilterSidebar from "@/components/explore/FilterSidebar";
import CompetitionCard from "@/components/explore/CompetitionCard";
import CompetitionSkeleton from "@/components/explore/CompetitionSkeleton";

import { categories, skillsList } from "@/data/competitions";
import { useCompetitions } from "@/hooks/use-competitions";

export default function ExplorePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  const {
    search, setSearch,
    selectedCategories, selectedSkills,
    toggleCategory, toggleSkill,
    clearFilters, filtered,
    isLoading, visibleCount,
    setVisibleCount,
    activeFiltersCount
  } = useCompetitions();

  const sidebarProps = {
    categories: categories.map(c => typeof c === 'string' ? c : c.value),
    skillsList,
    selectedCategories,
    selectedSkills,
    toggleCategory,
    toggleSkill,
    clearAll: clearFilters,
  };

  return (
    <div className="min-h-screen bg-slate-50/50 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Explore Teams</h1>
          <p className="mt-2 text-lg text-slate-500 font-medium">Find the perfect team for ваour next big project.</p>
        </header>

        {/* Search & Action Bar */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search competitions, roles, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-[#5A8D39] transition-all"
            />
          </div>

          <Button
            variant={showDesktopFilters ? "default" : "outline"}
            onClick={() => setShowDesktopFilters(!showDesktopFilters)}
            className={`hidden lg:flex gap-2 h-12 px-6 rounded-2xl font-bold transition-all ${showDesktopFilters ? "bg-[#5A8D39] text-white hover:bg-[#4a752f]" : "border-slate-200 text-slate-600 bg-white"
              }`}
          >
            <Filter className={`h-4 w-4 transition-transform ${showDesktopFilters ? "rotate-180" : ""}`} />
            {showDesktopFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="lg:hidden h-12 px-5 gap-2 rounded-2xl border-slate-200 bg-white shadow-sm relative"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#5A8D39]" />
            <span className="font-bold text-slate-700 text-sm">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#5A8D39] text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex gap-8 relative">
          <AnimatePresence>
            {showDesktopFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="hidden lg:block w-72 shrink-0"
              >
                <div className="sticky top-24">
                  <FilterSidebar {...sidebarProps} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {isLoading ? "Fetching data..." : `${filtered.length} Teams Available`}
              </p>
            </div>

            <div className={`grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out ${showDesktopFilters ? "lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
              }`}>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <CompetitionSkeleton key={i} />)
              ) : (
                filtered.slice(0, visibleCount).map((team, i) => {
                  // LOGIKA MATCHING: Cek apakah tim ini butuh skill yang sedang di-filter user
                  const isAutomaticMatch = selectedSkills.length > 0 && team.skills?.some((s: string) =>
                    selectedSkills.some(sel => sel.toLowerCase() === s.toLowerCase())
                  );

                  const mappedPost = {
                    ...team,
                    isMatched: isAutomaticMatch, // Kita kirim flag ini ke Card
                    leader_initials: (team.leader && team.leader.first_name)
                      ? `${team.leader.first_name[0]}${team.leader.last_name?.[0] || ""}`.toUpperCase()
                      : null,
                  };

                  return (
                    <div key={team.id || i} className="relative">
                      {/* Label MATCH ala Glints */}
                      {isAutomaticMatch && (
                        <div className="absolute -top-2 -left-2 z-20 bg-[#5A8D39] text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg animate-bounce">
                          COCOK UNTUKMU!
                        </div>
                      )}
                      <CompetitionCard post={mappedPost} index={i} />
                    </div>
                  );
                })
              )}
            </div>

            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">No teams match your current filters.</p>
                <Button variant="ghost" onClick={clearFilters} className="mt-4 text-[#5A8D39] font-bold">Clear all filters</Button>
              </div>
            )}

            {!isLoading && visibleCount < filtered.length && (
              <div className="mt-16 text-center">
                <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 6)} className="rounded-2xl px-12 h-12 font-bold border-slate-200">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[2.5rem] bg-white p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />
                <button onClick={() => setShowFilters(false)} className="absolute right-6 top-6 p-2 rounded-full bg-slate-50 text-slate-400"><X className="h-5 w-5" /></button>
              </div>
              <FilterSidebar {...sidebarProps} isMobile={true} />
              <div className="mt-8">
                <Button className="w-full h-14 rounded-2xl bg-[#5A8D39] text-white font-bold" onClick={() => setShowFilters(false)}>
                  Show {filtered.length} Teams
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}