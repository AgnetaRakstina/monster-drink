<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Origin;
use App\Http\Requests\OriginRequest;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

use Illuminate\Routing\Controllers\HasMiddleware;

class OriginController extends Controller implements HasMiddleware
{
    public static function middleware(): array
	{
		return ['auth'];
	}
	
	public function list(): View
	{
		$items = Origin::orderBy('id', 'asc')->get();
		
		return view('origin.list',
			[
				'title' => 'Izcelsmes',
				'items' => $items,
			]);
	}
	
	public function create(): View
	{
		return view('origin.form',
			[
				'title' => 'Pievienojiet izcelsmi',
				'origin' => new Origin(),
			]);
	}
	
	private function saveOriginData(Origin $origin, OriginRequest $request): void
	{
		$data = $request->validated();
		$origin->fill($data);
		
		if ($request->hasFile('image')) {
			$uploadedFile = $request->file('image');
			$extension = $uploadedFile->clientExtension();
			$name = uniqid();
			$origin->image = $uploadedFile->storePubliclyAs(
				'/',
				$name . '.' . $extension,
				'uploads'
			);
		}
		$origin->save();
	}
	
	public function put(OriginRequest $request):  RedirectResponse
	{
		$this->saveOriginData(new Origin(), $request);
		return redirect('/origins');
	}
	public function patch(Origin $origin, OriginRequest $request): RedirectResponse
	{
		$this->saveOriginData($origin, $request);
		return redirect('/origins');
	}
	
	public function update(Origin $origin): View
	{
		return view('origin.form',
			[
				'title' => 'Rediģēt izcelsmi',
				'origin' => $origin
			]);
	}
	
	public function delete(Origin $origin): RedirectResponse
	{
		$origin->delete();
		return redirect('/origins');
	}
}
