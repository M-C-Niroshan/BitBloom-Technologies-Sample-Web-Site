<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('frontend/welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('frontend/about');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('frontend/services');
})->name('services');

Route::get('/contact', function () {
    return Inertia::render('frontend/contact');
})->name('contact');

require __DIR__.'/admin/admin-dashboard.php';
require __DIR__.'/admin/admin-customize-home.php';
require __DIR__.'/admin/admin-customize-services.php';
require __DIR__.'/admin/admin-customize-about.php';
require __DIR__.'/admin/admin-customize-contact.php';


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
