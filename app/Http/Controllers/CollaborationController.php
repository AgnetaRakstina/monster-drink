<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Collaboration;
use App\Http\Requests\CollaborationRequest;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

use Illuminate\Routing\Controllers\HasMiddleware;

class CollaborationController extends Controller implements HasMiddleware
{
	public static function middleware(): array
	{
		return ['auth'];
	}
	
	public function list(): View
	{
		$items = Collaboration::orderBy('name', 'asc')->get();
		
		return view('collaboration.list',
		[
			'title' => 'Sadarbības',
			'items' => $items
		]);
	}
	
	public function create(): View
	{
		return view('collaboration.form',
		[
			'title' => 'Pievienot sadarbību',
			'collaboration' => new Collaboration(),
		]);
	}
	
	private function saveCollaborationData(Collaboration $collaboration, CollaborationRequest $request): void
	{
		$collaboration->fill($request->validated());
		
		if ($request->hasFile('image')) {
			$uploadedFile = $request->file('image');
			$extension = $uploadedFile->clientExtension();
			$name = uniqid();
			$collaboration->image = $uploadedFile->storePubliclyAs(
				'/',
				$name . '.' . $extension,
				'uploads'
			);
		}
		$collaboration->save();
	}
	
	public function put(CollaborationRequest $request): RedirectResponse
	{
		$this->saveCollaborationData(new Collaboration(), $request);
		return redirect('/collaborations');
	}
	public function patch(Collaboration $collaboration, CollaborationRequest $request): RedirectResponse
	{
		$this->saveCollaborationData($collaboration, $request);
		return redirect('/collaborations');
	}
	public function update(Collaboration $collaboration): View
	{
		return view('collaboration.form',
		[
			'title' => 'Rediģēt kategoriju',
			'collaboration' => $collaboration,
		]);
	}
	public function delete(Collaboration $collaboration): RedirectResponse
	{
		$collaboration->delete();
		return redirect('/collaborations');
	}
	
}
