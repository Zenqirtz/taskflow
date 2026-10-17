import React, { useState, useEffect } from 'react';

export default function Notes({ onOpenSidebar }) {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('taskflow_notes');
        if (saved) {
            try {
                setNotes(JSON.parse(saved));
            } catch (err) {
                console.error('Failed to parse notes', err);
            }
        }
    }, []);

    // Save to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem('taskflow_notes', JSON.stringify(notes));
    }, [notes]);

    function handleCreateNote() {
        const newNote = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '',
            pinned: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setNotes((prev) => [newNote, ...prev]);
        setSelectedNote(newNote);
        setEditTitle(newNote.title);
        setEditContent(newNote.content);
        setIsEditing(true);
    }

    function handleSelectNote(note) {
        setSelectedNote(note);
        setEditTitle(note.title);
        setEditContent(note.content);
        setIsEditing(false);
    }

    function handleSave() {
        if (!selectedNote) return;
        setNotes((prev) =>
            prev.map((n) =>
                n.id === selectedNote.id
                    ? { ...n, title: editTitle.trim() || 'Untitled', content: editContent, updatedAt: new Date().toISOString() }
                    : n
            )
        );
        setSelectedNote((prev) => ({ ...prev, title: editTitle.trim() || 'Untitled', content: editContent }));
        setIsEditing(false);
    }

    function handleDelete(noteId) {
        if (!confirm('Delete this note?')) return;
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
        if (selectedNote?.id === noteId) {
            setSelectedNote(null);
            setIsEditing(false);
        }
    }

    function handleTogglePin(noteId) {
        setNotes((prev) =>
            prev.map((n) => (n.id === noteId ? { ...n, pinned: !n.pinned } : n))
        );
    }

    const filteredNotes = notes
        .filter((n) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
        })
        .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

    return (
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left Sidebar: Notes List */}
            <aside className="w-full md:w-80 bg-white border-r border-gray-100 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
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
                        <h2 className="text-lg font-bold text-[#2D3E7A]">Notes</h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleCreateNote}
                        className="p-2 rounded-xl bg-[#2D3E7A] text-white hover:bg-[#E94B6F] transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
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
                            placeholder="Search notes..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E94B6F]"
                        />
                    </div>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 text-xs">
                            {searchQuery ? 'No matching notes' : 'No notes yet. Create one!'}
                        </div>
                    ) : (
                        filteredNotes.map((note) => {
                            const isActive = selectedNote?.id === note.id;
                            const preview = note.content.slice(0, 80) + (note.content.length > 80 ? '...' : '');
                            return (
                                <button
                                    key={note.id}
                                    type="button"
                                    onClick={() => handleSelectNote(note)}
                                    className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                        isActive ? 'bg-[#FFF9F0] border-l-4 border-l-[#E94B6F]' : ''
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-sm font-semibold text-[#2D3E7A] truncate flex-1">
                                            {note.title}
                                        </h3>
                                        {note.pinned && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#E94B6F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M16 12V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v8l-2 2v2h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5v-2l-2-2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">{preview || 'Empty note'}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        {new Date(note.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </button>
                            );
                        })
                    )}
                </div>
            </aside>

            {/* Right Panel: Note Editor */}
            <main className="flex-1 flex flex-col bg-[#FFF9F0] overflow-hidden">
                {selectedNote ? (
                    <>
                        {/* Toolbar */}
                        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleTogglePin(selectedNote.id)}
                                    title={selectedNote.pinned ? 'Unpin' : 'Pin'}
                                    className={`p-2 rounded-lg transition-colors ${
                                        selectedNote.pinned
                                            ? 'bg-[#FFE6F0] text-[#E94B6F]'
                                            : 'text-gray-400 hover:text-[#E94B6F] hover:bg-gray-100'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 12V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v8l-2 2v2h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5v-2l-2-2z" />
                                    </svg>
                                </button>

                                {isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-3 py-1.5 rounded-lg bg-[#2D3E7A] text-white text-xs font-semibold hover:bg-[#E94B6F] transition-colors"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDelete(selectedNote.id)}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isEditing ? (
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="Note title"
                                        className="w-full px-4 py-3 text-xl font-bold text-[#2D3E7A] bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#E94B6F]"
                                    />
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        placeholder="Write your note here..."
                                        rows={15}
                                        className="w-full px-4 py-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#E94B6F] resize-none font-mono"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-2xl font-bold text-[#2D3E7A] mb-4">{selectedNote.title}</h1>
                                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                                        {selectedNote.content || <span className="text-gray-400 italic">Empty note</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <p className="text-gray-400 text-sm">Select a note or create a new one</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
