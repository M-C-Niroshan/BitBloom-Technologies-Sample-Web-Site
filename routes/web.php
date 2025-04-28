<?php

use App\Http\Controllers\admin\AboutUsBottomController;
use App\Http\Controllers\admin\AboutUsMainHeaderController;
use App\Http\Controllers\admin\AboutUsMiddleController;
use App\Http\Controllers\admin\AboutUsMissionVisionController;
use App\Http\Controllers\admin\ContactUsLeftSideContentController;
use App\Http\Controllers\admin\FeedbacksController;
use App\Http\Controllers\admin\footerController;
use App\Http\Controllers\admin\KeyServiceController;
use App\Http\Controllers\admin\MainHeaderController;
use App\Http\Controllers\admin\ServicesCardController;
use App\Http\Controllers\admin\ServicesMainHeaderController;
use App\Http\Controllers\admin\SliderController;
use App\Http\Controllers\admin\SolutionAreaController;
use App\Http\Controllers\admin\TeamMembersCotroller;
use App\Http\Controllers\admin\TechnologiesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('frontend/welcome');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('frontend/dashboard');
})->name('dashboard');

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
Route::controller(TechnologiesController::class)->group(function () {
    Route::get('/dashboard/customize-home/solution-area/getTechnologiesinfo', 'GetTechnologiesInfo')->name('get.TechnologiesInfo');
});
Route::controller(FeedbacksController::class)->group(function () {
    Route::get('/dashboard/customize-home/feedbacks/getFeedbacksinfo', 'GetFeedbacksInfo')->name('get.FeedbacksInfo');
});
Route::controller(footerController::class)->group(function () {
    Route::get('/dashboard/customize-home/getFootercontent', 'GetFooterContent')->name('get.FooterContent');
});
Route::controller(ServicesMainHeaderController::class)->group(function () {
    Route::get('/dashboard/customize-services/main-header/getMainHeadercontent', 'GetMainHeaderContent')->name('get.MainHeaderContent');
});
Route::controller(ServicesCardController::class)->group(function () {
    Route::get('/dashboard/customize-services/service-card/getServiceCardinfo', 'GetServicecardInfo')->name('get.ServicecardInfo');
});
Route::controller(AboutUsMainHeaderController::class)->group(function () {
    Route::get('/dashboard/customize-about/main-header/getAboutUsMainHeaderinfo', 'GetAboutUsMainHeaderContent')->name('get.AboutUsMainHeaderContent');
});
Route::controller(AboutUsMiddleController::class)->group(function () {
    Route::get('/dashboard/customize-about/middle-header/getAboutUsMiddleHeaderinfo', 'GetAboutUsMiddleHeaderContent')->name('get.AboutUsMiddleHeaderContent');
});
Route::controller(AboutUsBottomController::class)->group(function () {
    Route::get('/dashboard/customize-about/bottom-header/getAboutUsBottomHeaderinfo', 'GetAboutUsBottomHeaderContent')->name('get.AboutUsBottomHeaderContent');
});
Route::controller(AboutUsMissionVisionController::class)->group(function () {
    Route::get('/dashboard/customize-about/mission-vision/getAboutUsMissionVisioninfo', 'GetAboutUsMissionVisionContent')->name('get.AboutUsMissionVisionContent');
});
Route::controller(ContactUsLeftSideContentController::class)->group(function () {
    Route::get('/dashboard/customize-contact-us/main-content/getContactUsLeftSideContentinfo', 'GetContactUsLeftSideContent')->name('get.ContactUsLeftSideContent');
});


require __DIR__.'/admin/admin-dashboard.php';
require __DIR__.'/admin/admin-customize-home.php';
require __DIR__.'/admin/admin-customize-services.php';
require __DIR__.'/admin/admin-customize-about.php';
require __DIR__.'/admin/admin-customize-contact.php';


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
