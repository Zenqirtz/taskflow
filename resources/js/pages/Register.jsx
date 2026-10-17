import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Register({ onSwitch }) {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            await register(name, email, password, passwordConfirmation);
        } catch (err) {
            setErrors(err.errors || { email: [err.message || 'Registration failed'] });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2D3E7A] via-[#1A2550] to-[#0D1333] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-11 h-11 bg-[#E94B6F] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-900/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-2xl tracking-wide">TaskFlow</span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-xl font-bold text-[#2D3E7A] mb-1">Create account</h2>
                    <p className="text-sm text-gray-400 mb-6">Start organizing your tasks today</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                                required
                            />
                            {errors.name && (
                                <p className="text-xs text-[#E94B6F] mt-1">{errors.name[0]}</p>
                            )}
                        </div>

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
                                placeholder="Min. 8 characters"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                                required
                            />
                            {errors.password && (
                                <p className="text-xs text-[#E94B6F] mt-1">{errors.password[0]}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                placeholder="Repeat password"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F] focus:ring-1 focus:ring-[#E94B6F] transition-all"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-xl bg-[#2D3E7A] text-white text-sm font-semibold hover:bg-[#E94B6F] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md mt-2"
                        >
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Switch to login */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={onSwitch}
                            className="text-[#E94B6F] font-semibold hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
