<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request): Response
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response([
            'user' => $user,
            'token' => 'dummy-token-'.$user->id,
        ], 201);
    }

    /**
     * Login user.
     *
     * @throws ValidationException
     */
    public function login(Request $request): Response
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        return response([
            'user' => $user,
            'token' => 'dummy-token-'.$user->id,
        ]);
    }

    /**
     * Logout user.
     */
    public function logout(Request $request): Response
    {
        return response()->noContent();
    }

    /**
     * Get authenticated user.
     */
    public function user(Request $request): Response
    {
        return response([
            'user' => $request->user(),
        ]);
    }
}
