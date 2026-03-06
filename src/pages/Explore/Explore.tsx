"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(true);

  const {
    search,
    setSearch,
    selectedCategories,
    selectedSkills,
    toggleCategory,
    toggleSkill,
    clearFilters,
    filtered,
    isLoading,
    visibleCount,
    setVisibleCount,
    activeFiltersCount,
  } = useCompetitions();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Explore Teams</h1>
          <p className="mt-2 text-lg text-muted-foreground">Find the perfect team for your next competition</p>
        </header>

        {/* Search Bar Row */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search competitions, skills, teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-xl border-border bg-card shadow-sm focus:ring-primary"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2 h-12 px-6 rounded-xl font-bold transition-all"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 bg-primary text-white rounded-full px-1.5 text-[10px]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filter */}
          {showFilters && (
            <FilterSidebar
              categories={categories}
              skillsList={skillsList}
              selectedCategories={selectedCategories}
              selectedSkills={selectedSkills}
              toggleCategory={toggleCategory}
              toggleSkill={toggleSkill}
              clearAll={clearFilters}
            />
          )}

          {/* Main List Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                {isLoading ? "Searching teams..." : `${filtered.length} Teams Available`}
              </p>
            </div>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <CompetitionSkeleton key={i} />
                  ))}
                </motion.div>
              ) : filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border-2 border-dashed border-muted/20 bg-card p-20 text-center shadow-sm"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-16 w-16 text-muted-foreground/30" />
                    <div className="mt-6 space-y-2">
                      <p className="text-xl font-bold">No teams match your criteria</p>
                      <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                  {filtered.slice(0, visibleCount).map((post, i) => (
                    <CompetitionCard key={post.id} post={post} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLoading && visibleCount < filtered.length && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className="rounded-xl px-12 font-bold hover:bg-primary hover:text-white transition-all shadow-md"
                >
                  Load More Teams
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}