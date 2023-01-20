<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get(
    '/app-install',
    [AuthController::class, 'app_install_index']
)->middleware(['verify.shopify'])->name('home');


// redirect if authenticated
Route::view('/login', 'non_embedded')->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::view('/forget-password', 'non_embedded')->name('forget');
Route::get('/reset/password/{token}', [AuthController::class, 'createNewPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPasswordAction']);
Route::post('/set-password', [AuthController::class, 'setPassword']);
Route::get('/getSession', [AuthController::class, 'getSession']);

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return view('non_embedded');
    });

});

Route::view('/{any}', 'non_embedded')->where('any', '^(?!webhook).*$')->name('non_embedded');
