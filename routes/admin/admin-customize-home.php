<?php

use App\Http\Controllers\admin\MainHeaderController;
use App\Http\Controllers\admin\TeamMembersCotroller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\admin\SliderController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Customize Home Page Route

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
// SliderController >>>
Route::controller(SliderController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-home/slider', function () {
        return Inertia::render('admin/customize-home/customize-home-slider');
    })->name('customize-home/slider');

    Route::get('/dashboard/customize-home/slider/getsliders', 'SliderGet')->name('get.slider');
    Route::post('/dashboard/customize-home/slider/store', 'SliderStore')->name('store.slider');
    Route::post('/dashboard/customize-home/slider/update', 'SliderUpdate')->name('update.slider');
    Route::post('/dashboard/customize-home/slider/delete', 'SliderDelete')->name('delete.slider');
});
// MainHeaderController >>>
Route::controller(MainHeaderController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-home/main-header', function () {
        return Inertia::render('admin/customize-home/customize-home-main-header');
    })->name('customize-home/customize-home-main-header');

    Route::get('/dashboard/customize-home/customize-home-main-header/getheaderinfo', 'MainHeaderGetInfo')->name('get.MainHeaderInfo');
    Route::post('/dashboard/customize-home/customize-home-main-header/update', 'MainHeaderUpdate')->name('update.MainHeaderInfo');
});
// TeamMembersCotroller >>>
Route::controller(TeamMembersCotroller::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-home/team-members', function () {
        return Inertia::render('admin/customize-home/customize-home-team-members');
    })->name('customize-home/team-members');

    Route::get('/dashboard/customize-home/team-members/getTeamMembers', 'GetTeamMembersInfo')->name('get.TeamMembers');
    Route::post('/dashboard/customize-home/team-members/store', 'StoreTeamMembersInfo')->name('store.TeamMembers');
    Route::post('/dashboard/customize-home/team-members/update', 'UpdateTeamMembersInfo')->name('update.TeamMembers');
    Route::post('/dashboard/customize-home/team-members/delete', 'DeleteTeamMembersInfo')->name('delete.TeamMembers');
});
// SliderController >>>
Route::controller(TeamMembersCotroller::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/customize-home/team-members', function () {
        return Inertia::render('admin/customize-home/customize-home-team-members');
    })->name('customize-home/team-members');

    Route::get('/dashboard/customize-home/team-members/getTeamMembers', 'GetTeamMembersInfo')->name('get.TeamMembers');
    Route::post('/dashboard/customize-home/team-members/store', 'StoreTeamMembersInfo')->name('store.TeamMembers');
    Route::post('/dashboard/customize-home/team-members/update', 'UpdateTeamMembersInfo')->name('update.TeamMembers');
    Route::post('/dashboard/customize-home/team-members/delete', 'DeleteTeamMembersInfo')->name('delete.TeamMembers');
});