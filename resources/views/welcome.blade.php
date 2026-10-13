<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TaskFlow - Organize your work and life.</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500;1,6..72,600&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }

            body {
                font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background-color: #0f1419;
                color: #ecf1ff;
                overflow-x: hidden;
                min-height: 100vh;
            }

            .outer-stage {
                position: relative;
                min-height: 100vh;
                background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #131824 100%);
                padding-bottom: 80px;
            }

            .vortex-graphic {
                position: absolute;
                top: 320px;
                left: 50%;
                transform: translateX(-50%);
                width: 900px;
                max-width: 96vw;
                height: 480px;
                pointer-events: none;
                z-index: 1;
                opacity: 0.9;
            }

            .vortex-arc {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 760px;
                max-width: 90vw;
                height: 360px;
                border-radius: 500px 500px 0 0;
                border: 4px solid transparent;
                border-top: 5px solid rgba(178, 95, 255, 0.6);
                box-shadow: 
                    0 -8px 45px rgba(178, 95, 255, 0.4),
                    0 -24px 90px rgba(139, 92, 246, 0.25),
                    inset 0 10px 40px rgba(168, 85, 247, 0.15);
                filter: blur(0.5px);
            }

            .vortex-inner-glow {
                position: absolute;
                top: 30px;
                left: 50%;
                transform: translateX(-50%);
                width: 640px;
                max-width: 84vw;
                height: 300px;
                border-radius: 500px 500px 0 0;
                border-top: 3px solid rgba(196, 181, 253, 0.4);
                box-shadow: 0 -12px 60px rgba(139, 92, 246, 0.35);
            }

            .navbar {
                position: relative;
                z-index: 30;
                max-width: 1200px;
                margin: 0 auto;
                padding: 28px 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .brand {
                font-size: 22px;
                font-weight: 700;
                letter-spacing: -0.5px;
                color: #ffffff;
                text-decoration: none;
                display: inline-flex;
                align-items: baseline;
                gap: 6px;
            }

            .brand .dot {
                color: #a855f7;
                font-size: 24px;
            }

            .nav-menu {
                display: flex;
                align-items: center;
                gap: 32px;
                list-style: none;
            }

            .nav-menu a {
                color: #a8b0c5;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                transition: color 0.15s ease;
            }

            .nav-menu a:hover {
                color: #ffffff;
            }

            .nav-actions {
                display: flex;
                align-items: center;
                gap: 20px;
            }

            .login-link {
                color: #c4cad4;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                transition: color 0.15s ease;
            }

            .login-link:hover {
                color: #ffffff;
            }

            .divider {
                width: 1px;
                height: 18px;
                background-color: rgba(255, 255, 255, 0.1);
            }

            .btn-pill {
                background: linear-gradient(180deg, #ffffff 0%, #ececec 100%);
                color: #111319;
                font-size: 14px;
                font-weight: 600;
                padding: 10px 24px;
                border-radius: 9999px;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 24px rgba(168, 85, 247, 0.25), 0 2px 8px rgba(0, 0, 0, 0.4);
                transition: transform 0.15s ease, box-shadow 0.15s ease;
                border: 1px solid rgba(255, 255, 255, 0.9);
            }

            .btn-pill:hover {
                transform: translateY(-1px);
                box-shadow: 0 0 32px rgba(168, 85, 247, 0.35), 0 4px 12px rgba(0, 0, 0, 0.5);
            }

            .hero-section {
                position: relative;
                z-index: 20;
                max-width: 900px;
                margin: 0 auto;
                text-align: center;
                padding: 40px 32px 20px;
            }

            .customer-badge {
                display: inline-flex;
                align-items: center;
                gap: 12px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 9999px;
                padding: 5px 14px 5px 6px;
                margin-bottom: 36px;
                backdrop-filter: blur(10px);
            }

            .avatar-cluster {
                display: flex;
                align-items: center;
            }

            .avatar-cluster img,
            .avatar-cluster .avatar-dot {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 2px solid #1a1f2e;
                margin-left: -8px;
                object-fit: cover;
                background-color: #2d3748;
            }

            .avatar-cluster img:first-child,
            .avatar-cluster .avatar-dot:first-child {
                margin-left: 0;
            }

            .star-rating {
                display: flex;
                align-items: center;
                gap: 2px;
                color: #d1d5db;
                font-size: 11px;
            }

            .customer-label {
                font-size: 12px;
                color: #c2c8d4;
                font-weight: 500;
                margin-left: 4px;
            }

            .hero-title {
                font-size: 64px;
                font-weight: 700;
                line-height: 1.1;
                letter-spacing: -1.5px;
                color: #ffffff;
                margin-bottom: 20px;
            }

            .hero-title .serif-highlight {
                font-family: 'Newsreader', serif;
                font-style: italic;
                font-weight: 400;
                color: #e9d5ff;
                letter-spacing: -0.5px;
                padding: 0 2px;
            }

            .hero-subtitle {
                font-size: 16px;
                line-height: 1.6;
                color: #a8b0c5;
                max-width: 520px;
                margin: 0 auto 34px;
                font-weight: 400;
            }

            .cta-hero {
                font-size: 15px;
                padding: 14px 34px;
                min-width: 220px;
                border-radius: 9999px;
                background: linear-gradient(180deg, #f6ede9 0%, #e2d1cb 100%);
                color: #17161b;
                font-weight: 600;
                box-shadow: 0 0 45px rgba(245, 175, 160, 0.35), 0 8px 24px rgba(0, 0, 0, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.6);
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.15s ease;
            }

            .cta-hero:hover {
                transform: translateY(-2px);
                box-shadow: 0 0 55px rgba(245, 175, 160, 0.45), 0 12px 32px rgba(0, 0, 0, 0.7);
            }

            .preview-wrap {
                position: relative;
                z-index: 25;
                max-width: 1140px;
                margin: 64px auto 0;
                padding: 0 20px;
            }

            .app-window {
                background: rgba(26, 31, 46, 0.92);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 20px;
                box-shadow: 
                    0 25px 60px -15px rgba(0, 0, 0, 0.95),
                    0 0 50px rgba(168, 85, 247, 0.1);
                backdrop-filter: blur(24px);
                overflow: hidden;
                display: grid;
                grid-template-columns: 280px 1fr;
                min-height: 540px;
            }

            .app-sidebar {
                border-right: 1px solid rgba(255, 255, 255, 0.06);
                background: rgba(15, 20, 25, 0.8);
                padding: 24px 20px;
                display: flex;
                flex-direction: column;
                gap: 28px;
            }

            .sidebar-user {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 4px;
            }

            .user-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                background: linear-gradient(135deg, #a855f7, #7c3aed);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 700;
                color: #fff;
                flex-shrink: 0;
            }

            .user-name {
                font-size: 13px;
                font-weight: 600;
                color: #ecf1ff;
            }

            .sidebar-icon-btn {
                color: #a8b0c5;
                font-size: 16px;
                cursor: pointer;
                background: none;
                border: none;
                padding: 4px;
                transition: color 0.15s ease;
            }

            .sidebar-icon-btn:hover {
                color: #ffffff;
            }

            .btn-add-task {
                background: transparent;
                border: none;
                color: #ef4444;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 8px;
                cursor: pointer;
                border-radius: 8px;
                transition: background-color 0.15s ease;
            }

            .btn-add-task:hover {
                background: rgba(239, 68, 68, 0.06);
            }

            .btn-add-task .icon-plus {
                width: 24px;
                height: 24px;
                background: #ef4444;
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                flex-shrink: 0;
            }

            .sidebar-menu {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .sidebar-link {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 500;
                color: #a8b0c5;
                text-decoration: none;
                transition: all 0.15s ease;
            }

            .sidebar-link:hover {
                background: rgba(255, 255, 255, 0.06);
                color: #ffffff;
            }

            .sidebar-link.active {
                background: rgba(168, 85, 247, 0.1);
                color: #ffffff;
            }

            .sidebar-link .badge {
                width: 22px;
                height: 22px;
                border-radius: 5px;
                background: #ef4444;
                color: #ffffff;
                font-size: 10px;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .sidebar-link i {
                font-size: 16px;
                width: 20px;
                text-align: center;
            }

            .app-main {
                padding: 40px 44px;
                background: transparent;
                display: flex;
                flex-direction: column;
            }

            .main-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 28px;
            }

            .page-title {
                font-size: 28px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.5px;
            }

            .view-action {
                font-size: 13px;
                color: #a8b0c5;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                text-decoration: none;
                cursor: pointer;
            }

            .view-action:hover {
                color: #ecf1ff;
            }

            .project-label {
                font-size: 12px;
                font-weight: 600;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 16px;
            }

            .task-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .task-item {
                display: flex;
                align-items: flex-start;
                gap: 14px;
                padding: 14px;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.05);
                transition: all 0.15s ease;
            }

            .task-item:hover {
                background: rgba(255, 255, 255, 0.04);
                border-color: rgba(255, 255, 255, 0.1);
            }

            .task-checkbox {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 1.5px solid #6b7280;
                cursor: pointer;
                margin-top: 2px;
                flex-shrink: 0;
                transition: all 0.15s ease;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .task-checkbox:hover {
                border-color: #a855f7;
            }

            .task-checkbox.checked {
                background: #a855f7;
                border-color: #a855f7;
                color: #ffffff;
                font-size: 10px;
            }

            .task-body {
                flex: 1;
            }

            .task-title-row {
                font-size: 14px;
                color: #ecf1ff;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 5px;
            }

            .task-meta-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;
            }

            .task-time {
                color: #34d399;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                font-weight: 500;
            }

            .task-tag {
                color: #f87171;
                font-size: 12px;
                font-weight: 500;
            }

            .task-tag.blue {
                color: #60a5fa;
            }

            .task-tag.amber {
                color: #fbbf24;
            }

            .footer-strip {
                margin-top: 80px;
                text-align: center;
                font-size: 13px;
                color: #6b7280;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                padding-top: 28px;
            }

            @media (max-width: 1024px) {
                .hero-title { font-size: 48px; }
                .nav-menu { display: none; }
                .app-window { grid-template-columns: 1fr; }
                .app-sidebar { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
            }

            @media (max-width: 768px) {
                .hero-title { font-size: 32px; }
                .navbar { padding: 20px 16px; }
                .app-main { padding: 24px 20px; }
                .page-title { font-size: 20px; }
            }
        </style>
    </head>
    <body>
        <div class="outer-stage">
            <div class="vortex-graphic">
                <div class="vortex-arc"></div>
                <div class="vortex-inner-glow"></div>
            </div>

            <header class="navbar">
                <a href="/" class="brand">
                    taskflow<span class="dot">.</span>
                </a>

                <ul class="nav-menu">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#tasks">For Teams</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#resources">Resources</a></li>
                </ul>

                <div class="nav-actions">
                    @auth
                        <a href="{{ route('tasks.index') }}" class="btn-pill">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="login-link">Login</a>
                        <div class="divider"></div>
                        <a href="{{ route('register') }}" class="btn-pill">Start Free</a>
                    @endauth
                </div>
            </header>

            <main class="hero-section">
                <div class="customer-badge">
                    <div class="avatar-cluster">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Customer">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Customer">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Customer">
                    </div>
                    <div class="star-rating">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <span class="customer-label">100K+ Satisfied Customers</span>
                </div>

                <h1 class="hero-title">
                    Organize your<br>
                    <span class="serif-highlight">work</span> and <span class="serif-highlight">life.</span>
                </h1>

                <p class="hero-subtitle">
                    Simplify life for both you and your team.<br>
                    The most productive todo list app.
                </p>

                @auth
                    <a href="{{ route('tasks.index') }}" class="cta-hero">Open your workspace</a>
                @else
                    <a href="{{ route('register') }}" class="cta-hero">Start your free trial</a>
                @endauth
            </main>

            <section class="preview-wrap" id="features">
                <div class="app-window">
                    <aside class="app-sidebar">
                        <div class="sidebar-user">
                            <div class="user-info">
                                <div class="user-avatar">D</div>
                                <span class="user-name">Denise</span>
                            </div>
                            <button type="button" class="sidebar-icon-btn" aria-label="Menu">
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>

                        @auth
                            <a href="{{ route('tasks.index') }}" class="btn-add-task">
                                <span class="icon-plus"><i class="fa-solid fa-plus"></i></span>
                                Add task
                            </a>
                        @else
                            <a href="{{ route('register') }}" class="btn-add-task">
                                <span class="icon-plus"><i class="fa-solid fa-plus"></i></span>
                                Add task
                            </a>
                        @endauth

                        <ul class="sidebar-menu">
                            <li><a href="#search" class="sidebar-link"><i class="fa-solid fa-magnifying-glass"></i> Search</a></li>
                            <li><a href="#inbox" class="sidebar-link"><i class="fa-solid fa-inbox"></i> Inbox</a></li>
                            <li><a href="#today" class="sidebar-link active"><span class="badge">21</span> Today</a></li>
                            <li><a href="#upcoming" class="sidebar-link"><i class="fa-regular fa-calendar"></i> Upcoming</a></li>
                        </ul>
                    </aside>

                    <div class="app-main">
                        <div class="main-header">
                            <h2 class="page-title">Today</h2>
                            <div class="view-action">
                                <i class="fa-solid fa-sliders"></i> View
                            </div>
                        </div>

                        <div class="project-label">My Projects</div>

                        <div class="task-list">
                            <div class="task-item">
                                <button type="button" class="task-checkbox" aria-label="Task"></button>
                                <div class="task-body">
                                    <div class="task-title-row">
                                        <span>Do 30 minutes of yoga</span>
                                        <span>🧘</span>
                                    </div>
                                    <div class="task-meta-row">
                                        <span class="task-time"><i class="fa-solid fa-clock"></i> 7:30 AM</span>
                                        <span class="task-tag"># Fitness</span>
                                    </div>
                                </div>
                            </div>

                            <div class="task-item">
                                <button type="button" class="task-checkbox" aria-label="Task"></button>
                                <div class="task-body">
                                    <div class="task-title-row">
                                        <span>Doctor appointment</span>
                                        <span>🩺</span>
                                    </div>
                                    <div class="task-meta-row">
                                        <span class="task-time" style="color: #a8b0c5;"><i class="fa-solid fa-clock"></i> 11:00 AM</span>
                                        <span class="task-tag blue"># Health</span>
                                    </div>
                                </div>
                            </div>

                            <div class="task-item">
                                <button type="button" class="task-checkbox" aria-label="Task"></button>
                                <div class="task-body">
                                    <div class="task-title-row">
                                        <span>Review team sprint objectives</span>
                                    </div>
                                    <div class="task-meta-row">
                                        <span class="task-time" style="color: #a8b0c5;"><i class="fa-solid fa-clock"></i> 02:30 PM</span>
                                        <span class="task-tag amber"># Work</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer-strip">
                <p>&copy; {{ date('Y') }} TaskFlow. Organize your work and life.</p>
            </footer>
        </div>

        <script>
            document.querySelectorAll('.task-checkbox').forEach(box => {
                box.addEventListener('click', () => {
                    box.classList.toggle('checked');
                    if (box.classList.contains('checked')) {
                        box.innerHTML = '<i class="fa-solid fa-check"></i>';
                    } else {
                        box.innerHTML = '';
                    }
                });
            });
        </script>
    </body>
</html>
