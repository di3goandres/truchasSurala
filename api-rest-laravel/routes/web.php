<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Middleware\ApiAuthMiddleware;

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */

Route::get('/', function () {
    return "<p>Hello laravel<p>";
});


Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/pruebas/{nombre?}', function ($nombre = null) {
    $texto = '<p><h2>texto desde una route</h2></p>';
    $texto .= 'Nombre: ' . $nombre;
    return view('pruebas', ['texto' => $texto]);
});

Route::get('/animales', 'PruebasController@index');

Route::get('/test-orm', 'PruebasController@testOrm');


//Rutas DEL API

/*
 * GET: CONSEGUIR DATOS O RECUERSOS
 * POST: Guardar datos  recuersos o hacer logica*
 * PUT: Actualizar datos o recursos
 * DELETE: Eliminar datos o Recuersos
 */

Route::get('/usuario/pruebas', 'UserController@pruebas');
Route::get('/categoria/pruebas', 'CategoryController@pruebas');
Route::get('/posts/pruebas', 'PostController@pruebas');

// RUTAS DEL CONTROLADOR DEL USUARIO
Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');
Route::put('/api/user/update', 'UserController@update');
Route::post('/api/user/upload', 'UserController@upload')->middleware(ApiAuthMiddleware::class) ;
Route::get('/api/user/avatar/{filename}', 'UserController@getImage') ;
Route::get('/api/user/detail/{id}', 'UserController@detail');










