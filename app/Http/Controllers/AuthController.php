<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //display login form
	public function login(): View
	{
		//echo 'raksagne : <input value="'
		//. \Illuminate\Support\Facades\Hash::make('hakuji_303')
		//. '">';
		//exit();

		return view(
			'auth.login',
			[
				'title' => 'Pieslēgties'
			]
		);
	}
	
	//authenticate user
	public function authenticate(Request $request): RedirectResponse
	{
		$credentials = $request->only('name', 'password');
		
		if (Auth::attempt($credentials)) {
			$request->session()->regenerate();
			
			//Pāradresācijas URL vēlāk nomainisim uz /books (man Monster_drinks)
			return redirect('/categories');
		}
		return back()->withErrors([
			'name' => 'Autentifikācija neveiksmīga',
		]);
	}
	
	//end user session
	public function logout(Request $request): RedirectResponse
	{
		Auth::logout();
		$request->session()->invalidate();
		$request->session()->regenerateToken();
			
		return redirect('/');
	}

		
	
}

use Illuminate\Routing\Controllers\HasMiddleware;

class AuthorController extends Controller implements HasMiddleware
{
	//Get the middleware that should be assigned to the Controller
	public static function middleware(): array
	{
		return [
			'auth',
		];
	}
	
}