import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        id: 'tasks',
        label: 'My Tasks',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
    },
    {
        id: 'timer',
        label: 'Timer',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        id: 'notes',
        label: 'Notes',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);
        await logout();
        setIsLoggingOut(false);
    }

    const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

    const sidebarContent = (
        <div className="flex flex-col h-full bg-gradient-to-b from-[#2D3E7A] to-[#1A2550] px-4 py-6">
            {/* Header: Logo + Toggle + Close on Mobile */}
            <div className="flex items-center justify-between px-2 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#E94B6F] rounded-xl flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    {!isCollapsed && <span className="text-white font-bold text-lg tracking-wide">TaskFlow</span>}
                </div>
                {/* Desktop collapse button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:block text-white/60 hover:text-white p-1 rounded-lg transition-colors"
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isCollapsed ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H6" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        )}
                    </svg>
                </button>
                {/* Mobile close button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden text-white/60 hover:text-white p-1 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onNavigate(item.id);
                                if (onClose) onClose();
                            }}
                            title={isCollapsed ? item.label : ''}
                            className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isCollapsed ? 'justify-center' : 'gap-3'
                            } ${
                                isActive
                                    ? 'bg-[#E94B6F] text-white shadow-lg shadow-pink-900/30'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {item.icon}
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="mt-auto px-2 flex flex-col gap-2">
                <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center gap-3'} p-3 rounded-xl bg-white/10`}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E94B6F] to-[#D84458] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {userInitial}
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="text-white text-sm font-medium truncate">{user?.name || 'User'}</p>
                            <p className="text-white/50 text-xs truncate">{user?.email || 'user@taskflow.app'}</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`flex ${isCollapsed ? 'justify-center' : 'items-center justify-center gap-2'} w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50 transition-all`}
                    title={isCollapsed ? 'Sign Out' : ''}
                >
                    {isLoggingOut ? (
                        <span className="w-3 h-3 border-2 border-white/40 border-t-transparent rounded-full animate-spin inline-block" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    )}
                    {!isCollapsed && (isLoggingOut ? 'Logging out...' : 'Sign Out')}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop persistent sidebar */}
            <aside className={`hidden md:block min-h-screen shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
                {sidebarContent}
            </aside>

            {/* Mobile Drawer Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Mobile Drawer */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-72 md:hidden transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
