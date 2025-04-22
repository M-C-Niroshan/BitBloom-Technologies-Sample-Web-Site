<?php

use App\Http\Controllers\admin\KeyServiceController;
use App\Http\Controllers\admin\MainHeaderController;
use App\Http\Controllers\admin\SliderController;
use App\Http\Controllers\admin\SolutionAreaController;
use App\Http\Controllers\admin\TeamMembersCotroller;
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

Route::controller(SliderController::class)->group(function () {
    Route::get('/dashboard/customize-home/slider/getsliders', 'SliderGet')->name('get.slider');
});
Route::controller(MainHeaderController::class)->group(function () {
    Route::get('/dashboard/customize-home/customize-home-main-header/getheaderinfo', 'MainHeaderGetInfo')->name('get.MainHeaderInfo');
});
Route::controller(TeamMembersCotroller::class)->group(function () {
    Route::get('/dashboard/customize-home/team-members/getTeamMembers', 'GetTeamMembersInfo')->name('get.TeamMembers');
});

Route::controller(KeyServiceController::class)->group(function () {
    Route::get('/dashboard/customize-home/key-services/getKeyServicesinfo', 'GetKeyServiceInfo')->name('get.KeyServicesInfo');
});
Route::controller(SolutionAreaController::class)->group(function () {
    Route::get('/dashboard/customize-home/solution-area/getSolutionAreainfo', 'GetSolutionAreaInfo')->name('get.SolutionAreaInfo');
});

require __DIR__.'/admin/admin-dashboard.php';
require __DIR__.'/admin/admin-customize-home.php';
require __DIR__.'/admin/admin-customize-services.php';
require __DIR__.'/admin/admin-customize-about.php';
require __DIR__.'/admin/admin-customize-contact.php';


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
