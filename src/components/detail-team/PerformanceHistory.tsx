"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, MousePointerClick, Award, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OLIVE = "#5A8D39";
const legendShades = [0.2, 0.4, 0.6, 0.8, 1.0];

// --- Data Lengkap (2024 - 2026) ---
const monthlyData = [
    // Tahun 2024
    { month: "Aug 2024", label: "Aug", participations: 2, wins: 0, competitions: [{ name: "Summer Code Jam", team: "ByteForce", result: "Participant" }] },
    { month: "Sep 2024", label: "Sep", participations: 3, wins: 1, competitions: [{ name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" }] },
    { month: "Oct 2024", label: "Oct", participations: 6, wins: 3, competitions: [{ name: "Gemastik XVI", team: "ByteForce", result: "Winner" }, { name: "UI/UX Sprint", team: "PixelCraft", result: "Finalist" }] },
    { month: "Nov 2024", label: "Nov", participations: 4, wins: 2, competitions: [{ name: "DevFest Jakarta", team: "ByteForce", result: "Winner" }] },
    { month: "Dec 2024", label: "Dec", participations: 1, wins: 0, competitions: [{ name: "Year-End Hack", team: "ByteForce", result: "Participant" }] },
    // Tahun 2025 (Full)
    { month: "Jan 2025", label: "Jan", participations: 3, wins: 1, competitions: [{ name: "New Year Code", team: "ByteForce", result: "Winner" }] },
    { month: "Feb 2025", label: "Feb", participations: 2, wins: 1, competitions: [{ name: "Valentine Design", team: "PixelCraft", result: "Winner" }] },
    { month: "Mar 2025", label: "Mar", participations: 5, wins: 2, competitions: [{ name: "Campus Challenge", team: "ByteForce", result: "Winner" }] },
    { month: "Apr 2025", label: "Apr", participations: 4, wins: 2, competitions: [{ name: "Enterprise Hack", team: "ByteForce", result: "Winner" }] },
    { month: "May 2025", label: "May", participations: 3, wins: 1, competitions: [{ name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" }] },
    { month: "Jun 2025", label: "Jun", participations: 2, wins: 0, competitions: [{ name: "Mid-Year Code", team: "ByteForce", result: "Finalist" }] },
    { month: "Jul 2025", label: "Jul", participations: 1, wins: 0, competitions: [{ name: "Summer Hack", team: "ByteForce", result: "Participant" }] },
    { month: "Aug 2025", label: "Aug", participations: 3, wins: 1, competitions: [{ name: "Independence Hack", team: "ByteForce", result: "Winner" }] },
    { month: "Sep 2025", label: "Sep", participations: 5, wins: 3, competitions: [{ name: "Compfest XVI", team: "ByteForce", result: "Winner" }] },
    { month: "Oct 2025", label: "Oct", participations: 7, wins: 4, competitions: [{ name: "Gemastik XVII", team: "ByteForce", result: "Winner" }, { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" }] },
    { month: "Nov 2025", label: "Nov", participations: 4, wins: 2, competitions: [{ name: "BizIT Challenge", team: "ByteForce", result: "Winner" }] },
    { month: "Dec 2025", label: "Dec", participations: 2, wins: 1, competitions: [{ name: "Year-End Showcase", team: "ByteForce", result: "Winner" }] },
    // Tahun 2026 (Jan - Mar)
    { month: "Jan 2026", label: "Jan", participations: 3, wins: 1, competitions: [{ name: "NY Innovation", team: "ByteForce", result: "Winner" }] },
    { month: "Feb 2026", label: "Feb", participations: 4, wins: 2, competitions: [{ name: "Valentine Jam", team: "PixelCraft", result: "Winner" }] },
    {
        month: "Mar 2026", label: "Mar", participations: 5, wins: 3, competitions: [
            { name: "Hackathon UI/UX 2026", team: "PixelCraft", result: "Winner" },
            { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
            { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
        ]
    },
];

// -- Helpers --
function getBarOpacity(wins: number, maxWins: number) {
    return 0.25 + (wins / (maxWins || 1)) * 0.75;
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="rounded-xl bg-[#1e293b] px-3.5 py-2.5 text-[11px] shadow-2xl border border-white/10 text-white outline-none">
            <p className="font-bold mb-1.5 tracking-tight">{d.month}</p>
            <p className="text-slate-300">Participations: <span className="text-white font-bold">{d.participations}</span></p>
            <p className="text-slate-300">Wins: <span className="font-black text-[#ABC123]">{d.wins}</span></p>
            <p className="text-slate-400 mt-2 flex items-center gap-1.5 text-[10px] font-medium border-t border-white/5 pt-1.5">
                <MousePointerClick className="h-3 w-3" /> Click for details
            </p>
        </div>
    );
}

export default function PerformanceHistory() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(19); // Default Mar 2026
    const maxWins = Math.max(...monthlyData.map(d => d.wins));
    const selectedMonth = selectedIndex !== null ? monthlyData[selectedIndex] : null;

    return (
        <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden select-none">
            <CardContent className="p-6">
                {/* Style Hard Kill untuk Focus Border */}
                <style jsx global>{`
          .recharts-wrapper focus, .recharts-surface focus, .recharts-rectangle focus {
            outline: none !important;
          }
          path.recharts-rectangle {
            outline: none !important;
            -webkit-tap-highlight-color: transparent;
          }
        `}</style>

                <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-[#5A8D39]" />
                    <h2 className="text-[15px] font-bold text-slate-800 tracking-tight">Performance History</h2>
                </div>
                <p className="text-[10px] text-slate-400 mb-8 font-black uppercase tracking-[0.2em]">ACTIVITY LOG 2024 - 2026</p>

                {/* 1. Bar Chart Area */}
                <div className="w-full h-44">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={monthlyData}
                            barCategoryGap="12%"
                            accessibilityLayer={false}
                            style={{ outline: 'none' }}
                        >
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 9, fontWeight: 800, fill: '#cbd5e1' }}
                                interval={2}
                            />
                            <YAxis hide />
                            <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                            <Bar
                                dataKey="participations"
                                radius={[4, 4, 0, 0]}
                                className="cursor-pointer outline-none"
                                onClick={(_, i) => setSelectedIndex(i)}
                                tabIndex={-1}
                            >
                                {monthlyData.map((entry, i) => (
                                    <Cell
                                        key={i}
                                        fill={OLIVE}
                                        fillOpacity={selectedIndex === i ? 1 : getBarOpacity(entry.wins, maxWins)}
                                        className="transition-all duration-300 outline-none"
                                        style={{ outline: 'none' }}
                                        tabIndex={-1}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 2. Legend Section (Shades) */}
                <div className="flex items-center justify-end gap-1.5 mt-4">
                    <span className="text-[10px] font-bold text-slate-400 mr-1 uppercase">Less Wins</span>
                    {legendShades.map((opacity, i) => (
                        <div key={i} className="h-3 w-3 rounded-xl shadow-sm" style={{ backgroundColor: OLIVE, opacity }} />
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">More Wins</span>
                </div>

                {/* 3. Detail Drill-down Section */}
                <div className="mt-8 border-t border-slate-50 pt-6">
                    <AnimatePresence mode="wait">
                        {selectedMonth && selectedMonth.competitions.length > 0 ? (
                            <motion.div
                                key={selectedMonth.month}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    {/* Label Kiri */}
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                        Monthly Details: {selectedMonth.month}
                                    </h3>

                                    {/* Tombol Clear di Kanan */}
                                    <button
                                        onClick={() => setSelectedIndex(null)}
                                        className="text-[10px] font-black text-slate-400 hover:text-[#5A8D39] transition-colors uppercase tracking-wider cursor-pointer"
                                    >
                                        Clear Selection
                                    </button>
                                </div>
                                <div className="grid gap-2.5">
                                    {selectedMonth.competitions.map((comp, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-sm transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${comp.result === "Winner" ? "bg-[#5A8D39]/10 text-[#5A8D39]" : "bg-slate-100 text-slate-400"}`}>
                                                    {comp.result === "Winner" ? <Trophy className="h-4.5 w-4.5" /> : <Award className="h-4.5 w-4.5" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[13px] font-bold text-slate-800 leading-none truncate">{comp.name}</p>
                                                    <p className="text-[11px] text-slate-500 mt-2 font-medium">{comp.team}</p>
                                                </div>
                                            </div>
                                            <Badge className={`text-[11px] font-black h-6 border-0 rounded-full px-3 ${comp.result === "Winner" ? "bg-[#5A8D39] text-white" : "bg-slate-100 text-slate-500"
                                                }`}>
                                                {comp.result}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.p
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2.5 py-5"
                            >
                                <MousePointerClick className="h-4 w-4 text-slate-500" />
                                Click a bar to see monthly details
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}