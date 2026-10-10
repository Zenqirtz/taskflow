<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'category_id', 'title', 'description',
        'priority', 'status', 'due_date', 'remind_at',
        'reminded_at', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
            'remind_at' => 'datetime',
            'reminded_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getIsOverdueAttribute(): bool
    {
        return $this->status === 'pending'
            && $this->due_date
            && $this->due_date->isPast();
    }

    public function getIsDueTodayAttribute(): bool
    {
        return $this->due_date && $this->due_date->isToday();
    }
}
