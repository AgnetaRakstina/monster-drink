<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DrinkController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\OriginController;

use App\Http\Controllers\DataController;


//Home
Route::get('/', [HomeController::class, 'index']);


//Authentification
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout']);


//Main table drink
Route::get('/drinks', [DrinkController::class, 'list']);
Route::get('/drinks/create', [DrinkController::class, 'create']);
Route::post('/drinks/put', [DrinkController::class, 'put']);
Route::get('/drinks/update/{drink}', [DrinkController::class, 'update']);
Route::post('/drinks/patch/{drink}', [DrinkController::class, 'patch']);
Route::post('/drinks/delete/{drink}', [DrinkController::class, 'delete']);


//Category table
Route::get('/categories', [CategoryController::class, 'list']);
Route::get('/categories/create', [CategoryController::class, 'create']);
Route::post('/categories/put', [CategoryController::class, 'put']);
Route::get('/categories/update/{category}', [CategoryController::class, 'update']);
Route::post('/categories/patch/{category}', [CategoryController::class, 'patch']);
Route::post('/categories/delete/{category}', [CategoryController::class, 'delete']);


//Collaborations
Route::get('/collaborations', [CollaborationController::class, 'list']);
Route::get('/collaborations/create', [CollaborationController::class, 'create']);
Route::post('/collaborations/put', [CollaborationController::class, 'put']);
Route::get('/collaborations/update/{collaboration}', [CollaborationController::class, 'update']);
Route::post('/collaborations/patch/{collaboration}', [CollaborationController::class, 'patch']);
Route::post('/collaborations/delete/{collaboration}', [CollaborationController::class, 'delete']);

//Origins
Route::get('/origins', [OriginController::class, 'list']);
Route::get('/origins/create', [OriginController::class, 'create']);
Route::post('/origins/put', [OriginController::class, 'put']);
Route::get('/origins/update/{origin}', [OriginController::class, 'update']);
Route::post('/origins/patch/{origin}', [OriginController::class, 'patch']);
Route::post('/origins/delete/{origin}', [OriginController::class, 'delete']);

// DataAPI
Route::get('/data/get-top-drinks', [DataController::class, 'getTopDrinks']);
Route::get('/data/get-drink/{drink}', [DataController::class, 'getDrink']);
Route::get('data/get-related-drinks/{drink}', [DataController::class, 'getRelatedDrinks']);
Route::get('data/get-all-drinks', [DataController::class, 'getAllDrinks']);