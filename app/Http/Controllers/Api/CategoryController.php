<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryController extends Controller
{
    private function currentUser(Request $request): User
    {
        return $request->user() ?? User::first();
    }

    public function index(Request $request): JsonResource
    {
        $categories = $this->currentUser($request)
            ->categories()
            ->orderBy('name')
            ->get();

        return JsonResource::collection($categories);
    }
}
