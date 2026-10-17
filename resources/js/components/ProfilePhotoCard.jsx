import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePhotoCard() {
    const { user } = useAuth();
    const [photo, setPhoto] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const storageKey = `taskflow_user_photo_${user?.id || 'default'}`;

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setPhoto(saved);
        }
    }, [storageKey]);

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            setPhoto(result);
            try {
                localStorage.setItem(storageKey, result);
            } catch (err) {
                console.warn('Storage quota exceeded, photo not cached locally', err);
            }
        };
        reader.readAsDataURL(file);
    }

    function handleChange(e) {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    }

    function handleRemove(e) {
        e.stopPropagation();
        setPhoto(null);
        localStorage.removeItem(storageKey);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 p-6 flex flex-col">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />

            {photo ? (
                /* Mode Foto Terpasang - Full Card */
                <div className="relative group">
                    <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md bg-gray-100">
                        <img
                            src={photo}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Overlay ganti/hapus saat hover */}
                    <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            title="Ganti foto"
                            className="p-2 rounded-xl bg-white text-[#2D3E7A] hover:bg-gray-100 shadow transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            title="Hapus foto"
                            className="p-2 rounded-xl bg-white text-[#E94B6F] hover:bg-red-50 shadow transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                /* Mode Kosong - Area Upload */
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        isDragging
                            ? 'border-[#E94B6F] bg-[#FFE6F0]/40'
                            : 'border-pink-200 hover:border-[#E94B6F] hover:bg-pink-50/30'
                    }`}
                >
                    <div className="w-12 h-12 rounded-xl bg-[#FFE6F0] flex items-center justify-center text-[#E94B6F] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-bold text-[#2D3E7A]">Upload Foto Anda</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Klik atau drag & drop (JPG, PNG)
                    </p>
                </div>
            )}
        </div>
    );
}
