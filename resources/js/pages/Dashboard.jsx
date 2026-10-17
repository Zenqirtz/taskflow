import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import CalendarWidget from '../components/CalendarWidget';
import TaskList from '../components/TaskList';
import DataReports from '../components/DataReports';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { getTasks, getCategories, createTask, updateTask, deleteTask } from '../lib/api';

const today = new Date();

export default function Dashboard() {
    const [activePage, setActivePage] = useState('dashboard');
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Search & Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'pending' | 'completed'

    async function loadData() {
        try {
            const [tasksData, categoriesData] = await Promise.all([
                getTasks(),
                getCategories(),
            ]);
            setTasks(tasksData);
            setCategories(categoriesData);
        } catch (err) {
            console.error('Failed to load data', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // Filter pipeline: Search -> Category -> Status
    const filteredTasks = useMemo(() => {
        return tasks.filter((t) => {
            // Search query
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const matchTitle = t.title?.toLowerCase().includes(query);
                const matchDesc = t.description?.toLowerCase().includes(query);
                if (!matchTitle && !matchDesc) return false;
            }

            // Category filter
            if (selectedCategory !== 'all') {
                const taskCatId = t.category_id ?? t.category?.id;
                if (String(taskCatId) !== String(selectedCategory)) return false;
            }

            // Status filter
            if (selectedStatus === 'pending' && t.status === 'completed') return false;
            if (selectedStatus === 'completed' && t.status !== 'completed') return false;

            return true;
        });
    }, [tasks, searchQuery, selectedCategory, selectedStatus]);

    // Split filtered into Today & Tomorrow based on due_date
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;
    const dayAfterTomorrow = tomorrowStart + 24 * 60 * 60 * 1000;

    const todayTasks = filteredTasks.filter((t) => {
        if (!t.due_date) return true;
        const taskTime = new Date(t.due_date).getTime();
        return taskTime >= todayStart && taskTime < tomorrowStart;
    });

    const tomorrowTasks = filteredTasks.filter((t) => {
        if (!t.due_date) return false;
        const taskTime = new Date(t.due_date).getTime();
        return taskTime >= tomorrowStart && taskTime < dayAfterTomorrow;
    });

    // Other tasks (older or further out)
    const otherTasks = filteredTasks.filter((t) => {
        if (!t.due_date) return false;
        const taskTime = new Date(t.due_date).getTime();
        return taskTime < todayStart || taskTime >= dayAfterTomorrow;
    });

    async function handleCreateTask(payload) {
        const newTask = await createTask(payload);
        setTasks((prev) => [newTask, ...prev]);
    }

    async function handleToggleTask(task) {
        const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
        const updated = await updateTask(task.id, {
            status: nextStatus,
            completed_at: nextStatus === 'completed' ? new Date().toISOString().slice(0, 16) : null,
        });

        setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    }

    async function handleDeleteTask(taskId) {
        await deleteTask(taskId);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }

    function handleOpenEdit(task) {
        setEditingTask(task);
        setIsEditModalOpen(true);
    }

    async function handleUpdateTask(taskId, payload) {
        const updated = await updateTask(taskId, payload);
        setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    }

    const completedCount = tasks.filter((t) => t.status === 'completed').length;
    const remainingCount = tasks.filter((t) => t.status !== 'completed').length;

    return (
        <div className="flex h-screen bg-[#FFF9F0] overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                activePage={activePage}
                onNavigate={setActivePage}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            {/* Mobile Hamburger */}
                            <button
                                type="button"
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="md:hidden p-2 rounded-xl bg-white border border-pink-100 text-[#2D3E7A] hover:bg-gray-50 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-medium mb-0.5">
                                    {today.toLocaleDateString('id-ID', { weekday: 'long' })}
                                </p>
                                <h1 className="text-xl sm:text-2xl font-bold text-[#2D3E7A]">Dashboard</h1>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 bg-[#2D3E7A] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#E94B6F] shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">New Task</span>
                            <span className="sm:hidden">New</span>
                        </button>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-pink-50 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                        {/* Search Input */}
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
                                placeholder="Search tasks by title or description..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start md:self-auto shrink-0">
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'pending', label: 'Pending' },
                                { id: 'completed', label: 'Done' },
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => setSelectedStatus(s.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        selectedStatus === s.id
                                            ? 'bg-white text-[#2D3E7A] shadow-sm'
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Pills Filter */}
                    {categories.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                            <button
                                type="button"
                                onClick={() => setSelectedCategory('all')}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                    selectedCategory === 'all'
                                        ? 'bg-[#2D3E7A] text-white shadow-sm'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                All Categories ({tasks.length})
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
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: cat.color }}
                                        />
                                        {cat.name} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="py-20 flex justify-center items-center">
                            <div className="w-8 h-8 border-4 border-[#E94B6F] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        /* Grid Layout */
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Left Column: Tasks */}
                            <div className="xl:col-span-2 flex flex-col gap-6">
                                {/* Today's Tasks */}
                                <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <h2 className="text-lg font-bold text-[#2D3E7A]">
                                            Today's Tasks
                                            <span className="ml-2 text-xs font-medium bg-[#FFE6F0] text-[#E94B6F] px-2 py-0.5 rounded-full">
                                                {todayTasks.length}
                                            </span>
                                        </h2>
                                        <span className="text-xs text-gray-400">
                                            {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <TaskList
                                        tasks={todayTasks}
                                        onToggle={handleToggleTask}
                                        onDelete={handleDeleteTask}
                                        onEdit={handleOpenEdit}
                                    />
                                </div>

                                {/* Tomorrow's Tasks */}
                                <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <h2 className="text-lg font-bold text-[#2D3E7A]">
                                            Tomorrow
                                            <span className="ml-2 text-xs font-medium bg-[#FFE6F0] text-[#E94B6F] px-2 py-0.5 rounded-full">
                                                {tomorrowTasks.length}
                                            </span>
                                        </h2>
                                    </div>
                                    <TaskList
                                        tasks={tomorrowTasks}
                                        onToggle={handleToggleTask}
                                        onDelete={handleDeleteTask}
                                        onEdit={handleOpenEdit}
                                    />
                                </div>

                                {/* Other / Later Tasks (jika ada) */}
                                {otherTasks.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6">
                                        <div className="flex items-center justify-between mb-5">
                                            <h2 className="text-lg font-bold text-[#2D3E7A]">
                                                Other Dates
                                                <span className="ml-2 text-xs font-medium bg-[#FFE6F0] text-[#E94B6F] px-2 py-0.5 rounded-full">
                                                    {otherTasks.length}
                                                </span>
                                            </h2>
                                        </div>
                                        <TaskList
                                            tasks={otherTasks}
                                            onToggle={handleToggleTask}
                                            onDelete={handleDeleteTask}
                                            onEdit={handleOpenEdit}
                                        />
                                    </div>
                                )}

                                {/* Data Reports */}
                                <DataReports />
                            </div>

                            {/* Right Column: Calendar & Stats */}
                            <div className="xl:col-span-1 flex flex-col gap-6">
                                <CalendarWidget
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                />

                                {/* Quick Stats */}
                                <div className="bg-gradient-to-br from-[#2D3E7A] to-[#1A2550] rounded-2xl p-6 text-white">
                                    <h3 className="font-semibold text-sm opacity-80 mb-4">Task Overview</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-3xl font-bold">{completedCount}</p>
                                            <p className="text-xs opacity-60 mt-1">Completed</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-[#E94B6F]">{remainingCount}</p>
                                            <p className="text-xs opacity-60 mt-1">Pending</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold">
                                                {tasks.length > 0 ? `${Math.round((completedCount / tasks.length) * 100)}%` : '0%'}
                                            </p>
                                            <p className="text-xs opacity-60 mt-1">Progress</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold">{tasks.length}</p>
                                            <p className="text-xs opacity-60 mt-1">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Create Task Modal */}
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateTask}
            />

            {/* Edit Task Modal */}
            <EditTaskModal
                isOpen={isEditModalOpen}
                task={editingTask}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleUpdateTask}
            />
        </div>
    );
}
