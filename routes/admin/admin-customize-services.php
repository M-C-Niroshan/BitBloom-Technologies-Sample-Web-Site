<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Customize Service Page Routes
    Route::get('/dashboard/customize-services/main-header', function () {
        return Inertia::render('admin/customize-services/customize-services-main-header');
    })->name('customize-services/main-header');

    Route::get('/dashboard/customize-services/service-card', function () {
        return Inertia::render('admin/customize-services/customize-services-cards');
    })->name('customize-services/main-header');

});