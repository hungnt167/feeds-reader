<?php

use Illuminate\Http\Request;

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

Route::get('channels', 'ChannelController@index');
Route::post('channels', 'ChannelController@store');
Route::get('channels/{id}', 'ChannelController@show');
Route::delete('channels/{id}', 'ChannelController@destroy');
Route::put('channels/{channel}', 'ChannelController@update');
Route::post('channels/fetch', 'ChannelController@fetch');

Route::get('newsList', 'NewsController@index');
Route::post('newsList', 'NewsController@store');
Route::get('newsList/{id}', 'NewsController@show');
Route::delete('newsList/{id}', 'NewsController@destroy');
Route::put('newsList/{news}', 'NewsController@update');
