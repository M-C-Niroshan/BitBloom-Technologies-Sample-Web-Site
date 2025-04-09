<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Customize About Page Routes
    Route::get('/dashboard/customize-about/main-header', function () {
        return Inertia::render('admin/customize-about/customize-about-main-header');
    })->name('customize-about/main-header');

    Route::get('/dashboard/customize-about/mission-vision', function () {
        return Inertia::render('admin/customize-about/customize-about-mission-vission');
    })->name('customize-about/mission-vision');

    Route::get('/dashboard/customize-about/middle-header', function () {
        return Inertia::render('admin/customize-about/customize-about-middle-header');
    })->name('customize-about/middle-header');

    Route::get('/dashboard/customize-about/bottom-header', function () {
        return Inertia::render('admin/customize-about/customize-about-bottom-header');
    })->name('customize-about/bottom-header');

});