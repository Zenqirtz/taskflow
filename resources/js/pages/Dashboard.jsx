import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CalendarWidget from '../components/CalendarWidget';
import TaskList from '../components/TaskList';
import DataReports from '../components/DataReports';
import CreateTaskModal from '../components/CreateTaskModal';
import { getTasks, createTask, updateTask, deleteTask } from '../lib/api';

const today = new Date();

export default function Dashboard() {
    const [activePage, setActivePage] = useState('dashboard');
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function loadTasks() {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error('Failed to load tasks', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    // Filter today & tomorrow tasks based on due_date
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;
    const dayAfterTomorrow = tomorrowStart + 24 * 60 * 60 * 1000;

    const todayTasks = tasks.filter((t) => {
        if (!t.due_date) return true; // uncategorized default to today
        const taskTime = new Date(t.due_date).getTime();
        return taskTime >= todayStart && taskTime < tomorrowStart;
    });

    const tomorrowTasks = tasks.filter((t) => {
        if (!t.due_date) return false;
        const taskTime = new Date(t.due_date).getTime();
        return taskTime >= tomorrowStart && taskTime < dayAfterTomorrow;
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

    const completedCount = tasks.filter((t) => t.status === 'completed').length;
    const remainingCount = tasks.filter((t) => t.status !== 'completed').length;

    return (
        <div className="flex h-screen bg-[#FFF9F0] overflow-hidden">
            {/* Sidebar */}
            <Sidebar activePage={activePage} onNavigate={setActivePage} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">
                                {today.toLocaleDateString('id-ID', { weekday: 'long' })}
                            </p>
                            <h1 className="text-2xl font-bold text-[#2D3E7A]">Dashboard</h1>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-[#2D3E7A] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#E94B6F] shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Task
                        </button>
                    </div>

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
                                    />
                                </div>

                                {/* Data Reports */}
                                <DataReports />
                            </div>

                            {/* Right Column: Calendar */}
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
        </div>
    );
}
