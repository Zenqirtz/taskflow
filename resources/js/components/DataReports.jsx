import React, { useMemo } from 'react';
import ProgressRing from './ProgressRing';

const BAR_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

/**
 * Normalize a due_date to a YYYY-MM-DD key in local time.
 *
 * @param {string|null} value
 * @returns {string|null}
 */
function dateKey(value) {
    if (!value) return null;
    const d = new Date(value);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${y}-${m}-${day}`;
}

function ActivityGraph({ points }) {
    const w = 300;
    const h = 80;
    const max = Math.max(...points, 1);
    const step = points.length > 1 ? w / (points.length - 1) : w;

    const path = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * h}`)
        .join(' ');
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
            <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E94B6F" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#E94B6F" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area} fill="url(#areaFill)" />
            <path d={path} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function DataReports({ tasks = [] }) {
    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter((t) => t.status === 'completed').length;
        const pending = total - completed;
        const completePct = total > 0 ? Math.round((completed / total) * 100) : 0;

        // On-time: completed tasks whose completed_at <= due_date
        const completedTasks = tasks.filter((t) => t.status === 'completed' && t.completed_at);
        const onTime = completedTasks.filter((t) => {
            if (!t.due_date) return true;
            return new Date(t.completed_at).getTime() <= new Date(t.due_date).getTime();
        }).length;
        const onTimePct = completedTasks.length > 0
            ? Math.round((onTime / completedTasks.length) * 100)
            : 0;

        // Weekly bars (current week Sun -> Sat): tasks due each day
        const today = new Date();
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const weekly = Array.from({ length: 7 }, () => 0);
        tasks.forEach((t) => {
            const key = dateKey(t.due_date);
            if (!key) return;
            for (let i = 0; i < 7; i++) {
                const d = new Date(weekStart);
                d.setDate(weekStart.getDate() + i);
                if (dateKey(d) === key) {
                    weekly[i] += 1;
                }
            }
        });

        // Last 10 days activity (tasks due each day)
        const activity = Array.from({ length: 10 }, (_, i) => {
            const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (9 - i));
            const key = dateKey(d);
            return tasks.filter((t) => dateKey(t.due_date) === key).length;
        });

        return { total, completed, pending, completePct, onTime, onTimePct, weekly, activity };
    }, [tasks]);

    const maxWeekly = Math.max(...stats.weekly, 1);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#2D3E7A]">Data Report</h2>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {/* All Activity */}
                <div className="bg-[#FFF9F0] rounded-2xl p-4 flex flex-col justify-between">
                    <p className="text-xs font-medium text-gray-500 mb-2">All Activity</p>
                    <svg viewBox="0 0 100 40" className="w-full h-10" preserveAspectRatio="none">
                        <path d="M0 30 Q 15 10, 25 22 T 50 18 T 75 26 T 100 15" fill="none" stroke="#E94B6F" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p className="text-2xl font-bold text-[#2D3E7A] mt-2">
                        {stats.total}
                        <span className="text-xs font-medium text-gray-400 ml-1">Tasks</span>
                    </p>
                </div>

                {/* Complete */}
                <div className="bg-[#E94B6F] rounded-2xl p-4 flex flex-col items-center justify-center text-white">
                    <p className="text-xs font-medium mb-2 self-start">Complete</p>
                    <ProgressRing
                        value={stats.completePct}
                        label={`${stats.completed}/${stats.total}`}
                        size={72}
                        stroke={7}
                        color="#FFFFFF"
                        track="rgba(255,255,255,0.35)"
                    />
                </div>

                {/* Pending */}
                <div className="bg-[#FFD1E0] rounded-2xl p-4 flex flex-col items-center justify-center text-[#E94B6F]">
                    <p className="text-xs font-medium mb-2 self-start">Pending</p>
                    <ProgressRing
                        value={stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}
                        label={`${stats.pending}/${stats.total}`}
                        size={72}
                        stroke={7}
                        color="#E94B6F"
                        track="rgba(233,75,111,0.25)"
                    />
                </div>

                {/* On Time */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                    <p className="text-xs font-medium text-gray-500 mb-3">This Week</p>
                    <div className="flex items-end justify-between gap-1.5 h-14">
                        {stats.weekly.map((v, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                <div
                                    className={`w-full rounded-md ${v === maxWeekly && v > 0 ? 'bg-[#E94B6F]' : 'bg-[#2D3E7A]'}`}
                                    style={{ height: `${(v / maxWeekly) * 100}%`, minHeight: v > 0 ? '4px' : '2px' }}
                                />
                                <span className="text-[9px] text-gray-400">{BAR_LABELS[i]}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-2xl font-bold text-[#2D3E7A] mt-2">
                        {stats.onTimePct}%
                        <span className="text-xs font-medium text-gray-400 ml-1">On Time</span>
                    </p>
                </div>

                {/* Results Activity */}
                <div className="bg-[#2D3E7A] rounded-2xl p-4 text-white col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-medium">Results Activity</p>
                        <span className="text-xs opacity-70 flex items-center gap-1">
                            Last 10 Days
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>
                    <ActivityGraph points={stats.activity} />
                </div>
            </div>
        </div>
    );
}
