<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks for authenticated user.
     */
    public function index(Request $request): JsonResource
    {
        $tasks = $request->user()
            ->tasks()
            ->with('category')
            ->orderBy('due_date')
            ->get();

        return JsonResource::collection($tasks);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request): JsonResource
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
            'due_date' => 'nullable|date_format:Y-m-d\TH:i',
            'remind_at' => 'nullable|date_format:Y-m-d\TH:i',
        ]);

        $task = $request->user()->tasks()->create($validated);

        return new JsonResource($task->load('category'));
    }

    /**
     * Display the specified task.
     */
    public function show(Task $task): JsonResource
    {
        $this->authorize('view', $task);

        return new JsonResource($task->load('category'));
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, Task $task): JsonResource
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:150',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'nullable|in:pending,completed',
            'due_date' => 'nullable|date_format:Y-m-d\TH:i',
            'remind_at' => 'nullable|date_format:Y-m-d\TH:i',
            'completed_at' => 'nullable|date_format:Y-m-d\TH:i',
        ]);

        $task->update($validated);

        return new JsonResource($task->load('category'));
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Task $task): void
    {
        $this->authorize('delete', $task);

        $task->delete();
    }
}
