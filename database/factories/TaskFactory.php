<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'status' => 'pending',
            'due_date' => fake()->dateTimeBetween('now', '+1 week'),
            'remind_at' => null,
            'reminded_at' => null,
            'completed_at' => null,
        ];
    }

    /**
     * Indicate that the task is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'completed_at' => now(),
        ]);
    }
}
