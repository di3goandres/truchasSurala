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
    return redirect('Administrador/App/');
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

//Route::get('/usuario/pruebas', 'UserController@pruebas');
//Route::get('/categoria/pruebas', 'CategoryController@pruebas');
//Route::get('/posts/pruebas', 'PostController@pruebas');

// RUTAS DEL CONTROLADOR DEL USUARIO
Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');
Route::put('/api/user/update', 'UserController@update');
Route::post('/api/user/upload', 'UserController@upload')->middleware(ApiAuthMiddleware::class) ;
Route::get('/api/user/avatar/{user}/{filename}', 'UserController@getImage') ;
Route::get('/api/user/detail/{id}', 'UserController@detail');
Route::get('/api/users/get', 'UserController@GetAllUserFincas');

//Metodo para subir y descargar el pdf
Route::post('/api/pedido/subirarchivo', 'UserController@subirarchivo')->middleware(ApiAuthMiddleware::class) ;
Route::get('/api/pedido/factura/{id}/{filename}', 'UserController@getpdf') ;

/// ADMINISRADOR
Route::post('/api/user/resetadmin', 'UserController@resetPasswordByAdmin');

// Routes of Controller     Fincas
Route::get('/api/users/fincasget/{id}', 'FincasController@getFincasByUser');
Route::post('/api/user/addfincas', 'UserController@asociarFinca');


Route::post('/api/fincas/update/', 'FincasController@ActualizarFinca');


//despachos
Route::get('/api/despacho/actual/', 'DespachoController@getDespachoActual');

Route::resource('/api/fincas', 'FincasController');
Route::resource('/api/CajasLotes', 'LoteController');
Route::resource('/api/Despacho', 'DespachoController');
Route::resource('/api/Pedidos', 'PedidosController');
Route::post('/api/pedidos/actualizarpedido', 'PedidosController@ActualizarPedido');
Route::delete('/api/pedidos/eliminarpedido/{id}/{borrar}', 'PedidosController@EliminarPedido');




Route::get('/api/Pedidos/ObtenerPedido/{id}', 'PedidosController@getPedido');


Route::resource('/api/Distribucion', 'TrazabilidadController');
Route::get('/api/Distribucion/Despacho/{idDespacho}', 'TrazabilidadController@showAll');
Route::post('/api/despacho/actualizar/', 'DespachoController@actualizar');

Route::get('/api/movil/despachos', 'DespachoController@despachosByToken'); 




Route::get('/api/Pedidos/Trazabilidad/{id}', 'PedidosController@getTraza');
Route::get('/api/Distribucion/GenerarDistribucion/{id}', 'TrazabilidadController@generarTrazaPorDespacho');
Route::get('/api/Distribucion/Obtenerdatos/{id}', 'TrazabilidadController@obtenerCajasBandejas');





Route::get('/api/Trazabilidad/{id}', 'TrazabilidadController@getTraza');
Route::get('/api/Lotes/prueba/{id}', 'LoteController@prueba');

Route::get('/api/usuarios/fincas', 'FincasController@getUserFincas');
Route::get('/api/usuarios/fincas/{id}', 'FincasController@getFincasUser');
Route::get('/api/datos/departamentos/', 'DatosGeneralesController@index');
Route::post('/api/movil/pedidosusuario', 'PedidosController@pedidosByToken');




/**datos estadistica */
Route::get('/api/estadistica/mensual/', 'DatosGeneralesController@EstadisticaMes');
Route::get('/api/estadistica/usuario/', 'PedidosController@EstadisticaByToken');



//servicios para elmovil
Route::get('/api/datos/fincabytoken', 'FincasController@getFincasUserToken');














