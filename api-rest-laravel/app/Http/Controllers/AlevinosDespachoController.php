<?php

namespace App\Http\Controllers;

use App\AlevinosDespacho;
use App\AlevinosPedidos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AlevinosDespachoController extends Controller
{
    public function __construct()
    {
        // $this->middleware('api.auth', ['except' => ['show']]);
        $this->middleware('api.auth');

    }

    // public function show($id)
    // {
    //     $despacho = AlevinosDespacho::find($id);
    //     $despachoPedidosSemana = $despacho->pedidosSemana;
    //     foreach ($despachoPedidosSemana as $des) {

    //         $pedido = AlevinosPedidos::find($des->id_alevinos_pedidos);
    //         if (is_object($pedido)) {
    //             $remision = DB::select('call RemisionAlevinos()');
    //             $pedido->remision_numero = $remision[0]->valor;
    //             $pedido->save();
    //         }
    //     }
    //     $data = [
    //         'code' => 200,
    //         'status' => 'success',
    //     ];
    //     return response()->json($data, $data['code']);
    // }
    public function NombreDia($dayNumber)
    {
        $nombre = "";
        switch ($dayNumber) {
            case 1:
                $nombre = 'Lunes';
                break;
            case 2:
                $nombre = 'Martes';
                break;
            case 3:
                $nombre = 'Miércoles';
                break;
            case 4:
                $nombre = 'Jueves';
                break;
            case 5:
                $nombre = 'Viernes';
                break;
            case 6:
                $nombre = 'Sabado';
                break;
            case 7:
                $nombre = 'Domingo';
                break;
        }
        return $nombre;
    }
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array

        if (!empty($params_array)) {
            $validate = Validator::make($params_array, [

                'fecha_salida' => 'required'

            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Programacion de Alevinos, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {
                $fecha = str_replace('T05:00:00.000Z', '', $params_array['fecha_salida']);
                $programacion = DB::table('alevinos_dia_despacho')
                    ->where('alevinos_dia_despacho.fecha_salida', '=',  $fecha)
                    ->select('alevinos_dia_despacho.fecha_salida')
                    ->get();
                if (count($programacion) == 0) {
                    $date = new \DateTime($fecha);
                    $week = $date->format("W");
                    $dayNumber = $date->format("N");
                    $dayName = $this->NombreDia($dayNumber);
                    $alevinoProgramacion = new AlevinosDespacho();
                    $alevinoProgramacion->fecha_salida =  $fecha;
                    $alevinoProgramacion->despachado =   false;
                    $alevinoProgramacion->numero_semana = $week;
                    $alevinoProgramacion->dia =  $dayName;
                    $alevinoProgramacion->save();
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'id' => $alevinoProgramacion,
                    );
                } else {
                    $data = array(
                        'code' => 201,
                        'status' => 'ya existe esta programacion',
                    );
                }
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 401,
                'dato' => $params_array,
                'message' => 'Sin datos que procesar',
            );
        }
        // guardar los datos
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
    //Metodo par obtner los despachos que se han creado.
    public function index()
    {
        $despachos = AlevinosDespacho::orderby('fecha_salida', 'ASC')->get();
        $retorno = [];
        $id = 0;
        foreach ($despachos as $despacho) {
            $retorno[$id] = ($despacho);
            $retorno[$id]['estado'] = $despacho->despachado == true ? "DESPACHADO" : "SIN DESPACHAR";
            $id = $id + 1;
        }
        return response()->json([
            'code' => 200,
            'status' => 'success',
            'programacion' => $retorno
        ]);
    }


    /**
     * metodo encargado de despachar el pedido del dia
     *  
     */
    public function Despachar(Request $request)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto
        if (!empty($params)) {
            $validate = Validator::make($params_array, [
                "id" => 'required|numeric',
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 401,
                );
            } else {
                $despacho = AlevinosDespacho::find($params->id);
                if (is_object($despacho)) {
                    /**
                     * Buscar los despachos 
                     */

                    $despacho->despachado = true;
                    $despacho->save();
                    //Obtener todos los pedidos y actualizar el numero de remision

                    $despachoPedidosSemana = $despacho->pedidosSemana;
                    foreach ($despachoPedidosSemana as $des) {
            
                        $pedido = AlevinosPedidos::find($des->id_alevinos_pedidos);
                        if (is_object($pedido)) {
                            $remision = DB::select('call RemisionAlevinos()');
                            $pedido->remision_numero = $remision[0]->valor;
                            $pedido->save();
                        }
                    }

                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                    );
                } else {
                    //no deberia llegar datos que no existan
                    $data = array(
                        'status' => 'error',
                        'code' => 401,
                    );
                }
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 401,
                'dato' => $json,
                'message' => 'Sin datos que procesar',
            );
        }
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
}
