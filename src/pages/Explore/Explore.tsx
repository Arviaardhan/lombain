"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal, X, Clock, Users, Eye, MapPin, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import FilterSidebar from "@/components/explore/FilterSidebar";
import CompetitionCard from "@/components/explore/CompetitionCard";
import CompetitionSkeleton from "@/components/explore/CompetitionSkeleton";

import { categories, skillsList } from "@/data/competitions";
import { useCompetitions } from "@/hooks/use-competitions";

export default function ExplorePage() {
  // 1. Kita set default false agar filter mobile tidak langsung terbuka
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  const {
    search, setSearch,
    selectedCategories, selectedSkills,
    toggleCategory, toggleSkill,
    clearFilters, filtered,
    isLoading, visibleCount,
    setVisibleCount, activeFiltersCount,
  } = useCompetitions();

  const sidebarProps = {
    categories,
    skillsList,
    selectedCategories,
    selectedSkills,
    toggleCategory,
    toggleSkill,
    clearAll: clearFilters,
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Explore Teams</h1>
          <p className="mt-2 text-lg text-slate-600">Find the perfect team for your next competition</p>
        </header>

        {/* Search Bar Row */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search competitions, skills, teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-[#5A8D39]"
            />
          </div>

          {/* Tombol Filter Desktop */}
          <Button
            variant={showDesktopFilters ? "default" : "outline"}
            onClick={() => setShowDesktopFilters(!showDesktopFilters)}
            className="hidden lg:flex gap-2 h-12 px-6 rounded-xl font-bold bg-[#5A8D39] hover:bg-[#4a752f] text-white"
          >
            <Filter className="h-4 w-4" /> Filters
          </Button>

          {/* Tombol Filter Mobile - Sekarang memicu state showFilters */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="lg:hidden h-12 px-5 gap-2 rounded-2xl border-slate-200 bg-white shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#5A8D39]" />
            <span className="font-bold text-slate-700">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge className="bg-[#5A8D39] text-white rounded-full px-1.5 h-5 min-w-5 flex items-center justify-center text-[10px] font-black">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          {showDesktopFilters && (
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <FilterSidebar {...sidebarProps} />
              </div>
            </div>
          )}

          {/* AREA UTAMA (LIST TIM) */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                {isLoading ? "Searching teams..." : `${filtered.length} Teams Available`}
              </p>
            </div>

            {/* LOGIKA LIST YANG TADI HILANG */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <CompetitionSkeleton key={i} />)
              ) : filtered.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed">
                   <Search className="mx-auto h-12 w-12 text-slate-300" />
                   <p className="mt-4 text-xl font-bold">No teams found</p>
                </div>
              ) : (
                filtered.slice(0, visibleCount).map((post, i) => (
                  <CompetitionCard key={post.id} post={post} index={i} />
                ))
              )}
            </div>

            {!isLoading && visibleCount < filtered.length && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="rounded-xl px-12 font-bold"
                >
                  Load More Teams
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY (Diletakkan di luar agar tidak mengganggu list) */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => { if (info.offset.y > 150) setShowFilters(false); }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[3rem] border-t border-slate-100 bg-white p-8 pb-12 shadow-2xl"
            >
              <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-slate-200" />
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-black text-slate-900">Filters</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Tarik ke bawah untuk kembali</p>
              </div>
              <div className="space-y-8">
                <FilterSidebar {...sidebarProps} isMobile />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}