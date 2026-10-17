import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import '../css/app.css';

function App() {
    const { user, isLoading } = useAuth();
    const [authPage, setAuthPage] = useState('login'); // 'login' | 'register'

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#E94B6F] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-semibold text-[#2D3E7A]">Loading TaskFlow...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        if (authPage === 'register') {
            return <Register onSwitch={() => setAuthPage('login')} />;
        }
        return <Login onSwitch={() => setAuthPage('register')} />;
    }

    return <Dashboard />;
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>
    );
}
