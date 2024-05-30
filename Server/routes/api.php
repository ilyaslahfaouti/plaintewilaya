<?php



use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CommunesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/communes', [CommunesController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::post('/emailVerify',[AuthController::class,'sendEmailVerification']);
