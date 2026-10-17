import React, { useMemo, useState } from 'react';

const BAR_COLORS = ['#E94B6F', '#2D3E7A', '#F59E0B', '#10B981', '#6366F1', '#8B5CF6'];

function dateKey(value) {
    if (!value) return null;
    const d = new Date(value);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function BarChart({ data, labels, colors, title }) {
    const maxVal = Math.max(...data.map((d) => d.value), 1);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
            {title && <h3 className="text-base font-bold text-[#2D3E7A] mb-4">{title}</h3>}
            <div className="flex items-end justify-between gap-3 h-40">
                {data.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <div
                            className="w-full rounded-t-lg transition-all hover:opacity-80"
                            style={{
                                height: `${(item.value / maxVal) * 100}%`,
                                minHeight: item.value > 0 ? '8px' : '4px',
                                backgroundColor: colors[i % colors.length],
                            }}
                        />
                        <span className="text-[10px] text-gray-500 font-medium">{labels[i] || ''}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                        <span
                            className="w-2.5 h-2.5 rounded-sm"
                            style={{ backgroundColor: colors[i % colors.length] }}
                        />
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-bold text-gray-800">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PieChart({ data, title }) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = -90;

    const paths = data.map((item, i) => {
        const percentage = total > 0 ? item.value / total : 0;
        const angle = percentage * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const cx = 80, cy = 80, r = 60;

        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;

        const d = percentage === 1
            ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
            : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        return { d, color: BAR_COLORS[i % BAR_COLORS.length], item };
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
            {title && <h3 className="text-base font-bold text-[#2D3E7A] mb-4">{title}</h3>}
            <div className="flex items-center justify-center">
                <svg width={160} height={160} viewBox="0 0 160 160">
                    {paths.map((p, i) => (
                        <path key={i} d={p.d} fill={p.color} stroke="#fff" strokeWidth={2} />
                    ))}
                    <circle cx={80} cy={80} r={35} fill="white" />
                    <text x={80} y={76} textAnchor="middle" className="text-xl font-bold fill-[#2D3E7A]">
                        {total}
                    </text>
                    <text x={80} y={92} textAnchor="middle" className="text-[10px] fill-gray-500">
                        Total
                    </text>
                </svg>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                        <span
                            className="w-2.5 h-2.5 rounded-sm"
                            style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }}
                        />
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-bold text-gray-800">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({ label, value, suffix, color = '#2D3E7A', icon }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-5 flex items-center gap-4">
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
            >
                {icon || (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={color}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                )}
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="text-2xl font-bold" style={{ color }}>
                    {value}
                    {suffix && <span className="text-sm font-medium text-gray-400 ml-1">{suffix}</span>}
                </p>
            </div>
        </div>
    );
}

export default function Reports({ tasks = [], categories = [], onOpenSidebar }) {
    const [dateRange, setDateRange] = useState('week'); // 'week' | 'month' | 'all'

    const stats = useMemo(() => {
        const now = new Date();
        const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const filtered = tasks.filter((t) => {
            if (dateRange === 'all') return true;
            const created = t.created_at ? new Date(t.created_at) : null;
            if (!created) return false;
            const start = dateRange === 'week' ? weekStart : monthStart;
            return created >= start;
        });

        const total = filtered.length;
        const completed = filtered.filter((t) => t.status === 'completed').length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        // By category
        const byCategory = {};
        filtered.forEach((t) => {
            const catId = t.category_id ?? t.category?.id ?? 'none';
            const catName = t.category?.name || 'Uncategorized';
            const key = String(catId);
            byCategory[key] = byCategory[key] || { label: catName, value: 0 };
            byCategory[key].value += 1;
        });
        const categoryData = Object.values(byCategory).sort((a, b) => b.value - a.value);

        // By priority
        const byPriority = [
            { label: 'High', value: filtered.filter((t) => t.priority === 'high').length },
            { label: 'Medium', value: filtered.filter((t) => t.priority === 'medium').length },
            { label: 'Low', value: filtered.filter((t) => t.priority === 'low').length },
        ];

        // Weekly trend (last 7 days)
        const weekLabels = [];
        const weekData = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            weekLabels.push(d.toLocaleDateString('id-ID', { weekday: 'short' }));
            const key = dateKey(d);
            const count = tasks.filter((t) => dateKey(t.due_date) === key).length;
            weekData.push({ label: key, value: count });
        }

        // Completion trend (last 7 days)
        const completionTrend = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            const key = dateKey(d);
            const count = tasks.filter((t) => t.status === 'completed' && dateKey(t.completed_at) === key).length;
            completionTrend.push({ label: key, value: count });
        }

        return {
            total,
            completed,
            pending,
            completionRate,
            categoryData,
            byPriority,
            weekLabels,
            weekData,
            completionTrend,
        };
    }, [tasks, dateRange]);

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onOpenSidebar}
                            className="md:hidden p-2 rounded-xl bg-white border border-pink-100 text-[#2D3E7A] hover:bg-gray-50 shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-medium mb-0.5">
                                Analytics
                            </p>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#2D3E7A]">Reports</h1>
                        </div>
                    </div>

                    {/* Date Range Selector */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#E94B6F]"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="all">All Time</option>
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        label="Total Tasks"
                        value={stats.total}
                        color="#2D3E7A"
                    />
                    <StatCard
                        label="Completed"
                        value={stats.completed}
                        color="#10B981"
                    />
                    <StatCard
                        label="Pending"
                        value={stats.pending}
                        color="#F59E0B"
                    />
                    <StatCard
                        label="Completion Rate"
                        value={stats.completionRate}
                        suffix="%"
                        color="#E94B6F"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Weekly Tasks Chart */}
                    <BarChart
                        data={stats.weekData}
                        labels={stats.weekLabels}
                        colors={BAR_COLORS}
                        title="Tasks Due (Last 7 Days)"
                    />

                    {/* Completion Trend */}
                    <BarChart
                        data={stats.completionTrend}
                        labels={stats.weekLabels}
                        colors={['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#022C22', '#01D9A5']}
                        title="Tasks Completed (Last 7 Days)"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* By Category */}
                    {stats.categoryData.length > 0 && (
                        <PieChart
                            data={stats.categoryData.slice(0, 6)}
                            title="Tasks by Category"
                        />
                    )}

                    {/* By Priority */}
                    <PieChart
                        data={stats.byPriority}
                        title="Tasks by Priority"
                    />
                </div>
            </div>
        </div>
    );
}
