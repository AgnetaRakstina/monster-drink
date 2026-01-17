<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //display all Categories
	public function list(): View
	{
		$items = Category::orderBy('name', 'asc')->get();
		
		return view(
			'category.list',
			[
				'title' => 'Categories',
				'items' => $items,
			]
		);
	}
	//display new Category form
	public function create(): View
	{
			return view(
				'category.form',
				[
					'title' => 'Pievienot kategoriju',
					'category' => new Category()
				]
			);
	}
	//create new Category
	public function put(Request $request): RedirectResponse
	{
		$validatedData = $request->validate([
			'name' => 'required|string|max:255',
		]);
		
		$category = new Category();
		$category->name = $validatedData['name'];
		$category->save();
		
		return redirect('/categories');
	}
	
	//display Category editing  form
	public function update(Category $category): View
	{
		return view(
			'category.form',
			[
				'title' => 'Regiģēt kategoriju',
				'category' => $category
			]
		);
	}
	
	//Update existing category data
	public function patch(Category $category, Request $request): RedirectResponse
	{
		$validatedData = $request->validate([
			'name' => 'required|string|max:255',
		]);
		
		$category->name = $validatedData['name'];
		$category->save();
		
		return redirect('/categories');
	}
	public function delete(Category $category): RedirectResponse
	{
		//Šeit derētu pārbaude, kas neļauj dzēst kategoriju, ja tas piesaistīs eksistējošām grāmatām
		$category->delete();
		return redirect('/categories');
	}
	
	
	
}
