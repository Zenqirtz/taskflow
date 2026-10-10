<x-guest-layout>
    <style>
        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--bg-surface);
            color: var(--text-primary);
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-input::placeholder {
            color: var(--text-muted);
        }

        .form-error {
            color: var(--danger);
            font-size: 12px;
            margin-top: 6px;
        }

        .form-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
        }

        .form-checkbox input[type="checkbox"] {
            width: 18px;
            height: 18px;
            border: 2px solid var(--border-color);
            border-radius: 4px;
            cursor: pointer;
            accent-color: var(--primary);
        }

        .form-checkbox label {
            font-size: 14px;
            color: var(--text-secondary);
            cursor: pointer;
        }

        .form-actions {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .btn-primary {
            width: 100%;
            padding: 12px 24px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }

        .btn-primary:hover {
            background: var(--primary-hover);
        }

        .form-link {
            text-align: center;
            font-size: 14px;
            color: var(--text-secondary);
        }

        .form-link a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }

        .form-link a:hover {
            text-decoration: underline;
        }

        .alert-status {
            padding: 12px 16px;
            border-radius: 8px;
            background: var(--success-light);
            color: var(--success);
            font-size: 14px;
            margin-bottom: 20px;
            border-left: 4px solid var(--success);
        }
    </style>

    @if (session('status'))
        <div class="alert-status">
            {{ session('status') }}
        </div>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
                id="email" 
                class="form-input" 
                type="email" 
                name="email" 
                value="{{ old('email') }}" 
                placeholder="nama@example.com"
                required 
                autofocus 
                autocomplete="username"
            />
            @error('email')
                <p class="form-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
                id="password" 
                class="form-input" 
                type="password" 
                name="password" 
                placeholder="Masukkan password"
                required 
                autocomplete="current-password"
            />
            @error('password')
                <p class="form-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="form-checkbox">
            <input id="remember_me" type="checkbox" name="remember">
            <label for="remember_me">Ingat saya</label>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn-primary">
                Masuk
            </button>

            <div class="form-link">
                Belum punya akun? <a href="{{ route('register') }}">Daftar sekarang</a>
            </div>

            @if (Route::has('password.request'))
                <div class="form-link">
                    <a href="{{ route('password.request') }}">Lupa password?</a>
                </div>
            @endif
        </div>
    </form>
</x-guest-layout>
