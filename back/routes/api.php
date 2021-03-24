<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/////Users
Route::post('/user/register', 'UserAuthController@register');
Route::post('/user/login', 'UserAuthController@login');

Route::post('/forgot', 'ForgotPasswordController@sendPasswordResetEmail');
Route::post('/reset', 'ForgotPasswordController@reset');

Route::get('email/verify/{id}', 'VerificationApiController@verify')->name('verificationapi.verify');
Route::post('email/resend', 'VerificationApiController@resend')->name('verificationapi.resend');

/////Admins
Route::post('/admin/login', 'AdminAuthController@login');

 Route::group(['prefix' => 'admin','middleware' => ['assign.guard:admins']],function ()
{
   
    //////Users
    Route::get('/users/{row}', 'UsersController@index');
    Route::get('/user/{id}', 'UsersController@show');
    Route::get('/userRelations/{id}', 'UsersController@showRelation');
    Route::put('/user/{id}', 'UsersController@update');
    // Route::post('/user', 'UsersController@store');
    Route::get('/userCount', 'UsersController@count');
    Route::delete('/user/{id}', 'UsersController@destroy');

    /////Admins

    // Route::post('/admin/logout', 'AdminAuthController@logout');
    Route::get('/admin/{id}', 'AdminsController@show');
    Route::get('/admins/{row}', 'AdminsController@index');
    Route::put('/admin/{id}', 'AdminsController@update');
    // Route::post('/user', 'UsersController@store');
    Route::delete('/admin/{id}', 'AdminsController@destroy');
    Route::post('/admin/updatePass/{id}', 'AdminsController@updatePassword');
    Route::post('/admin/register', 'AdminAuthController@register');


    Route::put('/adminProf/{id}', 'AdminsController@updateProfile');


    /////Hobbies
    Route::get('/hobbies/{row}', 'HobbiesController@index');
    Route::get('/hobby/{id}', 'HobbiesController@show');
    Route::get('/hobbyRelations/{id}', 'HobbiesController@showRelation');
    Route::put('/hobby/{id}', 'HobbiesController@update');
    Route::post('/hobby', 'HobbiesController@store');
    Route::delete('/hobby/{id}', 'HobbiesController@destroy');


    /////Countries
    Route::get('/countries/{row}', 'CountriesController@index');
    Route::get('/country/{id}', 'CountriesController@show');
    Route::get('/countryRelations/{id}', 'CountriesController@showRelation');
    Route::put('/country/{id}', 'CountriesController@update');
    Route::post('/country', 'CountriesController@store');
    Route::delete('/country/{id}', 'CountriesController@destroy');



    /////States
    Route::get('/states/{row}', 'StatesController@index');
    Route::get('/state/{id}', 'StatesController@show');
    Route::get('/stateRelations/{id}', 'StatesController@showRelation');
    Route::put('/state/{id}', 'StatesController@update');
    Route::post('/state', 'StatesController@store');
    Route::delete('/state/{id}', 'StatesController@destroy');





    /////Images
    Route::get('/images/{row}', 'ImagesController@index');
    Route::get('/image/{id}', 'ImagesController@show');
    Route::put('/image/{id}', 'ImagesController@update');
    Route::post('/image', 'ImagesController@store');
    Route::delete('/image/{id}', 'ImagesController@destroy');



    /////Users_Hobbies
    Route::get('/users_hobbies/{row}', 'UsersHobbiesController@index');
   
    Route::get('/user_hobby/{id}', 'UsersHobbiesController@show');
    Route::put('/user_hobby/{id}', 'UsersHobbiesController@update');
    Route::post('/user_hobby', 'UsersHobbiesController@store');
    Route::delete('/user_hobby/{id}', 'UsersHobbiesController@destroy');


    /////Events_Hobbies
    Route::get('/events_hobbies/{row}', 'EventsHobbiesController@index');
    Route::get('/event_hobby/{id}', 'EventsHobbiesController@show');
    Route::put('/event_hobby/{id}', 'EventsHobbiesController@update');
    Route::post('/event_hobby', 'EventsHobbiesController@store');
    Route::delete('/event_hobby/{id}', 'EventsHobbiesController@destroy');


    /////Events
    Route::get('/events/{row}', 'EventsController@index');
    Route::get('/event/{id}', 'EventsController@show');
    Route::put('/event/{id}', 'EventsController@update');
    Route::post('/event', 'EventsController@store');
    Route::delete('/event/{id}', 'EventsController@destroy');

    
    

});
Route::group(['prefix' => 'user','middleware' => ['assign.guard:users']],function ()
{

    Route::get('/user/{id}', 'UsersController@show');

    Route::post('/user/logout', 'UserAuthController@logout');


});












/////Hobbies
Route::get('/hobbies/{row}', 'HobbiesController@index');
Route::get('/hobby/{id}', 'HobbiesController@show');
Route::get('/hobbyRelations/{id}', 'HobbiesController@showRelation');
Route::put('/hobby/{id}', 'HobbiesController@update');
Route::post('/hobby', 'HobbiesController@store');
Route::delete('/hobby/{id}', 'HobbiesController@destroy');

Route::get('/hobbiesmain/{row}', 'HobbiesController@main');

/////Images
Route::get('/images/{row}', 'ImagesController@index');
Route::get('/image/{id}', 'ImagesController@show');
Route::put('/image/{id}', 'ImagesController@update');
Route::post('/image', 'ImagesController@store');
Route::delete('/image/{id}', 'ImagesController@destroy');



/////Users_Hobbies
Route::get('/users_hobbies/{row}', 'UsersHobbiesController@index');
Route::get('/freelancers/{row}', 'UsersHobbiesController@freelancers');
Route::get('/not_freelancers/{row}', 'UsersHobbiesController@not_freelancers');
Route::get('/user_hobby/{id}', 'UsersHobbiesController@show');
Route::put('/user_hobby/{id}', 'UsersHobbiesController@update');
Route::post('/user_hobby', 'UsersHobbiesController@store');
Route::delete('/user_hobby/{id}', 'UsersHobbiesController@destroy');


/////Events_Hobbies
Route::get('/events_hobbies/{row}', 'EventsHobbiesController@index');
Route::get('/event_hobby/{id}', 'EventsHobbiesController@show');
Route::put('/event_hobby/{id}', 'EventsHobbiesController@update');
Route::post('/event_hobby', 'EventsHobbiesController@store');
Route::delete('/event_hobby/{id}', 'EventsHobbiesController@destroy');




/////Events
Route::get('/events/{row}', 'EventsController@index');
Route::get('/event/{id}', 'EventsController@show');
Route::put('/event/{id}', 'EventsController@update');
Route::post('/event', 'EventsController@store');
Route::delete('/event/{id}', 'EventsController@destroy');
Route::get('/eventsbyhobby/{row}/{id}', 'EventsController@indexByHobby');







////Contact Us
Route::post('/contactus', 'ContactUs@sendEmail');


