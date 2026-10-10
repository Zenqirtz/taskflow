<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::withCount('tasks')
            ->where('user_id', $request->user()->id)
            ->get();

        return view('categories.index', compact('categories'));
    }

    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        Category::create($validated);

        return redirect()->route('categories.index')->with('success', 'Kategori berhasil dibuat.');
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        Gate::authorize('update', $category);

        $category->update($request->validated());

        return redirect()->route('categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category)
    {
        Gate::authorize('delete', $category);

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Kategori berhasil dihapus. Tugas terkait menjadi tanpa kategori.');
    }
}
