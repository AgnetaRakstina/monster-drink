<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DrinkRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|min:3|max:256',
			'category_id' => 'nullable|exists:categories,id',
			'collaboration_id' => 'nullable|exists:collaborations,id',
			'origin_id' => 'nullable|exists:origins,id',
			'flavor' => 'required|string|max:256',
			'caffeine_amount' => 'required|numeric',
			'released_in' =>'nullable|numeric',
			'discontinued_in' => 'nullable|numeric',
			'image' => 'nullable|image',
			'description' => 'nullable',
			'display' => 'nullable|boolean',
        ];
    }
	
	public function messages(): array
	{
		return [
			'required' => 'Lauks ":attribute" ir obligāts',
			'min' => 'Laukam ":attribute" jābūt vismaz :min simbolus garam',
			'max' => 'Lauks ":attribute" nedrīkst būt garāks par :max simboliem',
			'boolean' => 'Lauka ":attribute" vērtībai jābūt "true" vai "false"',
			'unique' => 'Šāda lauka ":attribute" vērtība jau ir reģistrēta',
			'numeric' => 'Lauka ":attribute" vērtībai jābūt skaitlim',
			'image' => 'Laukā ":attribute" jāpievieno korekts attēla fails',
		];
	}
	
	public function attributes(): array
	{
		
		return [
			'name' => 'nosaukums',
			'category_id' => 'kategorija',
			'flavor' => 'garša',
			'released_in' => 'izdošanas gads',
			'discontinued_in' => 'pārtraukts gads',
			'image' => 'attēls',
			'description' => 'apraksts',
			'display' => 'publicēt'
		];
	}
	
	
}
