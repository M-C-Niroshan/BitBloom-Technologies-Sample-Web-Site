<?php

use App\Http\Controllers\admin\ServicesCardController;
use App\Http\Controllers\admin\ServicesMainHeaderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Services MainHeaderController >>>
Route::controller(ServicesMainHeaderController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-services/main-header', function () {
        return Inertia::render('admin/customize-services/customize-services-main-header');
    })->name('customize-services/main-header');

    Route::post('/dashboard/customize-services/main-header/store', 'StoreMainHeaderContent')->name('store.MainHeader');
    Route::post('/dashboard/customize-services/main-header/update', 'UpdateMainHeaderContent')->name('update.MainHeader');
});
// Services ServiceCardsController >>>
Route::controller(ServicesCardController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-services/service-card', function () {
        return Inertia::render('admin/customize-services/customize-services-cards');
    })->name('customize-services/main-header');

    Route::post('/dashboard/customize-services/service-card/store', 'StoreServiceCard')->name('store.ServiceCard');
    Route::post('/dashboard/customize-services/service-card/update', 'UpdateServiceCard')->name('update.ServiceCard');
    Route::post('/dashboard/customize-services/service-card/delete', 'DeleteServiceCard')->name('delete.ServiceCard');
});