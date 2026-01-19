<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Drink;

class Collaboration extends Model
{
    protected $fillable = [
		'name',
		'image',
		'collaboration_discontinued_in',
		'description',
	];
	
	public function drinks(): HasMany
	{
		return $this->hasMany(Drink::class);
	}
}
