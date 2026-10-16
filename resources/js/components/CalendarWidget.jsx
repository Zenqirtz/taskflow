import React from 'react';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

export default function CalendarWidget({ selectedDate, onSelectDate }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const todayDate = today.getDate();

    const monthName = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

    const blanks = Array.from({ length: firstDay }, (_, i) => (
        <div key={`blank-${i}`} className="w-9 h-9" />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const isSelected = day === selectedDate;
        const isToday = day === todayDate;
        return (
            <button
                key={day}
                onClick={() => onSelectDate(day)}
                className={`w-9 h-9 rounded-full text-xs font-medium transition-all flex items-center justify-center ${
                    isSelected
                        ? 'bg-white text-[#2D3E7A] font-bold shadow-md'
                        : isToday
                            ? 'bg-[#E94B6F] text-white'
                            : 'text-white/80 hover:bg-white/20'
                }`}
            >
                {day}
            </button>
        );
    });

    return (
        <div className="bg-gradient-to-br from-[#2D3E7A] via-[#3D4F8A] to-[#E94B6F] rounded-2xl p-5 text-white">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-sm capitalize">{monthName}</h3>
                <div className="flex gap-2">
                    <button className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((d) => (
                    <div key={d} className="w-9 h-7 flex items-center justify-center text-[10px] font-semibold text-white/50 uppercase">
                        {d}
                    </div>
                ))}
            </div>

            {/* Day Grid */}
            <div className="grid grid-cols-7 gap-1">
                {blanks}
                {days}
            </div>
        </div>
    );
}
