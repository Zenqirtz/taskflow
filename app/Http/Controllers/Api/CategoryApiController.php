<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CategoryApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $categories = Category::withCount('tasks')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json(['data' => $categories]);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $category = Category::create($validated);

        return response()->json([
            'data' => $category,
            'message' => 'Kategori berhasil ditambahkan.',
        ], 201);
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        Gate::authorize('update', $category);

        $category->update($request->validated());

        return response()->json([
            'data' => $category,
            'message' => 'Kategori berhasil diperbarui.',
        ]);
    }

    public function destroy(Category $category): JsonResponse
    {
        Gate::authorize('delete', $category);

        $category->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }
}
