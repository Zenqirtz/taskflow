<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskController extends Controller
{
    private function currentUser(Request $request): User
    {
        return $request->user() ?? User::first();
    }

    /**
     * Display a listing of tasks for authenticated user.
     */
    public function index(Request $request): JsonResource
    {
        $tasks = $this->currentUser($request)
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

        // Convert time to UTC for storage (assuming input in WIB)
        if (! empty($validated['due_date'])) {
            $validated['due_date'] = Carbon::parse($validated['due_date'], 'Asia/Jakarta')
                ->setTimezone('UTC')
                ->format('Y-m-d H:i:s');
        }
        if (! empty($validated['remind_at'])) {
            $validated['remind_at'] = Carbon::parse($validated['remind_at'], 'Asia/Jakarta')
                ->setTimezone('UTC')
                ->format('Y-m-d H:i:s');
        }

        $task = $this->currentUser($request)->tasks()->create($validated);

        return new JsonResource($task->load('category'));
    }

    /**
     * Display the specified task.
     */
    public function show(Task $task): JsonResource
    {
        return new JsonResource($task->load('category'));
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, Task $task): JsonResource
    {
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

        // Convert time to UTC for storage (assuming input in WIB)
        if (! empty($validated['due_date'])) {
            $validated['due_date'] = Carbon::parse($validated['due_date'], 'Asia/Jakarta')
                ->setTimezone('UTC')
                ->format('Y-m-d H:i:s');
        }
        if (! empty($validated['remind_at'])) {
            $validated['remind_at'] = Carbon::parse($validated['remind_at'], 'Asia/Jakarta')
                ->setTimezone('UTC')
                ->format('Y-m-d H:i:s');
        }

        $task->update($validated);

        return new JsonResource($task->load('category'));
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Task $task): void
    {
        $task->delete();
    }
}
