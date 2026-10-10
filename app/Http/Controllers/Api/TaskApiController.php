<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Task::with('category')->where('user_id', $user->id);

        if ($request->filled('q')) {
            $search = $request->input('q');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority') && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('due_from')) {
            $query->whereDate('due_date', '>=', $request->due_from);
        }
        if ($request->filled('due_to')) {
            $query->whereDate('due_date', '<=', $request->due_to);
        }

        $sort = $request->input('sort', 'default');
        if ($sort === 'deadline') {
            $query->orderByRaw('due_date IS NULL, due_date ASC');
        } elseif ($sort === 'priority') {
            $query->orderByRaw("FIELD(priority, 'high', 'medium', 'low')");
        } elseif ($sort === 'newest') {
            $query->latest();
        } else {
            $query->orderByRaw("FIELD(status, 'pending', 'completed')")
                  ->orderByRaw('due_date IS NULL, due_date ASC')
                  ->orderByRaw("FIELD(priority, 'high', 'medium', 'low')")
                  ->latest();
        }

        $tasks = $query->paginate(15);

        return response()->json([
            'data' => $tasks->items(),
            'meta' => [
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'total' => $tasks->total(),
            ],
        ]);
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $task = Task::create($validated);
        $task->load('category');

        return response()->json([
            'data' => $task,
            'message' => 'Tugas berhasil ditambahkan.',
        ], 201);
    }

    public function show(Task $task): JsonResponse
    {
        Gate::authorize('view', $task);
        $task->load('category');

        return response()->json(['data' => $task]);
    }

    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        Gate::authorize('update', $task);

        $task->update($request->validated());
        $task->load('category');

        return response()->json([
            'data' => $task,
            'message' => 'Tugas berhasil diperbarui.',
        ]);
    }

    public function toggle(Task $task): JsonResponse
    {
        Gate::authorize('update', $task);

        $isCompleted = $task->status === 'completed';
        $task->status = $isCompleted ? 'pending' : 'completed';
        $task->completed_at = $isCompleted ? null : now();
        $task->save();

        return response()->json([
            'data' => $task,
            'message' => $task->status === 'completed' ? 'Tugas selesai.' : 'Tugas belum selesai.',
        ]);
    }

    public function destroy(Task $task): JsonResponse
    {
        Gate::authorize('delete', $task);

        $task->delete();

        return response()->json([
            'message' => 'Tugas berhasil dihapus.',
        ]);
    }

    public function restore($id): JsonResponse
    {
        $task = Task::withTrashed()
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        Gate::authorize('restore', $task);

        $task->restore();

        return response()->json([
            'data' => $task,
            'message' => 'Tugas berhasil dipulihkan.',
        ]);
    }

    public function summary(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        return response()->json([
            'data' => [
                'total' => Task::where('user_id', $userId)->count(),
                'completed' => Task::where('user_id', $userId)->where('status', 'completed')->count(),
                'pending' => Task::where('user_id', $userId)->where('status', 'pending')->count(),
                'overdue' => Task::where('user_id', $userId)
                    ->where('status', 'pending')
                    ->whereNotNull('due_date')
                    ->where('due_date', '<', now())
                    ->count(),
                'due_today' => Task::where('user_id', $userId)
                    ->whereDate('due_date', today())
                    ->count(),
            ],
        ]);
    }
}
