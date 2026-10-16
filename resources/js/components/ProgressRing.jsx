import React from 'react';

export default function ProgressRing({ value, size = 80, stroke = 8, color = '#E94B6F', track = 'rgba(255,255,255,0.3)', label, sublabel }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 600ms ease' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold leading-none">{value}%</span>
                {label && <span className="text-[10px] opacity-80 mt-0.5">{label}</span>}
                {sublabel && <span className="text-[9px] opacity-60">{sublabel}</span>}
            </div>
        </div>
    );
}
