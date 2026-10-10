@extends('layouts.app')

@section('title', 'Kelola Kategori')

@section('extra-styles')
<style>
    .category-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        box-shadow: var(--shadow-1);
        max-width: 720px;
    }

    .section-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .category-form {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--border-color);
    }

    .category-form input[type="text"] {
        flex: 1;
        height: 44px;
        padding: 0 14px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--bg-surface);
        color: var(--text-primary);
        font-size: 14px;
        outline: none;
        min-width: 0;
    }

    .category-form input[type="text"]:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    .category-form input[type="color"] {
        width: 44px;
        height: 44px;
        padding: 4px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        background: var(--bg-surface);
    }

    .category-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .category-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
        background: var(--bg-input);
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }

    .cat-badge { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }

    .cat-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .cat-name { font-weight: 600; color: var(--text-primary); }

    .cat-count { font-size: 12px; color: var(--text-secondary); flex-shrink: 0; }

    .cat-actions { display: flex; gap: 4px; flex-shrink: 0; }

    .cat-actions button {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 14px;
        padding: 8px;
        border-radius: 8px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cat-actions button:hover { background: var(--bg-surface); }

    .cat-actions .btn-delete:hover { color: var(--danger); background: var(--danger-bg); }
</style>
@endsection

@section('content')
<div class="category-card">
    <h2 class="section-title">Kelola Kategori</h2>

    <form method="POST" action="{{ route('categories.store') }}" class="category-form">
        @csrf
        <input type="text" name="name" placeholder="Nama kategori (contoh: Kalkulus II)..." maxlength="50" required autocomplete="off">
        <input type="color" name="color" value="#4f46e5" title="Pilih warna">
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Tambah</button>
    </form>

    @if($categories->count() > 0)
        <ul class="category-list">
            @foreach($categories as $category)
                <li class="category-item">
                    <div class="cat-badge">
                        <span class="cat-dot" style="background-color: {{ $category->color }};"></span>
                        <span class="cat-name">{{ $category->name }}</span>
                    </div>
                    <span class="cat-count">{{ $category->tasks_count }} tugas</span>
                    <div class="cat-actions">
                        <form method="POST" action="{{ route('categories.destroy', $category) }}" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn-delete" title="Hapus" onclick="return confirm('Hapus kategori ini? Tugas terkait akan menjadi tanpa kategori.');">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </form>
                    </div>
                </li>
            @endforeach
        </ul>
    @else
        <p style="text-align: center; color: var(--text-secondary); padding: 40px 20px;">
            Belum ada kategori. Buat kategori pertama Anda sekarang!
        </p>
    @endif
</div>
@endsection