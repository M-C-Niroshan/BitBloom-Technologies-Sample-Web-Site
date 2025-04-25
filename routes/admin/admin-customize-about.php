<?php

use App\Http\Controllers\admin\AboutUsBottomController;
use App\Http\Controllers\admin\AboutUsMainHeaderController;
use App\Http\Controllers\admin\AboutUsMiddleController;
use App\Http\Controllers\admin\AboutUsMissionVisionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// AboutUS Main Header Controller >>>
Route::controller(AboutUsMainHeaderController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-about/main-header', function () {
        return Inertia::render('admin/customize-about/customize-about-main-header');
    })->name('customize-about/main-header');

    Route::post('/dashboard/customize-about/main-header/store', 'StoreAboutUsMainHeaderContent')->name('store.AboutUsHeader');
    Route::post('/dashboard/customize-about/main-header/update', 'UpdateAboutUsMainHeaderContent')->name('update.AboutUsHeader');
});
// AboutUS Middle Header Controller >>>
Route::controller(AboutUsMiddleController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-about/middle-header', function () {
        return Inertia::render('admin/customize-about/customize-about-middle-header');
    })->name('customize-about/middle-header');


    Route::post('/dashboard/customize-about/middle-header/store', 'StoreAboutUsMiddleHeaderContent')->name('store.AboutUsMiddleHeader');
    Route::post('/dashboard/customize-about/middle-header/update', 'UpdateAboutUsMiddleHeaderContent')->name('update.AboutUsMiddleHeader');
});
// AboutUS Middle Header Controller >>>
Route::controller(AboutUsBottomController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-about/bottom-header', function () {
        return Inertia::render('admin/customize-about/customize-about-bottom-header');
    })->name('customize-about/bottom-header');

    Route::post('/dashboard/customize-about/bottom-header/store', 'StoreAboutUsBottomHeaderContent')->name('store.AboutUsBottomHeader');
    Route::post('/dashboard/customize-about/bottom-header/update', 'UpdateAboutUsBottomHeaderContent')->name('update.AboutUsBottomHeader');
});
// AboutUS Mission Vision Controller >>>
Route::controller(AboutUsMissionVisionController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-about/mission-vision', function () {
        return Inertia::render('admin/customize-about/customize-about-mission-vission');
    })->name('customize-about/mission-vision');

    Route::post('/dashboard/customize-about/mission-vision/store', 'StoreAboutUsMissionVisionContent')->name('store.AboutUsMissionVision');
    Route::post('/dashboard/customize-about/mission-vision/update', 'UpdateAboutUsMissionVisionContent')->name('update.AboutUsMissionVision');
});

