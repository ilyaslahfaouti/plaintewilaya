<?php



use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CommunesController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/session/{id}/ipAuthorization', [AuthController::class, 'ipAuthorization']);


Route::post('/register', ([AuthController::class, 'register']));
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/communes', [CommunesController::class, 'index']);

Route::post('/emailVerify', [AuthController::class, 'sendEmailVerification'])->middleware('auth:sanctum')->name('verification');
Route::get('/emailVerify/verify', [AuthController::class, 'verify'])->middleware('auth:sanctum')->name('verification.verify');

Route::post('/complaint/store', [ComplaintController::class,'store'])->middleware('auth:sanctum'); ///////////////////
Route::get('/plaint/show/{id}',[ComplaintController::class,'show']);
Route::get('/user/plaints',[ComplaintController::class,'userComplaints'])->middleware('auth:sanctum');




