<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TaskFlow - Student Task Manager</title>
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            :root {
                --bg-primary: #f9f9ff;
                --bg-surface: #ffffff;
                --text-primary: #1e293b;
                --text-secondary: #64748b;
                --border-color: #e2e8f0;
                --primary: #4f46e5;
                --primary-hover: #4338ca;
                --primary-light: #eef2ff;
            }

            * { margin: 0; padding: 0; box-sizing: border-box; }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: var(--bg-primary);
                color: var(--text-primary);
                line-height: 1.5;
            }

            .nav {
                background: var(--bg-surface);
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 0;
                z-index: 50;
            }

            .nav-inner {
                max-width: 1200px;
                margin: 0 auto;
                padding: 16px 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .brand {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 18px;
                font-weight: 700;
                text-decoration: none;
                color: inherit;
            }

            .brand-icon {
                width: 36px;
                height: 36px;
                background: var(--primary);
                color: #fff;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }

            .nav-links { display: flex; gap: 12px; align-items: center; }

            .btn {
                padding: 10px 18px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                min-height: 44px;
                transition: all 0.15s;
                border: none;
                cursor: pointer;
            }

            .btn-primary { background: var(--primary); color: #fff; }
            .btn-primary:hover { background: var(--primary-hover); }

            .btn-ghost { background: transparent; color: var(--text-secondary); }
            .btn-ghost:hover { background: var(--primary-light); color: var(--primary); }

            .hero {
                max-width: 800px;
                margin: 0 auto;
                padding: 96px 24px 64px;
                text-align: center;
            }

            .hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: var(--primary-light);
                color: var(--primary);
                font-size: 12px;
                font-weight: 600;
                padding: 6px 14px;
                border-radius: 9999px;
                margin-bottom: 24px;
            }

            .hero h1 {
                font-size: 44px;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 16px;
                color: var(--text-primary);
            }

            .hero p {
                font-size: 18px;
                color: var(--text-secondary);
                margin-bottom: 32px;
            }

            .features {
                max-width: 1200px;
                margin: 0 auto;
                padding: 48px 24px 96px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 24px;
            }

            .feature-card {
                background: var(--bg-surface);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 28px;
                box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
            }

            .feature-icon {
                width: 48px;
                height: 48px;
                border-radius: 10px;
                background: var(--primary-light);
                color: var(--primary);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                margin-bottom: 16px;
            }

            .feature-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .feature-desc {
                font-size: 14px;
                color: var(--text-secondary);
            }

            .footer {
                border-top: 1px solid var(--border-color);
                background: var(--bg-surface);
                padding: 32px 24px;
                text-align: center;
                font-size: 13px;
                color: var(--text-secondary);
            }

            @media (max-width: 640px) {
                .hero h1 { font-size: 32px; }
                .hero p { font-size: 16px; }
            }
        </style>
    </head>
    <body>
        <nav class="nav">
            <div class="nav-inner">
                <a href="/" class="brand">
                    <div class="brand-icon"><i class="fa-solid fa-list-check"></i></div>
                    TaskFlow
                </a>
                <div class="nav-links">
                    @auth
                        <a href="{{ route('tasks.index') }}" class="btn btn-primary">Buka Dasbor</a>
                    @else
                        <a href="{{ route('login') }}" class="btn btn-ghost">Masuk</a>
                        <a href="{{ route('register') }}" class="btn btn-primary">Daftar</a>
                    @endauth
                </div>
            </div>
        </nav>

        <section class="hero">
            <span class="hero-badge"><i class="fa-solid fa-graduation-cap"></i> Dirancang Khusus Mahasiswa</span>
            <h1>Kelola Tugas Kuliah Tanpa Beban Kognitif</h1>
            <p>TaskFlow menyederhanakan tenggat waktu, mata kuliah, dan jadwal akademik ke dalam antarmuka tenang yang bebas dari gangguan visual.</p>
            @auth
                <a href="{{ route('tasks.index') }}" class="btn btn-primary" style="padding: 14px 28px; font-size: 16px;">Buka Dasbor Sekarang</a>
            @else
                <a href="{{ route('register') }}" class="btn btn-primary" style="padding: 14px 28px; font-size: 16px;">Mulai Gratis</a>
            @endauth
        </section>

        <section class="features">
            <div class="feature-card">
                <div class="feature-icon"><i class="fa-solid fa-bolt"></i></div>
                <h3 class="feature-title">Input Cepat</h3>
                <p class="feature-desc">Tambah tugas dalam hitungan detik. Cukup ketik judul dan tekan Enter.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon"><i class="fa-solid fa-layer-group"></i></div>
                <h3 class="feature-title">Filter Mata Kuliah</h3>
                <p class="feature-desc">Kategorisasi per mata kuliah dengan kode warna intuitif dan status prioritas.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon"><i class="fa-solid fa-calendar-check"></i></div>
                <h3 class="feature-title">Panel Jadwal</h3>
                <p class="feature-desc">Pantau deadline terdekat secara real-time tanpa kehilangan gambaran besar tugas.</p>
            </div>
        </section>

        <footer class="footer">
            <p>&copy; {{ date('Y') }} TaskFlow. Academic Productivity Workspace.</p>
        </footer>
    </body>
</html>