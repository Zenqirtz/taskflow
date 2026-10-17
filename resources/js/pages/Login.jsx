import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login({ onSwitch }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            await login(email, password);
        } catch (err) {
            setErrors(err.errors || { email: [err.message || 'Login failed'] });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2D3E7A] via-[#1A2550] to-[#0D1333] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <img
                        src="/images/logo.png"
                        alt="TaskFlow"
                        className="w-11 h-11 rounded-2xl shadow-lg shadow-pink-900/30 object-cover"
                    />
                    <span className="text-white font-bold text-2xl tracking-wide">TaskFlow</span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-xl font-bold text-[#2D3E7A] mb-1">Welcome back!</h2>
                    <p className="text-sm text-gray-400 mb-6">Sign in to manage your tasks</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                                required
                            />
                            {errors.email && (
                                <p className="text-xs text-[#E94B6F] mt-1">{errors.email[0]}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                                required
                            />
                            {errors.password && (
                                <p className="text-xs text-[#E94B6F] mt-1">{errors.password[0]}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-xl bg-[#2D3E7A] text-white text-sm font-semibold hover:bg-[#E94B6F] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md mt-2"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Switch to register */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitch}
                            className="text-[#E94B6F] font-semibold hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
