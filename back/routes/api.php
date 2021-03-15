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





 Route::group(['prefix' => 'admin','middleware' => ['assign.guard:admins']],function ()
{
    // admin controller
//  Route::get('/admins/{rowNb}','AdminsController@index');
//  Route::get('/admin/{id}','AdminsController@show');
//  Route::post('/admin','AdminsController@store');
//  Route::put('/admin/{id}','AdminsController@update');
//  Route::delete('/admin/{id}','AdminsController@destroy');
//  Route::get('/countAdmins','AdminsController@count');
});
Route::group(['prefix' => 'user','middleware' => ['assign.guard:users']],function ()
{


});

/////Users
Route::post('/user/register', 'UserAuthController@register');
Route::post('/user/login', 'UserAuthController@login');
Route::post('/user/logout', 'UserAuthController@logout');
Route::get('/user/{id}', 'UsersController@show');

Route::get('/users/{row}', 'UsersController@index');

Route::get('/userRelations/{id}', 'UsersController@showRelation');
Route::put('/user/{id}', 'UsersController@update');
// Route::post('/user', 'UsersController@store');
Route::delete('/user/{id}', 'UsersController@destroy');



/////Admins
Route::post('/admin/register', 'AdminAuthController@register');
Route::post('/admin/login', 'AdminAuthController@login');
Route::post('/admin/logout', 'AdminAuthController@logout');
Route::get('/admin/{id}', 'AdminsController@show');

Route::get('/admins/{row}', 'AdminsController@index');

Route::put('/admin/{id}', 'AdminsController@update');
// Route::post('/user', 'UsersController@store');
Route::delete('/admin/{id}', 'AdminsController@destroy');



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



/////Cities
Route::get('/cities/{row}', 'CitiesController@index');
Route::get('/city/{id}', 'CitiesController@show');
Route::get('/cityRelations/{id}', 'CitiesController@showRelation');
Route::put('/city/{id}', 'CitiesController@update');
Route::post('/city', 'CitiesController@store');
Route::delete('/city/{id}', 'CitiesController@destroy');



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


