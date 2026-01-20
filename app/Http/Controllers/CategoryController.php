<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use App\Http\Requests\CategoryRequest;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

use Illuminate\Routing\Controllers\HasMiddleware;


class CategoryController extends Controller implements HasMiddleware
{
	public static function middleware(): array
	{
		return ['auth'];
	}
	
	public function list(): View
	{
		$items = Category::orderBy('id', 'asc')->get();
		
		return view('category.list',
			[
				'title' => 'Kategorijas',
				'items' => $items,
			]);
	}
	//display new Category form
	public function create(): View
	{
		return view('category.form',
			[
				'title' => 'Pievienot kategoriju',
				'category' => new Category(),
			]);
	}
	
	private function saveCategoryData(Category $category, CategoryRequest $request): void
	{
		$data = $request->validated();
		$category->fill($data);
		
		if ($request->hasFile('image')) {
			$uploadedFile = $request->file('image');
			$extension = $uploadedFile->clientExtension();
			$name = uniqid();
			$category->image = $uploadedFile->storePubliclyAs(
				'/',
				$name . '.' . $extension,
				'uploads'
			);
		}
		$category->save();
	}
	
	
	public function put(CategoryRequest $request): RedirectResponse
	{
		$this->saveCategoryData(new Category(), $request);
		return redirect('/categories');
	}
	
	public function patch(Category $category, CategoryRequest $request): RedirectResponse
	{
		$this->saveCategoryData($category, $request);
		return redirect('/categories');
	}

	public function update(Category $category): View
	{
		return view('category.form',
			[
				'title' => 'Regiģēt kategoriju',
				'category' => $category
			]);
	}
	
	public function delete(Category $category): RedirectResponse
	{

		$category->delete();
		return redirect('/categories');
	}
		
}
