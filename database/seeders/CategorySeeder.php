<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (! $user) {
            $this->command->warn('No user found. Run DatabaseSeeder first.');

            return;
        }

        $categories = [
            ['name' => 'Design', 'color' => '#E94B6F'],
            ['name' => 'Dev', 'color' => '#2D3E7A'],
            ['name' => 'Meeting', 'color' => '#FFE6F0'],
            ['name' => 'Writing', 'color' => '#F59E0B'],
            ['name' => 'Personal', 'color' => '#10B981'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['user_id' => $user->id, 'name' => $cat['name']],
                ['color' => $cat['color']]
            );
        }

        $this->command->info('Categories seeded for user: '.$user->email);
    }
}
