<?php

use App\Http\Controllers\AdminAuth\AdminAuthController;
use App\Http\Controllers\AdminControllers\ComplaintController;
use App\Http\Controllers\AdminControllers\IpController;
use App\Http\Controllers\AdminControllers\staticPagesController;
use App\Http\Controllers\AdminControllers\UserController;
use Illuminate\Support\Facades\Route;







Route::view('/admin/create','admin.create')->name('register')->middleware('guest');
Route::post('/admin/store',[AdminAuthController::class,'store'])->name('admin.store');

Route::view('/login','admin.welcome')->name('login')->middleware('guest');
Route::post('login',[AdminAuthController::class,'login'])->name('login')->middleware('guest');
Route::post('logout', [AdminAuthController::class, 'logout'])->name('logout')->middleware('auth');


Route::get('/admin/dashboard',[staticPagesController::class, 'dashboard'])->middleware('auth')->name('admin.dashboard');
Route::get('/',[staticPagesController::class, 'dashboard'])->middleware('auth');


Route::get('/admin/plaintes',[ComplaintController::class,'index'])->middleware('auth')->name('complaints.index');
Route::post('/admin/plaintes/search',[ComplaintController::class,'search'])->middleware('auth')->name('complaints.search');
Route::get('/admin/plaint/{plainte}/show',[ComplaintController::class, 'show'])->middleware('auth')->name('complaint.show');
Route::get('/admin/commune/{id}/plaintes',[ComplaintController::class,'getCplByCmId'])->name('complaintsByCommune');
Route::put('/admin/plainte/{plainte}/verify',[ComplaintController::class,'verifyPlainte'])->name('plainte.verify');


Route::post('/admin/user/search',[UserController::class,'search'])->middleware('auth')->name('user.search');
Route::get('/admin/user/{user}/show',[UserController::class, 'show'])->middleware('auth')->name('user.show');
Route::get('/admin/users',[UserController::class,'index'])->middleware('auth')->name('user.index');

Route::post('/admin/ip/search',[IpController::class,'search'])->middleware('auth')->name('ip.search');
Route::get('/admin/ip/{ip}/authorization',[IpController::class, 'authorization'])->middleware('auth')->name('ip.authorization');
Route::get('/admin/ips',[IpController::class,'index'])->middleware('auth')->name('ip.index');

