<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@taskflow.app',
            'password' => bcrypt('password'),
        ]);

        $categories = collect([
            ['name' => 'Design', 'color' => '#E94B6F'],
            ['name' => 'Dev', 'color' => '#2D3E7A'],
            ['name' => 'Meeting', 'color' => '#FFE6F0'],
            ['name' => 'Writing', 'color' => '#F59E0B'],
            ['name' => 'Personal', 'color' => '#10B981'],
        ])->map(function ($cat) use ($user) {
            return Category::create([
                'user_id' => $user->id,
                'name' => $cat['name'],
                'color' => $cat['color'],
            ]);
        });

        // Today tasks
        Task::create([
            'user_id' => $user->id,
            'category_id' => $categories[0]->id,
            'title' => 'Design landing page mockup',
            'due_date' => now()->setTime(10, 30),
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        Task::create([
            'user_id' => $user->id,
            'category_id' => $categories[1]->id,
            'title' => 'Write unit tests for API',
            'due_date' => now()->setTime(12, 0),
            'status' => 'pending',
        ]);

        Task::create([
            'user_id' => $user->id,
            'category_id' => $categories[2]->id,
            'title' => 'Team sync call',
            'due_date' => now()->setTime(13, 30),
            'status' => 'pending',
        ]);

        Task::create([
            'user_id' => $user->id,
            'category_id' => $categories[1]->id,
            'title' => 'Review pull requests',
            'due_date' => now()->setTime(15, 0),
            'status' => 'pending',
        ]);

        // Tomorrow tasks
        Task::create([
            'user_id' => $user->id,
            'category_id' => $categories[2]->id,
            'title' => 'Client presentation prep',
            'due_date' => now()->addDay()->setTime(11, 0),
            'status' => 'pending',
        ]);

        Task::create([
            'user_id' => $user->id,
            'category_id' => $categories[3]->id,
            'title' => 'Update project documentation',
            'due_date' => now()->addDay()->setTime(14, 0),
            'status' => 'pending',
        ]);
    }
}
