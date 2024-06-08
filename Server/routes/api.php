<?php



use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CommunesController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/communes', [CommunesController::class, 'index']);
Route::post('/register', ([AuthController::class, 'register']));
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/emailVerify',[AuthController::class,'sendEmailVerification'])->middleware('auth:sanctum');
Route::post('/complaint/store', [ComplaintController::class,'store'])->middleware('auth:sanctum');

Route::post('/test',function (Request $request){
    if($request->hasFile('img')){
        return response()->json([
            'requestFIle'=>$request->img,
        ]);

    }else{
        return response()->json([
            'all'=>$request->all(),
        ]);
    }
});