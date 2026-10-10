@extends('layouts.app')

@section('title', 'Dasbor Tugas')

@section('extra-styles')
<style>
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 24px;
    }

    @media (min-width: 768px) {
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
    }

    .stat-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        box-shadow: var(--shadow-1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        transition: background-color 0.2s;
    }

    .stat-card .stat-text { display: flex; flex-direction: column; }

    .stat-card .stat-value {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.2;
    }

    .stat-card .stat-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-secondary);
        margin-top: 2px;
    }

    .stat-icon-box {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
    }

    .stat-icon-box.total { background: var(--primary-light); color: var(--primary); }
    .stat-icon-box.pending { background: var(--warning-bg); color: var(--warning); }
    .stat-icon-box.completed { background: var(--success-bg); color: var(--success); }
    .stat-icon-box.overdue { background: var(--danger-bg); color: var(--danger); }

    .quick-add {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 8px;
        display: flex;
        gap: 8px;
        box-shadow: var(--shadow-1);
        margin-bottom: 24px;
    }

    .quick-add input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        padding: 10px 14px;
        font-size: 15px;
        color: var(--text-primary);
        min-width: 0;
    }

    .quick-add input::placeholder { color: var(--text-muted); }

    .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
    }

    @media (min-width: 1024px) {
        .dashboard-grid { grid-template-columns: 7fr 5fr; }
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    .section-title {
        font-size: 18px;
        font-weight: 600;
    }

    .controls {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 16px;
        box-shadow: var(--shadow-1);
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .search-wrap {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-wrap i {
        position: absolute;
        left: 14px;
        color: var(--text-muted);
        font-size: 14px;
    }

    .search-wrap input {
        width: 100%;
        height: 44px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--bg-surface);
        padding: 0 14px 0 40px;
        font-size: 14px;
        color: var(--text-primary);
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
    }

    .search-wrap input:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .filters select {
        flex: 1 1 150px;
        height: 44px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--bg-surface);
        color: var(--text-primary);
        font-size: 13px;
        padding: 0 32px 0 12px;
        outline: none;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
    }

    .filters select:focus { border-color: var(--primary); }

    .task-list { display: flex; flex-direction: column; gap: 12px; }

    .task-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        box-shadow: var(--shadow-1);
        transition: box-shadow 0.2s, border-color 0.2s, opacity 0.2s;
    }

    .task-card:hover {
        box-shadow: var(--shadow-2);
        border-color: var(--border-hover);
    }

    .task-check {
        flex-shrink: 0;
        margin-top: 2px;
    }

    .task-check input[type="checkbox"] {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 2px solid var(--border-hover);
        background: var(--bg-surface);
        cursor: pointer;
        appearance: none;
        display: grid;
        place-content: center;
        transition: all 0.15s;
    }

    .task-check input[type="checkbox"]::before {
        content: "";
        width: 11px;
        height: 11px;
        transform: scale(0);
        transition: transform 0.15s;
        box-shadow: inset 1em 1em #fff;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    .task-check input[type="checkbox"]:checked {
        background: var(--primary);
        border-color: var(--primary);
    }

    .task-check input[type="checkbox"]:checked::before { transform: scale(1); }

    .task-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
    }

    .task-title {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        word-break: break-word;
    }

    .task-desc {
        font-size: 14px;
        color: var(--text-secondary);
        white-space: pre-wrap;
        word-break: break-word;
    }

    .task-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        margin-top: 4px;
    }

    .course-tag {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 6px;
        background: var(--bg-input);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-size: 11px;
        font-weight: 600;
    }

    .task-card.completed { opacity: 0.7; }

    .task-card.completed .task-title {
        text-decoration: line-through;
        color: var(--text-muted);
    }

    .task-actions { display: flex; gap: 4px; flex-shrink: 0; }

    .task-actions button {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-size: 14px;
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s;
    }

    .task-actions button:hover { background: var(--bg-input); color: var(--text-primary); }
    .task-actions .btn-delete:hover { color: var(--danger); background: var(--danger-bg); }

    .side-panel {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 20px;
        box-shadow: var(--shadow-1);
        align-self: start;
    }

    .side-panel h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 16px;
    }

    .agenda-list { display: flex; flex-direction: column; gap: 8px; }

    .agenda-item {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 12px;
        border-radius: 8px;
        background: var(--bg-input);
        border: 1px solid var(--border-color);
    }

    .agenda-date {
        flex-shrink: 0;
        width: 48px;
        text-align: center;
        padding: 6px 0;
        border-radius: 8px;
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
    }

    .agenda-date .d {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.1;
    }

    .agenda-date .m {
        font-size: 11px;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
    }

    .agenda-info { flex: 1; min-width: 0; }

    .agenda-info .title {
        font-size: 14px;
        font-weight: 600;
        word-break: break-word;
    }

    .agenda-info .meta {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 2px;
    }

    .agenda-empty {
        text-align: center;
        padding: 24px 12px;
        color: var(--text-secondary);
        font-size: 13px;
    }

    .empty-state {
        text-align: center;
        padding: 56px 24px;
        background: var(--bg-surface);
        border-radius: 12px;
        border: 1px dashed var(--border-color);
    }

    .empty-icon {
        font-size: 48px;
        color: var(--text-muted);
        margin-bottom: 16px;
    }

    .empty-state h3 { font-size: 18px; margin-bottom: 6px; }
    .empty-state p { font-size: 14px; color: var(--text-secondary); }

    .pagination { display: flex; justify-content: center; gap: 4px; margin-top: 24px; }

    .pagination a, .pagination span {
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--bg-surface);
        color: var(--text-primary);
        text-decoration: none;
        font-size: 13px;
    }

    .pagination .active { background: var(--primary); color: #fff; border-color: var(--primary); }
    .pagination a:hover { background: var(--bg-input); }

    @media (max-width: 640px) {
        .task-actions { flex-direction: column; }
    }
</style>
@endsection

@section('content')
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-text">
            <span class="stat-value">{{ $summary['total'] }}</span>
            <span class="stat-label">Total Tugas</span>
        </div>
        <div class="stat-icon-box total"><i class="fa-solid fa-list-check"></i></div>
    </div>
    <div class="stat-card">
        <div class="stat-text">
            <span class="stat-value">{{ $summary['pending'] }}</span>
            <span class="stat-label">Belum Selesai</span>
        </div>
        <div class="stat-icon-box pending"><i class="fa-solid fa-clock"></i></div>
    </div>
    <div class="stat-card">
        <div class="stat-text">
            <span class="stat-value">{{ $summary['completed'] }}</span>
            <span class="stat-label">Selesai</span>
        </div>
        <div class="stat-icon-box completed"><i class="fa-solid fa-check"></i></div>
    </div>
    <div class="stat-card">
        <div class="stat-text">
            <span class="stat-value">{{ $summary['overdue'] }}</span>
            <span class="stat-label">Terlambat</span>
        </div>
        <div class="stat-icon-box overdue"><i class="fa-solid fa-triangle-exclamation"></i></div>
    </div>
</div>

<form class="quick-add" method="POST" action="{{ route('tasks.store') }}">
    @csrf
    <input type="text" name="title" placeholder="Tambah tugas cepat (Enter untuk simpan)..." maxlength="150" required autocomplete="off">
    <button type="submit" class="btn btn-primary" title="Tambah Tugas"><i class="fa-solid fa-plus"></i></button>
    <a href="{{ route('categories.index') }}" class="btn btn-outline" title="Kelola Kategori"><i class="fa-solid fa-tags"></i></a>
</form>

<div class="dashboard-grid">
    <section>
        <div class="section-header">
            <h2 class="section-title">Daftar Tugas</h2>
        </div>

        <div class="controls">
            <div class="search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search-input" placeholder="Cari tugas..." onkeyup="filterTasks()">
            </div>
            <div class="filters">
                <select id="filter-status" onchange="filterTasks()">
                    <option value="">Semua Status</option>
                    <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Belum Selesai</option>
                    <option value="completed" {{ request('status') === 'completed' ? 'selected' : '' }}>Selesai</option>
                </select>
                <select id="filter-priority" onchange="filterTasks()">
                    <option value="">Semua Prioritas</option>
                    <option value="high" {{ request('priority') === 'high' ? 'selected' : '' }}>Tinggi</option>
                    <option value="medium" {{ request('priority') === 'medium' ? 'selected' : '' }}>Sedang</option>
                    <option value="low" {{ request('priority') === 'low' ? 'selected' : '' }}>Rendah</option>
                </select>
                <select id="filter-category" onchange="filterTasks()">
                    <option value="">Semua Kategori</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
                <select id="sort-by" onchange="filterTasks()">
                    <option value="default">Urutan Pintar</option>
                    <option value="deadline" {{ request('sort') === 'deadline' ? 'selected' : '' }}>Deadline Terdekat</option>
                    <option value="priority" {{ request('sort') === 'priority' ? 'selected' : '' }}>Prioritas Tertinggi</option>
                    <option value="newest" {{ request('sort') === 'newest' ? 'selected' : '' }}>Paling Baru</option>
                </select>
            </div>
        </div>

        <div class="task-list">
            @forelse($tasks as $task)
                <div class="task-card {{ $task->status === 'completed' ? 'completed' : '' }}">
                    <div class="task-check">
                        <input type="checkbox"
                            {{ $task->status === 'completed' ? 'checked' : '' }}
                            onchange="toggleTask({{ $task->id }})">
                    </div>

                    <div class="task-body">
                        <span class="task-title">{{ $task->title }}</span>
                        @if($task->description)
                            <p class="task-desc">{{ $task->description }}</p>
                        @endif

                        <div class="task-meta">
                            <span class="priority-badge priority-{{ $task->priority }}">
                                <i class="fa-solid fa-flag"></i>
                                {{ ucfirst(__('messages.priority.' . $task->priority)) }}
                            </span>

                            @if($task->category)
                                <span class="course-tag" style="border-color: {{ $task->category->color }}40;">
                                    <span style="width:8px; height:8px; border-radius:50%; background: {{ $task->category->color }}; display:inline-block;"></span>
                                    {{ $task->category->name }}
                                </span>
                            @endif

                            @if($task->due_date)
                                @php
                                    $isToday = $task->due_date->isToday();
                                    $isOverdue = $task->due_date->isPast() && $task->status === 'pending';
                                @endphp
                                <span class="badge {{ $isOverdue ? 'badge-overdue' : ($isToday ? 'badge-today' : ($task->status === 'completed' ? 'badge-completed' : '')) }}">
                                    @if($isOverdue)
                                        <i class="fa-solid fa-circle-exclamation"></i>
                                        Terlambat ({{ $task->due_date->format('d M H:i') }})
                                    @elseif($isToday)
                                        <i class="fa-solid fa-clock"></i>
                                        Hari ini ({{ $task->due_date->format('H:i') }})
                                    @else
                                        <i class="fa-regular fa-calendar"></i>
                                        {{ $task->due_date->format('d M H:i') }}
                                    @endif
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="task-actions">
                        <button type="button" onclick="deleteTask({{ $task->id }})" class="btn-delete" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            @empty
                <div class="empty-state">
                    <i class="fa-solid fa-clipboard-list empty-icon"></i>
                    <h3>Tidak ada tugas!</h3>
                    <p>Tambahkan tugas baru untuk mulai mengorganisasi harimu.</p>
                </div>
            @endforelse
        </div>

        @if($tasks->hasPages())
            <div class="pagination">
                {{ $tasks->links() }}
            </div>
        @endif
    </section>

    <aside class="side-panel">
        <h3>Jadwal Mendatang</h3>
        @php
            $upcoming = \App\Models\Task::with('category')
                ->where('user_id', auth()->id())
                ->where('status', 'pending')
                ->whereNotNull('due_date')
                ->where('due_date', '>=', now()->startOfDay())
                ->orderBy('due_date')
                ->limit(8)
                ->get();
        @endphp
        <div class="agenda-list">
            @forelse($upcoming as $item)
                <div class="agenda-item">
                    <div class="agenda-date">
                        <div class="d">{{ $item->due_date->format('d') }}</div>
                        <div class="m">{{ $item->due_date->format('M') }}</div>
                    </div>
                    <div class="agenda-info">
                        <div class="title">{{ $item->title }}</div>
                        <div class="meta">
                            {{ $item->due_date->format('H:i') }}
                            @if($item->category) &middot; {{ $item->category->name }} @endif
                        </div>
                    </div>
                    <span class="priority-badge priority-{{ $item->priority }}">{{ ucfirst(__('messages.priority.' . $item->priority)) }}</span>
                </div>
            @empty
                <div class="agenda-empty">
                    <i class="fa-regular fa-calendar-xmark" style="font-size: 24px; display:block; margin-bottom: 8px;"></i>
                    Tidak ada jadwal mendatang.
                </div>
            @endforelse
        </div>
    </aside>
</div>
@endsection

@section('extra-scripts')
<script>
    function toggleTask(id) {
        fetch('{{ route("tasks.toggle", "__ID__") }}'.replace('__ID__', id), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            }
        }).then(() => location.reload());
    }

    function deleteTask(id) {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            fetch('{{ route("tasks.destroy", "__ID__") }}'.replace('__ID__', id), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                }
            }).then(() => location.reload());
        }
    }

    function filterTasks() {
        const params = new URLSearchParams();
        const search = document.getElementById('search-input').value;
        const status = document.getElementById('filter-status').value;
        const priority = document.getElementById('filter-priority').value;
        const category = document.getElementById('filter-category').value;
        const sort = document.getElementById('sort-by').value;

        if (search) params.append('q', search);
        if (status) params.append('status', status);
        if (priority) params.append('priority', priority);
        if (category) params.append('category_id', category);
        if (sort !== 'default') params.append('sort', sort);

        window.location.search = params.toString();
    }
</script>
@endsection