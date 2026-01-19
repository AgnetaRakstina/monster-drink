<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:256',
			'image' => 'nullable|image',
			'monster_amount' => 'nullable|integer|min:0',
			'average_caffeine_amount' => 'nullable|integer|min:0',
			'description' => 'nullable',
        ];
    }
}
