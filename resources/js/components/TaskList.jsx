import React, { useState } from 'react';

const categoryColors = {
    Design: 'bg-[#E94B6F] text-white',
    Dev: 'bg-[#2D3E7A] text-white',
    Meeting: 'bg-[#FFE6F0] text-[#E94B6F]',
    Writing: 'bg-amber-100 text-amber-700',
};

export default function TaskList({ tasks }) {
    const [items, setItems] = useState(tasks);

    function toggleDone(id) {
        setItems((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {items.map((task) => (
                <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        task.done
                            ? 'bg-gray-50 border-gray-100 opacity-60'
                            : 'bg-white border-pink-50 hover:shadow-md hover:border-pink-100'
                    }`}
                >
                    {/* Checkbox */}
                    <button
                        onClick={() => toggleDone(task.id)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                            task.done
                                ? 'bg-[#E94B6F] border-[#E94B6F]'
                                : 'border-gray-300 hover:border-[#E94B6F]'
                        }`}
                    >
                        {task.done && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {task.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {task.time}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[task.category] || 'bg-gray-100 text-gray-600'}`}>
                                {task.category}
                            </span>
                        </div>
                    </div>

                    {/* More Button */}
                    <button className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}
