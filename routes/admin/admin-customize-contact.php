<?php

use App\Http\Controllers\admin\ContactUsLeftSideContentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Contact-US left Side Content Controller >>>
Route::controller(ContactUsLeftSideContentController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-contact-us/main-content', function () {
        return Inertia::render('admin/customize-contact-us/customize-contactus-main-content');
    })->name('customize-contact-us/main-content');

    Route::post('/dashboard/customize-contact-us/main-content/store', 'StoreLeftSideMainContent')->name('store.LeftSideMainContent');
    Route::post('/dashboard/customize-contact-us/main-content/update', 'UpdateLeftSideMainContent')->name('update.LeftSideMainContent');
});
