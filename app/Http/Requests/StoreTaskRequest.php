<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1000'],
            'priority' => ['nullable', 'in:low,medium,high'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'due_date' => ['nullable', 'date'],
            'remind_at' => ['nullable', 'date', 'before_or_equal:due_date'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul wajib diisi.',
            'title.max' => 'Judul maksimal 150 karakter.',
            'description.max' => 'Deskripsi maksimal 1000 karakter.',
            'remind_at.before_or_equal' => 'Pengingat harus sebelum atau sama dengan deadline.',
        ];
    }
}
