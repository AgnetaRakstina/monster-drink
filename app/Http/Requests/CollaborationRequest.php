<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CollaborationRequest extends FormRequest
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
			'collaboration_discontinued_in' => 'nullable|integer',
			'description' => 'nullable',
        ];
    }
}
