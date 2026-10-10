<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'TaskFlow') }}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

        @vite(['resources/css/app.css', 'resources/js/app.js'])
        
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: var(--bg-primary);
                color: var(--text-primary);
                line-height: 1.5;
            }

            .guest-container {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
            }

            .guest-card {
                width: 100%;
                max-width: 440px;
                background: var(--bg-surface);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }

            .guest-header {
                text-align: center;
                margin-bottom: 32px;
            }

            .guest-logo {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                background: var(--primary);
                color: white;
                border-radius: 12px;
                font-size: 28px;
                margin-bottom: 16px;
            }

            .guest-title {
                font-size: 24px;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 8px;
            }

            .guest-subtitle {
                font-size: 14px;
                color: var(--text-secondary);
            }
        </style>
    </head>
    <body>
        <div class="guest-container">
            <div class="guest-card">
                <div class="guest-header">
                    <div class="guest-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <h1 class="guest-title">TaskFlow</h1>
                    <p class="guest-subtitle">Kelola tugas kuliah dengan mudah</p>
                </div>
                
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
