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



Route::post('/admin/register', 'AdminAuthController@register');
Route::post('/admin/login', 'AdminAuthController@login');
Route::post('/admin/logout', 'AdminAuthController@logout');


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
Route::post('/user/register', 'UserAuthController@register');
Route::post('/user/login', 'UserAuthController@login');
Route::post('/user/logout', 'UserAuthController@logout');
Route::get('/user/{id}', 'UsersController@show');

Route::get('/users/{row}', 'UsersController@index');

Route::get('/userRelations/{id}', 'UsersController@showRelation');
Route::put('/user/{id}', 'UsersController@update');
// Route::post('/user', 'UsersController@store');
Route::delete('/user/{id}', 'UsersController@destroy');




/////Hobbies
Route::get('/hobbies/{row}', 'HobbiesController@index');
Route::get('/hobby/{id}', 'HobbiesController@show');
Route::get('/hobbyRelations/{id}', 'HobbiesController@showRelation');
Route::put('/hobby/{id}', 'HobbiesController@update');
Route::post('/hobby', 'HobbiesController@store');
Route::delete('/hobby/{id}', 'HobbiesController@destroy');


