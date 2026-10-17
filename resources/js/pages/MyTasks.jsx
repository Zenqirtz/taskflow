import React, { useState, useMemo } from 'react';
import TaskList from '../components/TaskList';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';

export default function MyTasks({
    tasks,
    categories,
    onCreateTask,
    onToggleTask,
    onDeleteTask,
    onUpdateTask,
    onOpenSidebar,
}) {
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [sortBy, setSortBy] = useState('due_date'); // 'due_date' | 'priority' | 'title'

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    function handleOpenEdit(task) {
        setEditingTask(task);
        setIsEditOpen(true);
    }

    const priorityWeight = { high: 3, medium: 2, low: 1 };

    // Filter + Sort
    const processedTasks = useMemo(() => {
        const filtered = tasks.filter((t) => {
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const mTitle = t.title?.toLowerCase().includes(q);
                const mDesc = t.description?.toLowerCase().includes(q);
                if (!mTitle && !mDesc) return false;
            }
            if (selectedCategory !== 'all') {
                const catId = t.category_id ?? t.category?.id;
                if (String(catId) !== String(selectedCategory)) return false;
            }
            if (selectedPriority !== 'all' && t.priority !== selectedPriority) {
                return false;
            }
            return true;
        });

        return filtered.sort((a, b) => {
            if (sortBy === 'priority') {
                return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
            }
            if (sortBy === 'title') {
                return (a.title || '').localeCompare(b.title || '');
            }
            // default due_date
            const dateA = a.due_date ? new Date(a.due_date).getTime() : Infinity;
            const dateB = b.due_date ? new Date(b.due_date).getTime() : Infinity;
            return dateA - dateB;
        });
    }, [tasks, searchQuery, selectedCategory, selectedPriority, sortBy]);

    // Kanban columns
    const pendingTasks = processedTasks.filter((t) => t.status !== 'completed');
    const completedTasks = processedTasks.filter((t) => t.status === 'completed');

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
                                Workspace
                            </p>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#2D3E7A]">My Tasks</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* View Switcher */}
                        <div className="hidden sm:flex items-center bg-white p-1 rounded-xl border border-gray-200">
                            <button
                                type="button"
                                onClick={() => setViewMode('kanban')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                    viewMode === 'kanban'
                                        ? 'bg-[#2D3E7A] text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                </svg>
                                Kanban
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                    viewMode === 'list'
                                        ? 'bg-[#2D3E7A] text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                List
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(true)}
                            className="inline-flex items-center justify-center gap-2 bg-[#2D3E7A] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#E94B6F] shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">New Task</span>
                            <span className="sm:hidden">New</span>
                        </button>
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-pink-50 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                        />
                    </div>

                    {/* Controls: Priority + Sort */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Priority Select */}
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#E94B6F]"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>

                        {/* Sort Select */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#E94B6F]"
                        >
                            <option value="due_date">Sort: Due Date</option>
                            <option value="priority">Sort: Priority</option>
                            <option value="title">Sort: Title</option>
                        </select>
                    </div>
                </div>

                {/* Category Pills */}
                {categories.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                        <button
                            type="button"
                            onClick={() => setSelectedCategory('all')}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                selectedCategory === 'all'
                                    ? 'bg-[#2D3E7A] text-white shadow-sm'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            All ({tasks.length})
                        </button>
                        {categories.map((cat) => {
                            const isSelected = String(selectedCategory) === String(cat.id);
                            const count = tasks.filter((t) => (t.category_id ?? t.category?.id) === cat.id).length;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    style={isSelected ? { backgroundColor: cat.color, color: '#fff' } : {}}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                        isSelected
                                            ? 'shadow-sm'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                    {cat.name} ({count})
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Main View: Kanban vs List */}
                {viewMode === 'kanban' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pending Column */}
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#E94B6F]" />
                                    <h2 className="text-base font-bold text-[#2D3E7A]">In Progress / Pending</h2>
                                </div>
                                <span className="text-xs font-bold bg-[#FFE6F0] text-[#E94B6F] px-2.5 py-1 rounded-full">
                                    {pendingTasks.length}
                                </span>
                            </div>
                            <TaskList
                                tasks={pendingTasks}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                                onEdit={handleOpenEdit}
                            />
                        </div>

                        {/* Completed Column */}
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                    <h2 className="text-base font-bold text-[#2D3E7A]">Completed</h2>
                                </div>
                                <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                                    {completedTasks.length}
                                </span>
                            </div>
                            <TaskList
                                tasks={completedTasks}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                                onEdit={handleOpenEdit}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-[#2D3E7A]">All Tasks</h2>
                            <span className="text-xs text-gray-400">Total: {processedTasks.length}</span>
                        </div>
                        <TaskList
                            tasks={processedTasks}
                            onToggle={onToggleTask}
                            onDelete={onDeleteTask}
                            onEdit={handleOpenEdit}
                        />
                    </div>
                )}
            </div>

            {/* Modals */}
            <CreateTaskModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSave={onCreateTask}
            />

            <EditTaskModal
                isOpen={isEditOpen}
                task={editingTask}
                onClose={() => setIsEditOpen(false)}
                onSave={onUpdateTask}
            />
        </div>
    );
}
