<x-guest-layout>
    <style>
        .desc { font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6; }
        .alert-status { padding: 12px 16px; border-radius: 8px; background: var(--success-bg); color: var(--success); font-size: 14px; margin-bottom: 20px; border-left: 4px solid var(--success); }
        .actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 24px; }
        .btn-primary { padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .btn-primary:hover { background: var(--primary-hover); }
        .link { color: var(--text-secondary); text-decoration: underline; font-size: 14px; background: none; border: none; cursor: pointer; }
    </style>

    <p class="desc">Terima kasih telah mendaftar! Sebelum mulai, silakan verifikasi email Anda melalui tautan yang baru saja kami kirim.</p>

    @if (session('status') == 'verification-link-sent')
        <div class="alert-status">Tautan verifikasi baru telah dikirim ke email Anda.</div>
    @endif

    <div class="actions">
        <form method="POST" action="{{ route('verification.send') }}">
            @csrf
            <button type="submit" class="btn-primary">Kirim Ulang Email</button>
        </form>

        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="link">Keluar</button>
        </form>
    </div>
</x-guest-layout>