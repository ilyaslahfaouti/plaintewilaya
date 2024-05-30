<?php

use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\CommunesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/communes', [CommunesController::class, 'index']);



Route::post('/register', [RegisterController::class, 'register']);
