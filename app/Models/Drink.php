<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Drink extends Model
{
	protected $fillable =[
		'name',
		'category_id',
		'collaboration_id',
		'origin_id',
		'flavor',
		'caffeine_amount',
		'released_in',
		'discontinued_in',
		'description',
		'image',
		'display',
	];
	
    public function category(): BelongsTo
	{
		return $this->belongsTo(Category::class);
	}
	public function collaboration(): BelongsTo
	{
		return $this->belongsTo(Collaboration::class);
	}
	public function origin(): BelongsTo
	{
		return $this->belongsTo(Origin::class);
	}
	
	// JSON
	public function jsonSerialize(): mixed
	{
		return [
			'id' => intval($this->id),
			'category' => ($this->category ? $this->category->name : ''),
			'collaboration' => ($this->collaboration ? $this->collaboration->name : ''),
			'origin' => ($this->origin ? $this->origin->name : ''),
			'name' => $this->name,
			'image' => $this->image ? asset('images/' . $this->image) : null,
			'flavor' => $this->flavor,
			'caffeine_amount' => intval($this->caffeine_amount),
			'released_in' => $this->released_in ? intval($this->released_in) : null,
			'discontinued_in' => $this->discontinued_in ? intval($this->discontinued_in) : null,
			'description' => $this->description,
		];
	}
			
	
	
}
