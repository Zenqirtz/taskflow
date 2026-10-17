import React from 'react';

export default function TaskList({ tasks, onToggle, onDelete }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="py-8 text-center text-gray-400 text-xs">
                No tasks yet. Create one!
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {tasks.map((task) => {
                const isDone = task.status === 'completed' || task.done;
                const catName = task.category?.name || task.category || 'General';
                const catColor = task.category?.color || '#2D3E7A';

                // Format time range
                let timeDisplay = task.time;
                if (!timeDisplay && task.due_date) {
                    const d = new Date(task.due_date);
                    timeDisplay = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }

                return (
                    <div
                        key={task.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            isDone
                                ? 'bg-gray-50 border-gray-100 opacity-60'
                                : 'bg-white border-pink-50 hover:shadow-md hover:border-pink-100'
                        }`}
                    >
                        {/* Checkbox */}
                        <button
                            type="button"
                            onClick={() => onToggle && onToggle(task)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isDone
                                    ? 'bg-[#E94B6F] border-[#E94B6F]'
                                    : 'border-gray-300 hover:border-[#E94B6F]'
                            }`}
                        >
                            {isDone && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>

                        {/* Task Info */}
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {task.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5">
                                {timeDisplay && (
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {timeDisplay}
                                    </span>
                                )}
                                <span
                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                                    style={{ backgroundColor: catColor }}
                                >
                                    {catName}
                                </span>
                            </div>
                        </div>

                        {/* Delete Button */}
                        {onDelete && (
                            <button
                                type="button"
                                onClick={() => onDelete(task.id)}
                                title="Delete task"
                                className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
