<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'theme' => ['required', 'in:light,dark,system'],
        ]);

        $user = $request->user();
        $user->theme = $request->theme;
        $user->save();

        return response()->json([
            'message' => 'Preferensi berhasil diperbarui.',
            'theme' => $user->theme,
        ]);
    }
}
