<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\admin\SliderController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Customize Home Page Routes


    Route::get('/dashboard/customize-home/main-header', function () {
        return Inertia::render('admin/customize-home/customize-home-main-header');
    })->name('customize-home/main-header');

    Route::get('/dashboard/customize-home/team-members', function () {
        return Inertia::render('admin/customize-home/customize-home-team-members');
    })->name('customize-home/team-members');

    Route::get('/dashboard/customize-home/key-services', function () {
        return Inertia::render('admin/customize-home/customize-home-key-services');
    })->name('customize-home/key-services');
    
    Route::get('/dashboard/customize-home/solution-area', function () {
        return Inertia::render('admin/customize-home/customize-home-solution-area');
    })->name('customize-home/solution-area');
    Route::get('/dashboard/customize-home/technologies', function () {
        return Inertia::render('admin/customize-home/customize-home-technologies');
    })->name('customize-home/technologies');
    Route::get('/dashboard/customize-home/feedbacks', function () {
        return Inertia::render('admin/customize-home/customize-home-feedbacks');
    })->name('customize-home/feedbacks');
    Route::get('/dashboard/customize-home/footer-content', function () {
        return Inertia::render('admin/customize-home/customize-home-footer-content');
    })->name('customize-home/footer-content');

});

Route::controller(SliderController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-home/slider', function () {
        return Inertia::render('admin/customize-home/customize-home-slider');
    })->name('customize-home/slider');

    Route::get('/dashboard/customize-home/slider/getsliders', 'SliderIndex')->name('get.slider');
    Route::post('/dashboard/customize-home/slider/store', 'SliderStore')->name('customize.home.slider.store');
});