<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Task::with('category')
            ->where('user_id', $user->id);

        // Search
        if ($request->filled('q')) {
            $search = $request->input('q');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter priority
        if ($request->filled('priority') && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        // Filter category
        if ($request->filled('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        // Filter due date range
        if ($request->filled('due_from')) {
            $query->whereDate('due_date', '>=', $request->due_from);
        }
        if ($request->filled('due_to')) {
            $query->whereDate('due_date', '<=', $request->due_to);
        }

        // Sort
        $sort = $request->input('sort', 'default');
        if ($sort === 'deadline') {
            $query->orderByRaw('due_date IS NULL, due_date ASC');
        } elseif ($sort === 'priority') {
            $query->orderByRaw("FIELD(priority, 'high', 'medium', 'low')");
        } elseif ($sort === 'newest') {
            $query->latest();
        } else {
            // Default smart order: pending first, then closest deadline, high priority, newest
            $query->orderByRaw("FIELD(status, 'pending', 'completed')")
                  ->orderByRaw('due_date IS NULL, due_date ASC')
                  ->orderByRaw("FIELD(priority, 'high', 'medium', 'low')")
                  ->latest();
        }

        $tasks = $query->paginate(15)->withQueryString();

        $categories = Category::where('user_id', $user->id)->get();

        // Summary stats
        $summary = [
            'total' => Task::where('user_id', $user->id)->count(),
            'pending' => Task::where('user_id', $user->id)->where('status', 'pending')->count(),
            'completed' => Task::where('user_id', $user->id)->where('status', 'completed')->count(),
            'overdue' => Task::where('user_id', $user->id)
                ->where('status', 'pending')
                ->whereNotNull('due_date')
                ->where('due_date', '<', now())
                ->count(),
            'due_today' => Task::where('user_id', $user->id)
                ->whereDate('due_date', today())
                ->count(),
        ];

        return view('tasks.index', compact('tasks', 'categories', 'summary'));
    }

    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        Task::create($validated);

        return redirect()->route('tasks.index')->with('success', 'Tugas berhasil ditambahkan.');
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        Gate::authorize('update', $task);

        $task->update($request->validated());

        return redirect()->route('tasks.index')->with('success', 'Tugas berhasil diperbarui.');
    }

    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);

        $taskId = $task->id;
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil dihapus.')
            ->with('undo_task_id', $taskId);
    }

    public function toggle(Task $task)
    {
        Gate::authorize('update', $task);

        $isCompleted = $task->status === 'completed';
        $task->status = $isCompleted ? 'pending' : 'completed';
        $task->completed_at = $isCompleted ? null : now();
        $task->save();

        $msg = $task->status === 'completed' ? 'Tugas diselesaikan!' : 'Tugas diaktifkan kembali.';
        return redirect()->route('tasks.index')->with('success', $msg);
    }

    public function restore($id)
    {
        $task = Task::withTrashed()
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        Gate::authorize('restore', $task);

        $task->restore();

        return redirect()->route('tasks.index')->with('success', 'Penghapusan tugas dibatalkan.');
    }
}
