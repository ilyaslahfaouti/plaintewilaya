<?php

use App\Http\Controllers\AdminAuth\AdminAuthController;
use App\Http\Controllers\AdminControllers\ComplaintController;
use App\Http\Controllers\AdminControllers\IpController;
use App\Http\Controllers\AdminControllers\staticPagesController;
use App\Http\Controllers\AdminControllers\UserController;
use Illuminate\Support\Facades\Route;




Route::prefix('admin')->middleware('guest:Admin')->group(function () {
    Route::view('/login','admin.welcome')->name('login');
    Route::post('/login',[AdminAuthController::class,'login'])->name('login');



});
Route::prefix('admin')->middleware('auth:Admin')->group(function () {

    Route::view('/create','admin.create')->name('admin.create');
    Route::post('/store',[AdminAuthController::class,'register'])->name('admin.register');
    Route::get('/dashboard',[staticPagesController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('logout', [AdminAuthController::class, 'logout'])->name('logout');
    Route::get('/',[staticPagesController::class, 'dashboard']);
    Route::get('/plaintes',[ComplaintController::class,'index'])->name('complaints.index');
    Route::post('/plaintes/search',[ComplaintController::class,'search'])->name('complaints.search');
    Route::get('/plaint/{plainte}/show',[ComplaintController::class, 'show'])->name('complaint.show');
    Route::get('/commune/{id}/plaintes',[ComplaintController::class,'getCplByCmId'])->name('complaintsByCommune');
    Route::put('/plainte/{plainte}/verify',[ComplaintController::class,'verifyPlainte'])->name('plainte.verify');
});









Route::post('/admin/user/search',[UserController::class,'search'])->middleware('auth:Admin')->name('user.search');
Route::get('/admin/user/{user}/show',[UserController::class, 'show'])->middleware('auth:Admin')->name('user.show');
Route::get('/admin/users',[UserController::class,'index'])->middleware('auth:Admin')->name('user.index');

Route::post('/admin/ip/search',[IpController::class,'search'])->middleware('auth:Admin')->name('ip.search');
Route::get('/admin/ip/{ip}/authorization',[IpController::class, 'authorization'])->middleware('auth:Admin')->name('ip.authorization');
Route::get('/admin/ips',[IpController::class,'index'])->middleware('auth:Admin')->name('ip.index');

