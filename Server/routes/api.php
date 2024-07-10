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


Route::get('/communes', [CommunesController::class, 'index']);
Route::post('/register', ([AuthController::class, 'register']));
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/emailVerify',[AuthController::class,'sendEmailVerification'])->middleware('auth:sanctum');
Route::post('/complaint/store', [ComplaintController::class,'store']);
Route::get('/plaints',[ComplaintController::class,'index']);
Route::get('/plaint/show/{id}',[ComplaintController::class,'show']);
Route::get('/user/plaints',[ComplaintController::class,'userComplaints'])->middleware('auth:sanctum');

Route::post('/test',function (Request $request){
    $validation = ['file' => 'required|file|mimes:jpg,png|max:2048'];

    if($request->hasFile('file')){
        $request->validate($validation);
        $file = $request->file('file');
        $path = $file->store('images', 'public'); // Store the file in the 'uploads' directory

        return response()->json(['message' => 'File uploaded successfully', 'path' => $path], 201);

    }
    

    return response()->json(['message' => 'No file uploaded'], 201);
});

