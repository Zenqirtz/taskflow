<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $category = $this->route('category');
        return [
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('categories')
                    ->where(fn ($query) => $query->where('user_id', $this->user()->id))
                    ->ignore($category),
            ],
            'color' => ['required', 'string', 'size:7', 'regex:/^#[0-9A-Fa-f]{6}$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama kategori wajib diisi.',
            'name.unique' => 'Kategori dengan nama ini sudah ada.',
            'color.required' => 'Warna kategori wajib dipilih.',
            'color.regex' => 'Format warna tidak valid (harus kode hex seperti #3B82F6).',
        ];
    }
}
