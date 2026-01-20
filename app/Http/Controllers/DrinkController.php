<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;

use App\Http\Requests\DrinkRequest;
use App\Models\Category;
use App\Models\Drink;
use App\Models\Collaboration;
use App\Models\Origin;


class DrinkController extends Controller implements HasMiddleware
{
    //call auth middleware
	public static function middleware(): array
	{
		return [
			'auth',
			];
	}
	
	public function list(): View
	{
		$items = Drink::orderBy('id', 'asc')->get();
		
		return view(
			'drink.list',
			[
				'title' => 'Dzērieni',
				'items' => $items
			]
		);
	}
	
	//display new drink form
	public function create(): View
	{
		$categories = Category::orderBy('name', 'asc')->get();
		$collaborations = Collaboration::orderBy('name', 'asc')->get();
		$origins = Origin::orderBy('name', 'asc')->get();
		
		return view(
			'drink.form',
			[
				'title' => 'Pievienot dzērienu',
				'drink' => new Drink(),
				'categories' => $categories,
				'collaborations' => $collaborations,
				'origins' => $origins,
			]
		);
	}
	
	private function saveDrinkData(Drink $drink, DrinkRequest $request) : void
	{
		$validatedData = $request->validated();
			
		$drink->fill($validatedData);
		$drink->display = (bool) ($validatedData['display'] ?? false);
		
		if ($request->hasFile('image')) {
			// šeit varat pievienot kodu, kas nodzēš veco bildi, ja pievieno jaunu
			$uploadedFile = $request->file('image');
			$extension = $uploadedFile->clientExtension();
			$name = uniqid();
			$drink->image = $uploadedFile->storePubliclyAs(
				'/',
				$name . '.' . $extension,
				'uploads'
			);
		}
		$drink->save();
	}
	
	public function put(DrinkRequest $request): RedirectResponse
	{
		$drink = new Drink();
		$this->saveDrinkData($drink, $request);
		return redirect('/drinks');
	}
	
	public function patch(Drink $drink, DrinkRequest $request): RedirectResponse
	{
		$this->saveDrinkData($drink, $request);
		return redirect('/drinks');
	}
	

	public function update(Drink $drink): View
	{
		$categories = Category::orderBy('name', 'asc')->get();
		$collaborations = Collaboration::orderBy('name', 'asc')->get();
		$origins = Origin::orderBy('name', 'asc')->get();
		
		
		return view(
			'drink.form',
			[
				'title' => 'Rediģēt dzērienu',
				'drink' => $drink,
				'categories' => $categories,
				'collaborations' => $collaborations,
				'origins' => $origins,
			]
		);
	}
		
	public function delete(Drink $drink): RedirectResponse
	{
		if ($drink->image) {
			unlink(getcwd() . '/images/' . $drink->image);
		}
	
		$drink->delete();
		return redirect('/drinks');
	}
		
	
}
