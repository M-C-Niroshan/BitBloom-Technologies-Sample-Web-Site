<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Customize Contact Page Routes
    Route::get('/dashboard/customize-contact-us/main-content', function () {
        return Inertia::render('admin/customize-contact-us/customize-contactus-main-content');
    })->name('customize-contact-us/main-content');

});