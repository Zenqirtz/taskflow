import React, { useState, useEffect } from 'react';
import { getCategories } from '../lib/api';

export default function EditTaskModal({ isOpen, task, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('09:00');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && task) {
            setTitle(task.title || '');
            setCategoryId(task.category_id ?? task.category?.id ?? null);
            setDescription(task.description || '');
            setPriority(task.priority || 'medium');

            if (task.due_date) {
                const d = new Date(task.due_date);
                setDate(d.toISOString().split('T')[0]);
                setTime(d.toTimeString().slice(0, 5));
            } else {
                setDate('');
                setTime('09:00');
            }

            getCategories()
                .then(setCategories)
                .catch(() => {});
        }
    }, [isOpen, task]);

    if (!isOpen || !task) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;

        setIsSubmitting(true);

        const dueDateTime = date ? `${date}T${time}` : null;

        try {
            await onSave(task.id, {
                title: title.trim(),
                category_id: categoryId,
                due_date: dueDateTime,
                description: description.trim() || null,
                priority,
            });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-pink-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#E94B6F] to-[#D84458] px-6 py-5 flex items-center justify-between text-white">
                    <div>
                        <h2 className="text-lg font-bold">Edit Task</h2>
                        <p className="text-xs text-white/60 mt-0.5">Update your task details</p>
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

                {/* Form */}
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
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                            autoFocus
                            required
                        />
                    </div>

                    {/* Category */}
                    {categories.length > 0 && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Category
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => {
                                    const isSelected = categoryId === cat.id;
                                    return (
                                        <button
                                            type="button"
                                            key={cat.id}
                                            onClick={() => setCategoryId(cat.id)}
                                            style={isSelected ? { backgroundColor: cat.color, color: '#fff' } : {}}
                                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                                isSelected
                                                    ? 'shadow-md scale-105'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Priority */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Priority
                        </label>
                        <div className="flex gap-2">
                            {[
                                { id: 'low', label: 'Low', color: 'bg-green-100 text-green-700', activeColor: 'bg-green-500 text-white' },
                                { id: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700', activeColor: 'bg-amber-500 text-white' },
                                { id: 'high', label: 'High', color: 'bg-red-100 text-red-700', activeColor: 'bg-red-500 text-white' },
                            ].map((p) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setPriority(p.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                        priority === p.id ? p.activeColor + ' shadow-sm' : p.color
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
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
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Due Time
                            </label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#E94B6F] transition-all"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all resize-none"
                        />
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
                            disabled={!title.trim() || isSubmitting}
                            className="flex-1 py-3 rounded-xl bg-[#E94B6F] text-white text-sm font-semibold hover:bg-[#D84458] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
