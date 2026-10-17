import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CalendarWidget from '../components/CalendarWidget';
import TaskList from '../components/TaskList';
import DataReports from '../components/DataReports';
import CreateTaskModal from '../components/CreateTaskModal';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];

const initialTodayTasks = [
    { id: 1, title: 'Design landing page mockup', time: '09:00 - 10:30', category: 'Design', done: true, date: todayStr },
    { id: 2, title: 'Write unit tests for API', time: '11:00 - 12:00', category: 'Dev', done: false, date: todayStr },
    { id: 3, title: 'Team sync call', time: '13:00 - 13:30', category: 'Meeting', done: false, date: todayStr },
    { id: 4, title: 'Review pull requests', time: '14:00 - 15:00', category: 'Dev', done: false, date: todayStr },
];

const initialTomorrowTasks = [
    { id: 5, title: 'Client presentation prep', time: '09:00 - 11:00', category: 'Meeting', done: false },
    { id: 6, title: 'Update project documentation', time: '13:00 - 14:00', category: 'Writing', done: false },
];

export default function Dashboard() {
    const [activePage, setActivePage] = useState('dashboard');
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [todayTasks, setTodayTasks] = useState(initialTodayTasks);
    const [tomorrowTasks, setTomorrowTasks] = useState(initialTomorrowTasks);

    function handleCreateTask(newTask) {
        if (newTask.date === todayStr) {
            setTodayTasks((prev) => [newTask, ...prev]);
        } else {
            setTomorrowTasks((prev) => [newTask, ...prev]);
        }
    }

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

                    {/* Grid Layout */}
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
                                <TaskList tasks={todayTasks} />
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
                                <TaskList tasks={tomorrowTasks} />
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
                                <h3 className="font-semibold text-sm opacity-80 mb-4">This Week</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-3xl font-bold">{todayTasks.filter(t => t.done).length + 8}</p>
                                        <p className="text-xs opacity-60 mt-1">Tasks Done</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-[#E94B6F]">3</p>
                                        <p className="text-xs opacity-60 mt-1">Overdue</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">85%</p>
                                        <p className="text-xs opacity-60 mt-1">On Time</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{todayTasks.filter(t => !t.done).length + tomorrowTasks.length}</p>
                                        <p className="text-xs opacity-60 mt-1">Remaining</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
