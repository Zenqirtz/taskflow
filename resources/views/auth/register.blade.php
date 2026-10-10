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

        .form-actions {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 24px;
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
    </style>

    <form method="POST" action="{{ route('register') }}">
        @csrf

        <div class="form-group">
            <label for="name" class="form-label">Nama Lengkap</label>
            <input 
                id="name" 
                class="form-input" 
                type="text" 
                name="name" 
                value="{{ old('name') }}" 
                placeholder="Masukkan nama lengkap"
                required 
                autofocus 
                autocomplete="name"
            />
            @error('name')
                <p class="form-error">{{ $message }}</p>
            @enderror
        </div>

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
                placeholder="Minimal 8 karakter"
                required 
                autocomplete="new-password"
            />
            @error('password')
                <p class="form-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="form-group">
            <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
            <input 
                id="password_confirmation" 
                class="form-input" 
                type="password" 
                name="password_confirmation" 
                placeholder="Masukkan ulang password"
                required 
                autocomplete="new-password"
            />
            @error('password_confirmation')
                <p class="form-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="form-actions">
            <button type="submit" class="btn-primary">
                Daftar
            </button>

            <div class="form-link">
                Sudah punya akun? <a href="{{ route('login') }}">Masuk sekarang</a>
            </div>
        </div>
    </form>
</x-guest-layout>
