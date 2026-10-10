<x-guest-layout>
    <style>
        .form-desc {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .form-group { margin-bottom: 20px; }

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

        .form-error { color: var(--danger); font-size: 12px; margin-top: 6px; }

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

        .btn-primary:hover { background: var(--primary-hover); }

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
        <div class="alert-status">{{ session('status') }}</div>
    @endif

    <p class="form-desc">Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.</p>

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input id="email" class="form-input" type="email" name="email" value="{{ old('email') }}" placeholder="nama@example.com" required autofocus />
            @error('email')
                <p class="form-error">{{ $message }}</p>
            @enderror
        </div>

        <button type="submit" class="btn-primary">Kirim Tautan Reset Password</button>
    </form>
</x-guest-layout>