<?php

namespace App\Http\Controllers;
use App\Models\Drink;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DataController extends Controller
{
	//return 3 drinks in random order
    public function getTopDrinks(): JsonResponse
	{
		$drinks = Drink::where('display', true)
			->inRandomOrder()
			->take(3)
			->get();
		return response()->json($drinks);
	}
	
	// return selected drink if its been published
	public function getDrink(Drink $drink): JsonResponse
	{
		$selectedDrink = Drink::where([
			'id' => $drink->id,
			'display' => true,
		])
		->firstOrFail();
		
		return response()->json($selectedDrink);
	}
	
	// Return 3 published drinks in random order- except the selected Drink
	public function getRelatedDrinks(Drink $drink): JsonResponse
	{
		$drinks = Drink::where('display', true)
			->where('id', '<>', $drink->id)
			->inRandomOrder()
			->take(5)
			->get();
		return response()->json($drinks);
	}
	
	//Return all published drinks
	public function getAllDrinks(): JsonResponse
	{
		$drinks = Drink::where('display', true)->get();
		return response()->json($drinks);
	}

}
	
