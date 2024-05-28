<?php

use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\CommunesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/communes', [CommunesController::class, 'index']);

Route::get('/csrf-token', function () {
    return "hello";
        
});

Route::post('/register', [RegisterController::class, 'register']);
