<?php

namespace App\Http\Controllers;

use App\AlevinosDespacho;
use App\AlevinosPedidos;
use App\Fincas;
use App\User;
use Illuminate\Http\Request;

class AlevinosController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('api.auth');
    }

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

        // peridiocidad tipos
        /**
         * tipo de peridiocidad
         * unico {"idDiaPedido": 1, "numeroSemana": 0}
         * quincenal
         * mensual
         * bimensual
         * trimensual
         * MAXIMO EL AÑO EN CURSO
         */
        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array
        if (!empty($params_array)) {



            $validate = \Validator::make($params_array, [
                'idUserFinca' => 'required|numeric',
                "alevinosPedidos" => "array|min:1",
                "alevinosPedidos.*.tipo" => "required",
                'alevinosPedidos.*.cantidad' => 'required|numeric',
                'alevinosPedidos.*.talla' => 'required|numeric',
                'alevinosPedidos.*.peso' => 'required|numeric',
                'alevinosPedidos.*.fechaProbableS' => 'required',

                // 'periodicidad`' => 'required|in:UNICO,QUINCENAL,MENSUAL,BIMENSUAL,TRIMESTRAL', // DEFAULT or SOCIAL values
                // 'tipo' => 'required',


            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Pedido de Alevinos, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {


                $errores = [];
                $OK = [];

                $conteoErrores = 0;
                $conteoOK = 0;

                $usuario = Fincas::find($params_array['idUserFinca']);
                if (is_object($usuario)) {

                    $pedidos = $params_array['alevinosPedidos'];
                    foreach ($pedidos as $pedido) {
                        $fecha = str_replace('T05:00:00.000Z', '', $pedido['fechaProbableS']);

                        $existe = \DB::table('alevinos_pedidos')
                            ->where([
                                ['alevinos_pedidos.fecha_probable', '=',  $fecha],
                                ['alevinos_pedidos.user_id', '=',  $usuario->user_id]
                            ])
                            ->select('alevinos_pedidos.fecha_probable')
                            ->get();


                        $talla = false;
                        if (strtoupper($pedido['tipo']) == "TALLA") {
                            $talla = true;
                        }


                        $date = new \DateTime($fecha);
                        $week = $date->format("W");

                        $dayNumber = $date->format("N");
                        $dayName = $this->NombreDia($dayNumber);

                        $alevinosPedido = new AlevinosPedidos();
                        $alevinosPedido->user_id = $usuario->user_id;
                        $alevinosPedido->id_finca = $usuario->id;
                        $alevinosPedido->despachado =  false;
                        $alevinosPedido->es_talla =  $talla;
                        $alevinosPedido->es_peso =   !$talla;

                        if ($talla) {
                            $alevinosPedido->centimetros =  $pedido['talla'];
                            $alevinosPedido->peso_gramos =   0;
                        } else {
                            $alevinosPedido->peso_gramos =   $pedido['peso'];
                            $alevinosPedido->centimetros =   0;
                        }
                        $alevinosPedido->cantidad =   $pedido['cantidad'];
                        $alevinosPedido->numero_semana = $week;
                        $alevinosPedido->dia =  $dayName;
                        $alevinosPedido->fecha_probable =  str_replace('T05:00:00.000Z', '', $pedido['fechaProbableS']);
                        $alevinosPedido->save();

                        if (count($existe) == 0) {
                            $OK[$conteoOK] = $pedido;
                            $conteoOK += 1;
                        } else {
                            $errores[$conteoErrores] = $pedido;
                            $conteoErrores += 1;
                        }
                    }

                    if (count($errores) == 0) {
                        $data = array(
                            'code' => 200,
                            'status' => 'success',
                            'id' => $alevinosPedido->id,
                            'OK' => $OK


                        );
                    } else {
                        $data = array(
                            'code' => 201,
                            'status' => 'success',
                            'duplicados' => $errores,
                            'OK' => $OK


                        );
                    }
                } else {
                    $data = array(
                        'code' => 401,
                        'status' => 'no existe',

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


    public function Actualizar(Request $request)
    {

        // peridiocidad tipos
        /**
         * tipo de peridiocidad
         * unico {"idDiaPedido": 1, "numeroSemana": 0}
         * quincenal
         * mensual
         * bimensual
         * trimensual
         * MAXIMO EL AÑO EN CURSO
         */
        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array
        if (!empty($params_array)) {


            $params = json_decode($json); //objeto

            $validate = \Validator::make($params_array, [
                'id' => 'required|numeric',
                "tipo" => "required",
                'cantidad' => 'required|numeric',
                'talla' => 'required|numeric',
                'peso' => 'required|numeric',
                'fechaProbableS' => 'required',
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Pedido de Alevinos, no se ha actualizado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {
                $errores = [];
                $OK = [];
                $conteoErrores = 0;
                $conteoOK = 0;

                $pedido = AlevinosPedidos::find($params->id);
                if (is_object($pedido)) {

                    $fecha = str_replace('T05:00:00.000Z', '', $params->fechaProbableS);
                    $pedido->fecha_probable = $fecha;
                    $talla = false;
                    if (strtoupper($params->tipo == "TALLA")) {
                        $talla = true;
                    }


                    $date = new \DateTime($fecha);
                    $week = $date->format("W");

                    $dayNumber = $date->format("N");
                    $dayName = $this->NombreDia($dayNumber);


                    $pedido->es_talla =  $talla;
                    $pedido->es_peso =   !$talla;
                    if ($talla) {
                        $pedido->centimetros =   $params->talla;
                        $pedido->peso_gramos =   0;
                    } else {
                        $pedido->peso_gramos =   $params->peso;
                        $pedido->centimetros =   0;
                    }

                    $pedido->cantidad =   $params->cantidad;


                    $pedido->numero_semana = $week;
                    $pedido->dia =  $dayName;
                    $pedido->save();



                    $data = array(
                        'code' => 200,
                        'status' => 'success',

                    );
                } else {
                    $data = array(
                        'code' => 401,
                        'status' => 'bye amigo',

                    );
                }
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 401,
                'dato' => $params_array,
                'message' => 'bye amigo',
            );
        }
        // guardar los datos
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
    public function datosPedido($id, $despachado)
    {
        $despachos = \DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->where([['users.id', '=', $id], ['alevinos_pedidos.despachado', '=', $despachado]])
            ->select(
                'alevinos_pedidos.id',
                \DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
                'alevinos_pedidos.fecha_probable as fechaProbable',

                'alevinos_pedidos.fecha_probable as fechaProbableS',
                'fincas.nombre',
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion'

            )
            ->orderBy('fecha_probable', 'asc')
            ->get();

        return $despachos;
    }
    public function GetPedidosUsuario($id)
    {

        $usuario = User::find($id);
        if (is_object($usuario)) {



            $despachosSin = $this->datosPedido($id, false);
            $despachosOK = $this->datosPedido($id, true);

            // $despachos = AlevinosPedidos::
            // where(
            //    [ ['user_id', '=', $id]]
            // )->get();

            return response()->json([
                'code' => 200,
                'status' => 'success',
                'alevinosPedidos' => $despachosSin,
                'despachados' => $despachosOK,


            ]);
        } else {
            return response()->json([
                'code' => 400,
                'status' => 'error',

            ]);
        }
    }


    public function borrarPedido($id)
    {

        $despachos = \DB::table('alevinos_pedidos')

            ->where([['alevinos_pedidos.id', '=', $id], ['alevinos_pedidos.despachado', '=', false]])
            ->get();
        if (count($despachos) > 0) {
            $deletedRows = AlevinosPedidos::where('id', $id)->delete();
            return response()->json([
                'code' => 200,
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'code' => 401,
                'status' => 'success',

            ]);
        }
    }


    /**
     * Metodo para consultar po id del dia del despacho
     * con esto traemos los pedidos de esta semana y los que estan resagados
     *
     * */
    public function ObtenerPedidosPendientes(Request $request)
    {
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto


        if (!empty($params)) {



            $validate = \Validator::make($params_array, [
                'idDiaPedido' => 'required|numeric',
                "numeroSemana" => 'required|numeric',
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                $Adespachos = AlevinosDespacho::find($params->idDiaPedido);

                if (is_object($Adespachos)) {
                    /**
                     * Buscar los despachos con el numer de semana del despacho 
                     * 
                     */
                    $numerosemana = $Adespachos->numero_semana +  $params->numeroSemana;
                    $despachos = \DB::table('alevinos_pedidos')
                        ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
                        ->join('users', 'users.id', '=', 'fincas.user_id')
                        ->where(
                            [
                                ['alevinos_pedidos.numero_semana', '<=', $numerosemana],
                                ['alevinos_pedidos.despachado', '=', false],
                            ]
                        )
                        ->select(
                            'alevinos_pedidos.id',
                            \DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                            'alevinos_pedidos.es_talla',
                            'alevinos_pedidos.es_peso',
                            'alevinos_pedidos.cantidad',
                            'alevinos_pedidos.centimetros AS talla',
                            'alevinos_pedidos.peso_gramos as peso',
                            'alevinos_pedidos.numero_semana as semana',
                            'alevinos_pedidos.dia',
                            'alevinos_pedidos.despachado',
                            'alevinos_pedidos.fecha_probable as fechaProbable',
                            'alevinos_pedidos.fecha_probable as fechaProbableS',
                            'fincas.nombre',
                            'fincas.municipio',
                            'fincas.departamento',
                            'fincas.direccion'

                        )
                        ->orderBy('numero_semana', 'asc')
                        ->get();

                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'despachados' => $despachos,

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
                'code' => 400,
                'dato' => $json,
                'message' => 'Sin datos que procesar',
            );
        }
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
}
