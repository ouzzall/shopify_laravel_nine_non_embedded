<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\RulesController;
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

Route::get('/', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');


Route::post('sync_store',[CampaignController::class,'sync_store'])->middleware(['verify.shopify']);

Route::get('get_create_campaign_data',[CampaignController::class,'get_create_campaign_data'])->middleware(['verify.shopify']);

Route::post('add_new_discount_rule',[CampaignController::class,'add_new_discount_rule'])->middleware(['verify.shopify']);

Route::post('add_new_campaign',[CampaignController::class,'add_new_campaign'])->middleware(['verify.shopify']);

Route::post('change_campaign_status',[CampaignController::class,'change_campaign_status'])->middleware(['verify.shopify']);

Route::get('get_all_campaigns',[CampaignController::class,'get_all_campaigns'])->middleware(['verify.shopify']);

Route::get('get_editing_campaign',[CampaignController::class,'get_editing_campaign'])->middleware(['verify.shopify']);

Route::post('update_existing_campaign',[CampaignController::class,'update_existing_campaign'])->middleware(['verify.shopify']);

Route::post('make_campaign_duplicate',[CampaignController::class,'make_campaign_duplicate'])->middleware(['verify.shopify']);

Route::get('delete_campaign',[CampaignController::class,'delete_campaign'])->middleware(['verify.shopify']);

Route::view('/{any}', 'welcome')->where('any', '^(?!webhook).*$')->middleware(['verify.shopify'])->name('welcome');
