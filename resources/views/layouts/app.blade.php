<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'TaskFlow') - To-Do List</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --bg-primary: #f9f9ff;
            --bg-surface: #ffffff;
            --bg-input: #f8fafc;
            --bg-sidebar: #ffffff;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-muted: #94a3b8;
            --border-color: #e2e8f0;
            --border-hover: #cbd5e1;
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --primary-dark: #3730a3;
            --primary-light: #eef2ff;
            --danger: #ef4444;
            --danger-hover: #dc2626;
            --danger-bg: #fef2f2;
            --danger-border: #fecaca;
            --warning: #f59e0b;
            --warning-bg: #fffbeb;
            --warning-border: #fde68a;
            --success: #22c55e;
            --success-bg: #f0fdf4;
            --success-border: #bbf7d0;
            --shadow-1: 0px 1px 3px rgba(15, 23, 42, 0.05), 0px 1px 2px rgba(15, 23, 42, 0.03);
            --shadow-2: 0px 4px 6px -1px rgba(15, 23, 42, 0.07), 0px 2px 4px -2px rgba(15, 23, 42, 0.05);
            --shadow-3: 0px 10px 15px -3px rgba(15, 23, 42, 0.08), 0px 4px 6px -4px rgba(15, 23, 42, 0.03);
        }

        [data-theme="dark"] {
            --bg-primary: #0f1419;
            --bg-surface: #1a1f2e;
            --bg-input: #252d3d;
            --bg-sidebar: #0f1419;
            --text-primary: #ecf1ff;
            --text-secondary: #a8b0c5;
            --text-muted: #64748b;
            --border-color: #2a3548;
            --border-hover: #3a4555;
            --primary: #8b5cf6;
            --primary-hover: #7c3aed;
            --primary-dark: #6d28d9;
            --primary-light: #2d1f4a;
            --danger-bg: #450a0a;
            --danger-border: #7f1d1d;
            --warning-bg: #451a03;
            --warning-border: #78350f;
            --success-bg: #052e16;
            --success-border: #14532d;
            --shadow-1: 0px 1px 3px rgba(0, 0, 0, 0.3);
            --shadow-2: 0px 4px 6px -1px rgba(0, 0, 0, 0.35);
            --shadow-3: 0px 10px 15px -3px rgba(0, 0, 0, 0.4);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.5;
            transition: background-color 0.2s, color 0.2s;
        }

        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        input, select, textarea { font-family: inherit; }

        .layout {
            display: flex;
            min-height: 100vh;
        }

        .sidebar {
            width: 260px;
            flex-shrink: 0;
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border-color);
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            height: 100vh;
            overflow-y: auto;
            transition: background-color 0.2s, border-color 0.2s;
        }

        .sidebar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 8px 24px;
        }

        .sidebar-brand .brand-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: #fff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .sidebar-brand .brand-name {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex: 1;
        }

        .nav-label {
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 20px 8px 8px;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 12px;
            border-radius: 8px;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 500;
            transition: all 0.15s ease;
            min-height: 44px;
        }

        .nav-link i { width: 20px; text-align: center; font-size: 15px; color: inherit; }

        .nav-link:hover {
            background: var(--bg-input);
            color: var(--text-primary);
        }

        .nav-link.active {
            background: var(--primary-light);
            color: var(--primary);
            font-weight: 600;
            box-shadow: inset 2px 0 0 0 var(--primary);
        }

        .sidebar-footer {
            border-top: 1px solid var(--border-color);
            padding-top: 16px;
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .main {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
        }

        .topbar {
            height: 64px;
            background: var(--bg-surface);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
            position: sticky;
            top: 0;
            z-index: 50;
            transition: background-color 0.2s;
        }

        .topbar-title {
            font-size: 16px;
            font-weight: 600;
        }

        .topbar-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .btn-icon {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-size: 18px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s;
        }

        .btn-icon:hover { background: var(--bg-input); color: var(--text-primary); }

        .user-menu { position: relative; }

        .user-menu-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: transparent;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 6px 12px 6px 8px;
            cursor: pointer;
            color: var(--text-primary);
            font-size: 14px;
            font-weight: 500;
            min-height: 40px;
            transition: all 0.15s;
        }

        .user-menu-button:hover { background: var(--bg-input); }

        .user-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: var(--primary);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 600;
        }

        .user-menu-dropdown {
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            right: 0;
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: var(--shadow-3);
            min-width: 200px;
            z-index: 1000;
            padding: 4px;
            overflow: hidden;
        }

        .user-menu-dropdown.show { display: block; }

        .user-menu-dropdown a,
        .user-menu-dropdown button {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 10px 12px;
            text-align: left;
            background: transparent;
            border: none;
            border-radius: 8px;
            color: var(--text-primary);
            cursor: pointer;
            font-size: 14px;
            transition: background 0.15s;
        }

        .user-menu-dropdown a:hover,
        .user-menu-dropdown button:hover { background: var(--bg-input); }

        .user-menu-dropdown .danger { color: var(--danger); }

        .content {
            flex: 1;
            padding: 32px;
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
        }

        .alert {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid;
            font-size: 14px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }

        .alert-success { background: var(--success-bg); color: var(--success); border-left-color: var(--success); }
        .alert-danger { background: var(--danger-bg); color: var(--danger); border-left-color: var(--danger); }

        .btn {
            padding: 10px 18px;
            border-radius: 8px;
            border: none;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 44px;
            transition: all 0.15s;
        }

        .btn-primary { background: var(--primary); color: #fff; }
        .btn-primary:hover { background: var(--primary-hover); }
        .btn-primary:active { background: var(--primary-dark); }
        .btn-primary:focus-visible { outline: none; box-shadow: 0 0 0 3px #c7d2fe; }

        .btn-secondary { background: var(--primary-light); color: var(--primary); }
        .btn-secondary:hover { background: #e0e7ff; }

        [data-theme="dark"] .btn-secondary:hover { background: #312e81; }

        .btn-danger { background: var(--danger); color: #fff; }
        .btn-danger:hover { background: var(--danger-hover); }

        .btn-outline {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
        }
        .btn-outline:hover { background: var(--bg-input); border-color: var(--border-hover); }

        .btn-ghost {
            background: transparent;
            color: var(--text-secondary);
        }
        .btn-ghost:hover { background: var(--bg-input); color: var(--text-primary); }

        .card {
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: var(--shadow-1);
            transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        .form-input {
            height: 44px;
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 0 14px;
            font-size: 14px;
            color: var(--text-primary);
            outline: none;
            width: 100%;
            transition: border-color 0.15s, box-shadow 0.15s;
        }

        .form-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }

        .form-input::placeholder { color: var(--text-muted); }

        select.form-input {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            padding-right: 36px;
        }

        textarea.form-input {
            height: auto;
            min-height: 96px;
            padding: 12px 14px;
            resize: vertical;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-primary);
            margin-bottom: 6px;
        }

        .form-error {
            color: var(--danger);
            font-size: 12px;
            margin-top: 6px;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            line-height: 1;
        }

        .badge i { font-size: 11px; }

        .badge-overdue { background: var(--danger-bg); color: var(--danger); }
        .badge-today { background: var(--warning-bg); color: var(--warning); }
        .badge-completed { background: var(--success-bg); color: var(--success); }

        .priority-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            line-height: 1;
            border: 1px solid;
        }

        .priority-high { background: var(--danger-bg); color: var(--danger); border-color: var(--danger-border); }
        .priority-medium { background: var(--warning-bg); color: var(--warning); border-color: var(--warning-border); }
        .priority-low { background: var(--success-bg); color: var(--success); border-color: var(--success-border); }

        .mobile-header {
            display: none;
            background: var(--bg-surface);
            border-bottom: 1px solid var(--border-color);
            padding: 12px 16px;
            position: sticky;
            top: 0;
            z-index: 60;
            align-items: center;
            justify-content: space-between;
        }

        .mobile-header .brand {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 700;
            font-size: 16px;
        }

        .mobile-header .brand-icon {
            width: 32px;
            height: 32px;
            background: var(--primary);
            color: #fff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        .sidebar-backdrop {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.4);
            z-index: 70;
        }

        .sidebar-backdrop.show { display: block; }

        @media (max-width: 1023px) {
            .sidebar {
                position: fixed;
                left: 0;
                top: 0;
                bottom: 0;
                z-index: 80;
                transform: translateX(-100%);
                transition: transform 0.2s;
                height: 100vh;
            }

            .sidebar.open { transform: translateX(0); }

            .mobile-header { display: flex; }

            .topbar { display: none; }

            .content { padding: 20px 16px; }
        }

        @media (max-width: 640px) {
            .content { padding: 16px 12px; }
        }
    </style>
    @yield('extra-styles')
</head>
<body @if(auth()->check() && auth()->user()->theme === 'dark') data-theme="dark" @endif>
    <div class="layout">
        <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="closeSidebar()"></div>

        <aside class="sidebar" id="sidebar">
            <div class="sidebar-brand">
                <div class="brand-icon">
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <span class="brand-name">TaskFlow</span>
            </div>

            <nav class="sidebar-nav">
                <span class="nav-label">Menu Utama</span>
                <a href="{{ route('tasks.index') }}" class="nav-link {{ request()->routeIs('tasks.index') ? 'active' : '' }}">
                    <i class="fa-solid fa-house"></i> Dasbor
                </a>
                <a href="{{ route('tasks.index') }}?status=pending" class="nav-link {{ request('status') === 'pending' ? 'active' : '' }}">
                    <i class="fa-solid fa-clock"></i> Tugas Aktif
                </a>
                <a href="{{ route('tasks.index') }}?status=completed" class="nav-link {{ request('status') === 'completed' ? 'active' : '' }}">
                    <i class="fa-solid fa-circle-check"></i> Selesai
                </a>

                <span class="nav-label">Pengaturan</span>
                <a href="{{ route('categories.index') }}" class="nav-link {{ request()->routeIs('categories.*') ? 'active' : '' }}">
                    <i class="fa-solid fa-tags"></i> Kategori
                </a>
                <a href="{{ route('profile.edit') }}" class="nav-link {{ request()->routeIs('profile.*') ? 'active' : '' }}">
                    <i class="fa-solid fa-user"></i> Profil
                </a>
            </nav>

            <div class="sidebar-footer">
                <button class="nav-link" style="width:100%; border:none; background:transparent; cursor:pointer;" onclick="toggleTheme()">
                    <i class="fa-solid fa-moon" id="sidebar-theme-icon"></i> <span id="sidebar-theme-label">Mode Gelap</span>
                </button>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="nav-link" style="width:100%; border:none; background:transparent; cursor:pointer; color: var(--danger);">
                        <i class="fa-solid fa-right-from-bracket"></i> Keluar
                    </button>
                </form>
            </div>
        </aside>

        <div class="main">
            <header class="mobile-header">
                <div class="brand">
                    <div class="brand-icon"><i class="fa-solid fa-list-check"></i></div>
                    TaskFlow
                </div>
                <button class="btn-icon" onclick="openSidebar()"><i class="fa-solid fa-bars"></i></button>
            </header>

            <header class="topbar">
                <span class="topbar-title">@yield('title', 'Dasbor')</span>
                <div class="topbar-actions">
                    <button class="btn-icon" title="Ubah tema" onclick="toggleTheme()">
                        <i class="fa-solid fa-moon" id="theme-toggle"></i>
                    </button>
                    <div class="user-menu">
                        <button class="user-menu-button" onclick="toggleUserMenu()">
                            <span class="user-avatar">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</span>
                            <span>{{ auth()->user()->name }}</span>
                            <i class="fa-solid fa-chevron-down" style="font-size: 11px; color: var(--text-muted);"></i>
                        </button>
                        <div class="user-menu-dropdown" id="user-menu-dropdown">
                            <a href="{{ route('profile.edit') }}"><i class="fa-solid fa-cog" style="width:16px;"></i> Profil</a>
                            <form method="POST" action="{{ route('logout') }}" style="margin: 0;">
                                @csrf
                                <button type="submit" class="danger"><i class="fa-solid fa-right-from-bracket" style="width:16px;"></i> Keluar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <main class="content">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <i class="fa-solid fa-circle-exclamation" style="margin-top: 2px;"></i>
                        <div>
                            <strong>Ada kesalahan:</strong>
                            <ul style="margin-top: 4px; margin-left: 18px;">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                @endif

                @if (session('success'))
                    <div class="alert alert-success">
                        <i class="fa-solid fa-circle-check" style="margin-top: 2px;"></i>
                        <div>
                            {{ session('success') }}
                            @if (session('undo_task_id'))
                                <form method="POST" action="{{ route('tasks.restore', session('undo_task_id')) }}" style="display:inline; margin-left:8px;">
                                    @csrf
                                    <button type="submit" style="background:none; border:none; color: var(--primary); font-weight:600; cursor:pointer; font-size:14px; text-decoration:underline; font-family:inherit;">
                                        Batalkan
                                    </button>
                                </form>
                            @endif
                        </div>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <script>
        function toggleTheme() {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? '' : 'dark';
            if (newTheme) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
            }
            localStorage.setItem('taskflow_theme', newTheme);
            updateThemeIcons(!isDark);

            fetch('{{ route("preferences.update") }}', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ theme: newTheme })
            });
        }

        function updateThemeIcons(dark) {
            const sun = '<i class="fa-solid fa-sun"></i>';
            const moon = '<i class="fa-solid fa-moon"></i>';
            const topIcon = document.getElementById('theme-toggle');
            if (topIcon) topIcon.outerHTML = (dark ? sun : moon).replace('<i', '<i id="theme-toggle"');
            const sideIcon = document.getElementById('sidebar-theme-icon');
            if (sideIcon) sideIcon.outerHTML = (dark ? sun : moon).replace('<i', '<i id="sidebar-theme-icon"');
            const sideLabel = document.getElementById('sidebar-theme-label');
            if (sideLabel) sideLabel.textContent = dark ? 'Mode Terang' : 'Mode Gelap';
        }

        function toggleUserMenu() {
            document.getElementById('user-menu-dropdown').classList.toggle('show');
        }

        function openSidebar() {
            document.getElementById('sidebar').classList.add('open');
            document.getElementById('sidebar-backdrop').classList.add('show');
        }

        function closeSidebar() {
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebar-backdrop').classList.remove('show');
        }

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu')) {
                const dd = document.getElementById('user-menu-dropdown');
                if (dd) dd.classList.remove('show');
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('taskflow_theme');
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                updateThemeIcons(true);
            }
        });
    </script>

    @yield('extra-scripts')
</body>
</html>