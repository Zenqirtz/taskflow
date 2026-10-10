<x-guest-layout>
    <style>
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-surface); color: var(--text-primary); font-size: 14px; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
        .form-error { color: var(--danger); font-size: 12px; margin-top: 6px; }
        .btn-primary { width: 100%; padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn-primary:hover { background: var(--primary-hover); }
    </style>

    <form method="POST" action="{{ route('password.store') }}">
        @csrf
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input id="email" class="form-input" type="email" name="email" value="{{ old('email', $request->email) }}" required autofocus autocomplete="username">
            @error('email') <p class="form-error">{{ $message }}</p> @enderror
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Password Baru</label>
            <input id="password" class="form-input" type="password" name="password" required autocomplete="new-password">
            @error('password') <p class="form-error">{{ $message }}</p> @enderror
        </div>

        <div class="form-group">
            <label for="password_confirmation" class="form-label">Konfirmasi Password Baru</label>
            <input id="password_confirmation" class="form-input" type="password" name="password_confirmation" required autocomplete="new-password">
            @error('password_confirmation') <p class="form-error">{{ $message }}</p> @enderror
        </div>

        <button type="submit" class="btn-primary">Reset Password</button>
    </form>
</x-guest-layout>