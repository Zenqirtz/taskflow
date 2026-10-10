<?php

use App\Http\Controllers\Api\TaskApiController;
use App\Http\Controllers\Api\CategoryApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('v1')->group(function () {
        // Tasks
        Route::get('/tasks', [TaskApiController::class, 'index']);
        Route::post('/tasks', [TaskApiController::class, 'store']);
        Route::get('/tasks/{task}', [TaskApiController::class, 'show']);
        Route::put('/tasks/{task}', [TaskApiController::class, 'update']);
        Route::patch('/tasks/{task}', [TaskApiController::class, 'update']);
        Route::patch('/tasks/{task}/toggle', [TaskApiController::class, 'toggle']);
        Route::delete('/tasks/{task}', [TaskApiController::class, 'destroy']);
        Route::post('/tasks/{id}/restore', [TaskApiController::class, 'restore']);
        Route::get('/tasks/summary', [TaskApiController::class, 'summary']);

        // Categories
        Route::get('/categories', [CategoryApiController::class, 'index']);
        Route::post('/categories', [CategoryApiController::class, 'store']);
        Route::patch('/categories/{category}', [CategoryApiController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryApiController::class, 'destroy']);
    });
});
