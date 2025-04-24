<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;


// Brand routes
Route::prefix('brand')->group(function () {
    Route::get('getallbrands', [BrandController::class, 'getallbrands']);
    Route::post('storebrand', [BrandController::class, 'storebrand']);
    Route::post('showbrand', [BrandController::class, 'showbrand']);
    Route::post('updatebrand', [BrandController::class, 'updatebrand']);
    Route::post('destroybrand', [BrandController::class, 'destroybrand']);
});
