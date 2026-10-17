import React, { useState, useEffect, useRef } from 'react';

const MODES = {
    focus: { label: 'Focus', minutes: 25, color: '#E94B6F' },
    short: { label: 'Short Break', minutes: 5, color: '#10B981' },
    long: { label: 'Long Break', minutes: 15, color: '#6366F1' },
};

export default function Timer({ tasks = [], onOpenSidebar }) {
    const [mode, setMode] = useState('focus');
    const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [completedSessions, setCompletedSessions] = useState(0);

    const intervalRef = useRef(null);

    const totalSeconds = MODES[mode].minutes * 60;
    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

    // Switch mode
    function switchMode(newMode) {
        setIsRunning(false);
        setMode(newMode);
        setSecondsLeft(MODES[newMode].minutes * 60);
    }

    // Countdown tick
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        if (mode === 'focus') {
                            setCompletedSessions((s) => s + 1);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, mode]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    function resetTimer() {
        setIsRunning(false);
        setSecondsLeft(MODES[mode].minutes * 60);
    }

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
                {/* Top bar with mobile hamburger */}
                <div className="w-full flex items-center justify-between mb-6">
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
                                Productivity
                            </p>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#2D3E7A]">Focus Timer</h1>
                        </div>
                    </div>

                    <div className="bg-white px-3.5 py-1.5 rounded-xl border border-pink-100 shadow-sm flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E94B6F]" />
                        <span className="text-xs font-bold text-[#2D3E7A]">
                            {completedSessions} {completedSessions === 1 ? 'Session' : 'Sessions'}
                        </span>
                    </div>
                </div>

                {/* Mode Selector */}
                <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-pink-50 flex gap-1 mb-8">
                    {Object.entries(MODES).map(([key, config]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => switchMode(key)}
                            style={mode === key ? { backgroundColor: config.color } : {}}
                            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                mode === key
                                    ? 'text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {config.label}
                        </button>
                    ))}
                </div>

                {/* Circular Timer Display */}
                <div className="relative my-4 flex items-center justify-center">
                    <svg width={280} height={280} className="-rotate-90">
                        {/* Background track */}
                        <circle
                            cx={140}
                            cy={140}
                            r={radius}
                            fill="none"
                            stroke="#FFE6F0"
                            strokeWidth={14}
                        />
                        {/* Progress stroke */}
                        <circle
                            cx={140}
                            cy={140}
                            r={radius}
                            fill="none"
                            stroke={MODES[mode].color}
                            strokeWidth={14}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 500ms ease' }}
                        />
                    </svg>

                    <div className="absolute flex flex-col items-center">
                        <span className="text-5xl font-black text-[#2D3E7A] tracking-tight font-mono">
                            {timeFormatted}
                        </span>
                        <span
                            className="mt-2 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-white"
                            style={{ backgroundColor: MODES[mode].color }}
                        >
                            {MODES[mode].label}
                        </span>
                    </div>
                </div>

                {/* Task Picker (optional task association) */}
                {tasks.length > 0 && (
                    <div className="w-full max-w-sm mt-6">
                        <label className="block text-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Working on
                        </label>
                        <select
                            value={selectedTaskId}
                            onChange={(e) => setSelectedTaskId(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 text-center focus:outline-none focus:border-[#E94B6F]"
                        >
                            <option value="">No task selected</option>
                            {tasks.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Control Buttons */}
                <div className="flex items-center gap-4 mt-8">
                    <button
                        type="button"
                        onClick={resetTimer}
                        title="Reset"
                        className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50 flex items-center justify-center shadow-sm transition-all active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsRunning(!isRunning)}
                        style={{ backgroundColor: MODES[mode].color }}
                        className="px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg hover:brightness-105 transition-all active:scale-95 flex items-center gap-2"
                    >
                        {isRunning ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Pause
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Start Focus
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
