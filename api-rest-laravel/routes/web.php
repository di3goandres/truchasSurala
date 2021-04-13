<?php

use App\Exports\MortalidadExport;
use Illuminate\Support\Facades\Route;
use \App\Http\Middleware\ApiAuthMiddleware;
use GuzzleHttp\Psr7\MimeType;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\File;
use Maatwebsite\Excel\Facades\Excel;

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

Route::resource('/Certificados', 'CertificadosController');


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
Route::post('/api/user/surala/add', 'UserController@registerAPP');

Route::post('/api/login', 'UserController@login');
Route::post('/api/login/surala', 'UserController@loginsurala');

Route::put('/api/user/update', 'UserController@update');
Route::post('/api/user/upload', 'UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::get('/api/user/avatar/{user}/{filename}', 'UserController@getImage');
Route::get('/api/user/detail/{id}', 'UserController@detail');
Route::get('/api/users/get', 'UserController@GetAllUserFincas');
Route::get('/api/users/surala/get', 'UserController@GetAllUserSurala');
Route::get('/api/users/surala/conductores', 'UserController@getConductores');

Route::post('/api/user/changepassword', 'UserController@resetPasswordByUser');

//Metodo para subir y descargar el pdf de facturas
Route::post('/api/pedido/subirarchivo', 'UserController@subirarchivo')->middleware(ApiAuthMiddleware::class);
Route::get('/api/pedido/factura/{id}/{filename}', 'UserController@getpdf');

//Metodo para subir y descargar el pdf de despachos certificado de origien
Route::post('/api/despacho/subirarchivo', 'DespachoController@subirarchivo')->middleware(ApiAuthMiddleware::class);
Route::get('/api/despacho/certificado/{id}/{filename}', 'DespachoController@getpdf');
Route::get('/api/despacho/alevinos/certificado/{id}', 'DespachoController@getpdfAlevinos');






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
Route::resource('/api/Alevinos', 'AlevinosController');
Route::resource('/api/Programacion/Alevinos', 'AlevinosDespachoController');

Route::post('/api/Programacion/Alevinos/despacho/despachar', 'AlevinosDespachoController@Despachar');



Route::get('/api/Programacion/Alevinos/pedido/reporte/{id}', 'AlevinosController@Reporte');
Route::get('/api/Programacion/Alevinos/usuario/{id}', 'AlevinosController@GetPedidosUsuario');
Route::get('/api/Programacion/Alevinos/usuario/delete/{id}', 'AlevinosController@borrarPedido');
Route::post('/api/Programacion/Alevinos/usuario/pendientes', 'AlevinosController@ObtenerPedidosPendientes');
Route::post('/api/Programacion/Alevinos/usuario/conductor/pendientes', 'AlevinosController@ObtenerPedidosPendientesConductores');
Route::post('/api/Programacion/Alevinos/usuario/conductor/asociar', 'AlevinosController@AsociarConductor');


Route::get('/api/Programacion/Alevinos/pedidos/archivos/{id}', 'AlevinosArchivosController@ConsultarArchivos');
Route::post('/api/Programacion/Alevinos/pedidos/archivos/guardar', 'AlevinosArchivosController@store');
Route::get('/api/Programacion/Alevinos/pedido/pdf/{id}/{filename}', 'AlevinosArchivosController@Getpdf');

Route::post('/api/Programacion/Alevinos/usuario/pedido/actualizar', 'AlevinosController@Actualizar');
Route::get('/api/Programacion/lotes/propios/', 'LoteNumeroController@ConsultarLotesPropios');
Route::post('/api/Programacion/lotes/propios/update', 'LoteNumeroController@ActualizarLotesPropios');
Route::get('/api/Programacion/lotes/propios/listos', 'LoteNumeroController@ConsultarLotesPropiosListos');
Route::post('/api/Programacion/lotes/propios/asociar', 'AlevinosController@AsociarPedidoADespachoDia');
Route::post('/api/Programacion/lotes/propios/desasociar', 'AlevinosController@desAsociarPedidoADespachoDia');



Route::resource('/api/Notificaciones', 'NotificacionesController');
Route::post('/api/Notificaciones/personalizado/', 'NotificacionesController@SendUniqueUser');
Route::post('/api/Notificaciones/unico/personalizado/', 'NotificacionesController@SendPersonal');
Route::post('/api/Notificaciones/borrar/', 'NotificacionesController@borrarToken');
Route::get('/api/Notificaciones/Actual/{id}', 'NotificacionesController@ObtenerNotificacionActual');
Route::get('/api/Notificaciones/RutasActual/{id}', 'NotificacionesController@ObtenerNotificacionRutas');

Route::post('/api/pedidos/actualizarpedido', 'PedidosController@ActualizarPedido');
Route::delete('/api/pedidos/eliminarpedido/{id}/{borrar}', 'PedidosController@EliminarPedido');

Route::get('/api/Pedidos/ObtenerPedido/{id}', 'PedidosController@getPedido');
Route::resource('/api/Distribucion', 'TrazabilidadController');
Route::get('/api/Distribucion/Despacho/{idDespacho}', 'TrazabilidadController@showAll');
Route::get('/api/Distribucion/DespachoNuevo/{idDespacho}', 'TrazabilidadController@showAllNew');

Route::post('/api/despacho/actualizar/', 'DespachoController@actualizar');

Route::get('/api/movil/despachos', 'DespachoController@despachosByToken');
Route::post('/api/movil/despachos/registrarLlegada', 'DespachoController@RegistrarLLegada');
Route::get('/api/despacho/reporte/imagen/{id}/{filename}', 'DespachosImagenesController@getImagenReporte');







Route::get('/api/Pedidos/Trazabilidad/{id}', 'PedidosController@getTraza');
Route::get('/api/Distribucion/GenerarDistribucion/{id}', 'TrazabilidadController@generarTrazaPorDespacho');
Route::get('/api/Distribucion/Obtenerdatos/{id}', 'TrazabilidadController@obtenerCajasBandejas');





Route::get('/api/Trazabilidad/{id}', 'TrazabilidadController@getTraza');
Route::get('/api/Lotes/prueba/{id}', 'LoteController@prueba');
Route::get('/api/Lotes/borrar/{id}', 'LoteController@BorrarLote');

Route::get('/api/usuarios/fincas', 'FincasController@getUserFincas');
Route::get('/api/usuarios/fincasAlevinos', 'FincasController@getUserFincasFiltrado');

Route::get('/api/usuarios/fincas/{id}', 'FincasController@getFincasUser');
Route::get('/api/datos/departamentos/', 'DatosGeneralesController@index');
Route::post('/api/movil/pedidosusuario', 'PedidosController@pedidosByToken');



Route::get('/api/movil/pedidoMortalidad/{id}', 'PedidosController@pedidosMortalidad');
Route::post('/api/movil/pedidosMortalidad', 'PedidosController@pedidosByTokenMortalidad');
Route::get('/api/usuarios/notificaciones/', 'UserController@UsuariosApp');


/**datos estadistica */
Route::get('/api/estadistica/mensual/', 'DatosGeneralesController@EstadisticaMes');
Route::get('/api/estadistica/usuario/', 'PedidosController@EstadisticaByToken');


//servicios para elmovil
Route::get('/api/datos/fincabytoken', 'FincasController@getFincasUserToken');
Route::post('/api/fincas/upload', 'FincasController@upload');
Route::get('/api/fincas/avatar/{id}/{filename}', 'FincasController@getImage');






///mortalidad movil y web/
Route::resource('/api/datos/mortalidad', 'MortalidadController');
Route::get('/api/datos/mortalidad/reportediario/{id}', 'MortalidadController@obtenerDiarioDisponible');
Route::post('/api/datos/mortalidad/reportediario/update', 'MortalidadController@ActualizarDiario');
Route::get('/api/mortalidad/registrosMortalidad', 'MortalidadController@ObtenerMortalidadesRegistradas');
Route::get('/api/mortalidad/UsuarioregistrosMortalidad/{id}', 'MortalidadController@ObtenerDetalleUsuariosMortalidades');
Route::get('/api/mortalidad/getregistrosDiarioMortalidad/{id}', 'MortalidadController@ObtenerDiarioeUsuariosMortalidades');
Route::post('/api/mortalidad/aprobar', 'MortalidadController@GuardarAprobacion');


//informes tecnicos
Route::resource('/api/informestecnicos', 'InformesTecnicosController');
Route::get('/api/movil/despachos/obtenerpropios', 'InformesTecnicosController@informesTecnicosByToken');
Route::get('/api/movil/despacho/reporte/pdf/{id}/{filename}', 'InformesTecnicosController@getpdf');
Route::get('/api/movil/despacho/reporte/existe/{id}/{fecha}', 'InformesTecnicosController@existeinforme');
Route::post('/api/informestecnicos/actualizar', 'InformesTecnicosController@actualizarInforme');


Route::get('/api/movil/despacho/reporte/informes/{id}', 'InformesTecnicosController@informesUsuario');











/***\
 * export de la aplicacion
 */


Route::get('/api/admin/informes/reporteMortalidad', 'InformesExcelController@Mortalidad');

/**datos para alevinos */

Route::get('/api/movil/alevinos/pedidos/token', 'AlevinosController@pedidosByToken');
Route::get('/api/movil/alevinos/pedidos/despachados/token', 'AlevinosController@pedidosByTokenDespachados');


Route::get('storage/{filename}', function ($filename) {
    $headers = array(
        'Content-Type: image/png',
    );
    $isset =  Storage::disk('mapas')->exists($filename);

    if ($isset) {

       $path = Storage::disk('mapas')->path($filename);

       $file = Storage::disk('mapas')->get($filename);

       // open an image file
        // $img = \Image::make($path);
        // return Image::make($path)->response('png');

        return new Response($file);

    
       
    } else {
        $data = array(
            'code' => 200,
            'status' => 'no existo',
            'user' =>  $filename
        );
    }
    return $data;
  
});


Route::get('storage/kml/{filename}', function ($filename) {
   
    $isset =  Storage::disk('mapas')->exists($filename);

    if ($isset) {

       $path = Storage::disk('mapas')->path($filename);

    //    return $path;
       // open an image file
        // $img = \Image::make($path);
         $file = \Storage::disk('mapas')->get($filename);

        //  $mimetype  =   \File::mimeType($path);
  
        //   \GuzzleHttp\Psr7\mimetype_from_filename( $path );

        //  var_dump($mimetype);
        //  die();
        //  $headers = array(
        //     'Content-Type: '. $mimetype
        // );
        // return $file;
          return new Response($file);
    
       
    } else {
        $data = array(
            'code' => 200,
            'status' => 'no existo',
            'user' =>  $filename
        );
    }
    return $data;
  
});
