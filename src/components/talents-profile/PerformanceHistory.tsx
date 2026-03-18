import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, MousePointerClick, Award, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Competition {
  name: string;
  team: string;
  result: "Winner" | "Runner-Up" | "Finalist" | "Participant";
}

interface MonthData {
  month: string;
  year: number;
  participations: number;
  wins: number;
  competitions: Competition[];
}

interface PerformanceHistoryProps {
  performance: MonthData[];
}

const OLIVE = "#5A8D39";

function getBarOpacity(wins: number, maxWins: number) {
  if (maxWins === 0) return 0.25;
  const ratio = wins / maxWins;
  return 0.25 + ratio * 0.75;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: MonthData }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-[#1e293b] px-3.5 py-2.5 text-xs shadow-xl border border-[#334155]">
      <p className="font-semibold text-white mb-1.5">
        {d.month} {d.year}
      </p>
      <p className="text-slate-300">
        Participations:{" "}
        <span className="text-white font-medium">{d.participations}</span>
      </p>
      <p className="text-slate-300">
        Wins:{" "}
        <span className="font-medium" style={{ color: OLIVE }}>
          {d.wins}
        </span>
      </p>
      <p className="text-slate-400 mt-1.5 flex items-center gap-1">
        <MousePointerClick className="h-3 w-3" /> Click for details
      </p>
    </div>
  );
}

function getResultBadgeClass(result: Competition["result"]) {
  switch (result) {
    case "Winner":
      return "bg-lime text-lime-foreground border-0 font-bold text-xs";
    case "Runner-Up":
      return "bg-warning/15 text-warning border-warning/30 text-xs";
    case "Finalist":
      return "bg-secondary/15 text-secondary border-secondary/30 text-xs";
    default:
      return "text-xs";
  }
}

function getResultVariant(
  result: Competition["result"],
): "default" | "outline" {
  return result === "Participant" ? "outline" : "default";
}

const legendShades = [0.2, 0.4, 0.6, 0.8, 1.0];

export default function PerformanceHistory({
  performance,
}: {
  performance: MonthData[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const maxWins = Math.max(...performance.map((d) => d.wins));
  const selectedMonth =
    selectedIndex !== null ? performance[selectedIndex] : null;

  const handleBarClick = (_: unknown, index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Card className="rounded-2xl shadow-md border border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Performance History
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Activity from Aug 2024 to Mar 2026
        </p>

        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performance} barCategoryGap="18%">
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
              />
              <Bar
                dataKey="participations"
                radius={[4, 4, 0, 0]}
                className="cursor-pointer"
                onClick={handleBarClick}
              >
                {performance.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={OLIVE}
                    fillOpacity={
                      selectedIndex === i
                        ? 1
                        : getBarOpacity(entry.wins, maxWins)
                    }
                    stroke={selectedIndex === i ? OLIVE : "none"}
                    strokeWidth={selectedIndex === i ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-4">
          <span className="text-[10px] text-muted-foreground mr-1">
            Less Wins
          </span>
          {legendShades.map((opacity, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: OLIVE, opacity }}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">
            More Wins
          </span>
        </div>

        {/* Drill-down details */}
        <div className="mt-5 border-t border-border pt-4">
          <AnimatePresence mode="wait">
            {selectedMonth ? (
              <motion.div
                key={`${selectedMonth.month}-${selectedMonth.year}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {selectedMonth.month} {selectedMonth.year} —{" "}
                    {selectedMonth.competitions.length} competitions
                  </h3>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedMonth.competitions.map((comp, i) => (
                    <motion.div
                      key={comp.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${comp.result === "Winner" ? "bg-lime/15" : "bg-muted"}`}
                        >
                          {comp.result === "Winner" ? (
                            <Trophy className="h-4 w-4 text-lime" />
                          ) : (
                            <Award className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {comp.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {comp.team}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={getResultVariant(comp.result)}
                        className={getResultBadgeClass(comp.result)}
                      >
                        {comp.result === "Winner" && (
                          <Award className="h-3 w-3 mr-1" />
                        )}
                        {comp.result}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2 py-2"
              >
                <MousePointerClick className="h-4 w-4" />
                Click a bar to see monthly details
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
