@extends('layouts.app')

@section('title', 'Profil Saya')

@section('extra-styles')
<style>
    .profile-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        max-width: 720px;
    }

    .profile-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        box-shadow: var(--shadow-1);
    }

    .profile-card h2 {
        font-size: 18px;
        font-weight: 600;
    }

    .profile-card .desc {
        font-size: 14px;
        color: var(--text-secondary);
        margin-top: 4px;
        margin-bottom: 20px;
    }

    .form-group { margin-bottom: 16px; }

    .form-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 6px;
    }

    .form-error { color: var(--danger); font-size: 12px; margin-top: 6px; }

    .form-row { display: flex; align-items: center; gap: 12px; }

    .status-flash {
        color: var(--success);
        font-size: 14px;
    }

    .delete-modal {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.4);
        z-index: 100;
        align-items: center;
        justify-content: center;
        padding: 16px;
    }

    .delete-modal.show { display: flex; }

    .delete-modal-box {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        max-width: 420px;
        width: 100%;
        box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1);
    }

    .delete-modal-box h2 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .delete-modal-box p {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 16px;
    }

    .modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
</style>
@endsection

@section('content')
<div class="profile-grid">
    <div class="profile-card">
        <h2>Informasi Profil</h2>
        <p class="desc">Perbarui informasi profil dan alamat email akun Anda.</p>

        <form method="post" action="{{ route('profile.update') }}">
            @csrf
            @method('patch')

            <div class="form-group">
                <label for="name" class="form-label">Nama</label>
                <input id="name" name="name" type="text" class="form-input" value="{{ old('name', $user->name) }}" required autofocus autocomplete="name">
                @error('name') <p class="form-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input id="email" name="email" type="email" class="form-input" value="{{ old('email', $user->email) }}" required autocomplete="username">
                @error('email') <p class="form-error">{{ $message }}</p> @enderror
            </div>

            <div class="form-row">
                <button type="submit" class="btn btn-primary">Simpan</button>
                @if (session('status') === 'profile-updated')
                    <span class="status-flash">Tersimpan.</span>
                @endif
            </div>
        </form>
    </div>

    <div class="profile-card">
        <h2>Perbarui Password</h2>
        <p class="desc">Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.</p>

        <form method="post" action="{{ route('password.update') }}">
            @csrf
            @method('put')

            <div class="form-group">
                <label for="update_password_current_password" class="form-label">Password Saat Ini</label>
                <input id="update_password_current_password" name="current_password" type="password" class="form-input" autocomplete="current-password">
                @if ($errors->updatePassword->has('current_password'))
                    <p class="form-error">{{ $errors->updatePassword->first('current_password') }}</p>
                @endif
            </div>

            <div class="form-group">
                <label for="update_password_password" class="form-label">Password Baru</label>
                <input id="update_password_password" name="password" type="password" class="form-input" autocomplete="new-password">
                @if ($errors->updatePassword->has('password'))
                    <p class="form-error">{{ $errors->updatePassword->first('password') }}</p>
                @endif
            </div>

            <div class="form-group">
                <label for="update_password_password_confirmation" class="form-label">Konfirmasi Password</label>
                <input id="update_password_password_confirmation" name="password_confirmation" type="password" class="form-input" autocomplete="new-password">
            </div>

            <div class="form-row">
                <button type="submit" class="btn btn-primary">Simpan</button>
                @if (session('status') === 'password-updated')
                    <span class="status-flash">Tersimpan.</span>
                @endif
            </div>
        </form>
    </div>

    <div class="profile-card">
        <h2>Hapus Akun</h2>
        <p class="desc">Setelah akun dihapus, seluruh sumber daya dan datanya akan dihapus secara permanen.</p>

        <button type="button" class="btn btn-danger" onclick="document.getElementById('delete-modal').classList.add('show')">
            Hapus Akun
        </button>
    </div>
</div>

<div class="delete-modal" id="delete-modal">
    <div class="delete-modal-box">
        <h2>Yakin ingin menghapus akun?</h2>
        <p>Seluruh data akan dihapus permanen. Masukkan password untuk konfirmasi.</p>
        <form method="post" action="{{ route('profile.destroy') }}">
            @csrf
            @method('delete')
            <input name="password" type="password" class="form-input" placeholder="Password" required>
            @error('password', 'userDeletion') <p class="form-error">{{ $message }}</p> @enderror
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" onclick="document.getElementById('delete-modal').classList.remove('show')">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Akun</button>
            </div>
        </form>
    </div>
</div>
@endsection