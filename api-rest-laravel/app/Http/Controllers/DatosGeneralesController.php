<?php

namespace App\Http\Controllers;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Municipios;
use App\Departamentos;
use App\Despacho;

class DatosGeneralesController extends Controller
{
     public function __construct()
     {
         $this->middleware('api.auth');
     }

  public function index()
  {
    $municipios = Municipios::all();
    $departamentos = Departamentos::all();

    $i = 0;
    foreach ($municipios as $value) {

      unset($municipios[$i]['created_at']);
      unset($municipios[$i]['updated_at']);
      $i += 1;
    }
    $i = 0;
    foreach ($departamentos as $value) {
      unset($departamentos[$i]['id']);
      unset($departamentos[$i]['created_at']);
      unset($departamentos[$i]['updated_at']);
      $i += 1;
    }

    return response()->json([
      'code' => 200,
      'status' => 'success',
      'departamentos' => $departamentos,
      'municipios' => $municipios
    ]);
  }

  public function EstadisticaMes()
  {
    $despachos = Despacho::orderby('id', 'ASC')->get();
    $infoDespacho = [];
    $conteo = 0;
    foreach ($despachos as $despacho) {
      $infoDespacho[$conteo]['name'] = $despacho->fecha;
      $infoDespacho[$conteo]['value'] = $despacho->numero_ovas;

      $conteo += 1;
    }
    

    return response()->json([
      'code' => 200,
      'status' => 'success',
      'Mes' => $infoDespacho
    ]);
  }
}
