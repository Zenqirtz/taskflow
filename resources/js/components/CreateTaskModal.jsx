import React, { useState } from 'react';

const CATEGORIES = [
    { name: 'Design', color: 'bg-[#E94B6F] text-white', activeBg: 'bg-[#E94B6F]' },
    { name: 'Dev', color: 'bg-[#2D3E7A] text-white', activeBg: 'bg-[#2D3E7A]' },
    { name: 'Meeting', color: 'bg-[#FFE6F0] text-[#E94B6F]', activeBg: 'bg-[#FFE6F0]' },
    { name: 'Writing', color: 'bg-amber-100 text-amber-700', activeBg: 'bg-amber-500' },
    { name: 'Personal', color: 'bg-emerald-100 text-emerald-700', activeBg: 'bg-emerald-500' },
];

export default function CreateTaskModal({ isOpen, onClose, onSave }) {
    const today = new Date().toISOString().split('T')[0];

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Design');
    const [date, setDate] = useState(today);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
    const [description, setDescription] = useState('');
    const [reminder, setReminder] = useState(false);

    if (!isOpen) return null;

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        onSave({
            id: Date.now(),
            title: title.trim(),
            category,
            date,
            time: `${startTime} - ${endTime}`,
            description: description.trim(),
            reminder,
            done: false,
        });

        // Reset form
        setTitle('');
        setCategory('Design');
        setDate(today);
        setStartTime('09:00');
        setEndTime('10:00');
        setDescription('');
        setReminder(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            {/* Modal Card */}
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-pink-100 transition-all transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2D3E7A] to-[#1A2550] px-6 py-5 flex items-center justify-between text-white">
                    <div>
                        <h2 className="text-lg font-bold">Create New Task</h2>
                        <p className="text-xs text-white/60 mt-0.5">Plan your schedule and stay organized</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Task Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Design mobile app dashboard"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                            autoFocus
                        />
                    </div>

                    {/* Category Selector */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    type="button"
                                    key={cat.name}
                                    onClick={() => setCategory(cat.name)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                        category === cat.name
                                            ? `${cat.activeBg} text-white shadow-md scale-105`
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Date */}
                        <div className="sm:col-span-1">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#E94B6F] transition-all"
                            />
                        </div>

                        {/* Start Time */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Start
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#E94B6F] transition-all"
                            />
                        </div>

                        {/* End Time */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                End
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#E94B6F] transition-all"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details, links, or notes..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all resize-none"
                        />
                    </div>

                    {/* Reminder Switch */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFF9F0] border border-pink-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#FFE6F0] text-[#E94B6F] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#2D3E7A]">Set Reminder</p>
                                <p className="text-[10px] text-gray-400">Get notification 15m before</p>
                            </div>
                        </div>

                        {/* Toggle switch */}
                        <button
                            type="button"
                            onClick={() => setReminder(!reminder)}
                            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                                reminder ? 'bg-[#E94B6F]' : 'bg-gray-200'
                            }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                    reminder ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim()}
                            className="flex-1 py-3 rounded-xl bg-[#2D3E7A] text-white text-sm font-semibold hover:bg-[#E94B6F] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-900/10"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
