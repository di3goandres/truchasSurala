<?php

namespace App\Http\Controllers;

use App\AlevinosDespacho;
use App\AlevinosPedidos;
use App\AlevinosSalida;
use App\Fincas;
use App\Helpers\JwtAuth;
use App\LoteNumero;
use App\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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



            $validate = Validator::make($params_array, [
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

                        $existe = DB::table('alevinos_pedidos')
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

            $validate = Validator::make($params_array, [
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

    public function PedidosASOCIADOS($IdDespacho)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')


            ->where(
                [
                    ['alevinos_dia_despacho.id', '=', $IdDespacho],
                ]
            )
            ->select(
                'alevinos_pedidos.id',
                'alevinos_pedidos.conductor_id as conductor',
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_dia_despacho.id as id_despacho',
                'alevinos_pedidos.id_lote_numero',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbable"),
                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbableS"),
              
                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"),
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion'
            )
            ->orderBy('alevinos_pedidos.numero_semana', 'asc')
            ->get();
        return $despachos;
    }

    public function PedidosASOCIADOSinConductor($IdDespacho)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')


            ->where(
                [
                    ['alevinos_dia_despacho.id', '=', $IdDespacho],
                    ['alevinos_pedidos.conductor_id', '=', "0"],
                ]
            )
            ->whereNotNull('alevinos_pedidos.id_lote_numero')
            ->select(
                'alevinos_pedidos.id',
                // 'alevinos_pedidos.conductor_id as conductor',
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_dia_despacho.id as id_despacho',
                'alevinos_pedidos.id_lote_numero',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
               DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbable"),
                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbableS"),
                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"),
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion'
            )
            ->orderBy('alevinos_pedidos.numero_semana', 'asc')
            ->get();
        return $despachos;
    }

    public function PedidosASOCIADOSConductor($IdDespacho)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users as users', 'users.id', '=', 'fincas.user_id')
            ->join('users as conductor', 'conductor.id', '=', 'alevinos_pedidos.conductor_id')
            ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')
            ->where(
                [
                    ['alevinos_dia_despacho.id', '=', $IdDespacho],


                ]
            )
            ->select(
                'alevinos_pedidos.id',
                'alevinos_pedidos.conductor_id as conductor',
                DB::raw("CONCAT(conductor.name, ', ', conductor.surname) as NombreConductor"),
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_dia_despacho.id as id_despacho',
                'alevinos_pedidos.id_lote_numero',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
               DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbable"),
                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbableS"),
                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"),
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion'
            )
            ->orderBy('alevinos_pedidos.numero_semana', 'asc')
            ->get();
        return $despachos;
    }

    public function Pedidos($numerosemana, $despachado)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->where(
                [
                    ['alevinos_pedidos.fecha_probable', '<=', $numerosemana],
                    ['alevinos_pedidos.despachado', '=', $despachado],
                ]
            )
            ->select(
                'alevinos_pedidos.id',
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
               DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbable"),
                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbableS"),
                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"),
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion'

            )
            ->orderBy('numero_semana', 'asc')
            ->get();

        return $despachos;
    }

    public function ReportePedidoAlevino($idPedidoAlevino)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users as users', 'users.id', '=', 'fincas.user_id')
            ->join('users as conductor', 'conductor.id', '=', 'alevinos_pedidos.conductor_id')
            ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')
            ->join('lote_numero', 'lote_numero.id', '=', 'alevinos_pedidos.id_lote_numero')

            ->where(
                [
                    ['alevinos_pedidos.id', '=', $idPedidoAlevino],
                    ['alevinos_dia_despacho.despachado', '=', true],

                ]
            )
            ->select(
                'alevinos_pedidos.id',
                DB::raw("DATE_FORMAT(alevinos_dia_despacho.fecha_salida, '%Y-%m-%d') as fecha_salida"),

                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"), // CLIENTE
                /**DESTINO */
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion',
                /** FIN DESTINO */
                'alevinos_pedidos.remision_numero',
                'alevinos_pedidos.lote_alevinos',
                /**Datos del lote */
                'alevinos_pedidos.id_lote_numero',
                'lote_numero.numero_lote',
                'lote_numero.tamanio',
                'lote_numero.edad_tcu',
                'lote_numero.ovas_ml',

                DB::raw("DATE_FORMAT(lote_numero.fecha_incubacion, '%Y-%m-%d') as fecha_incubacion"),
                DB::raw("DATE_FORMAT(lote_numero.fecha_fin_aborcion, '%Y-%m-%d') as fecha_fin_absorcion"),
                DB::raw("DATE_FORMAT(lote_numero.fecha_eclosion, '%Y-%m-%d') as fecha_eclosion"),

                DB::raw("DATE_FORMAT(lote_numero.fecha_primer_alimento, '%Y-%m-%d') as fecha_primer_alimento"),

                'lote_numero.temp_eclosion', // 'lote_numero.fecha_primer_alimento',

                'alevinos_pedidos.referencia_alimento',


                /**fin Datos del lote */

                'alevinos_pedidos.tratamientos_veterinarios',
                'alevinos_pedidos.duracion_tratamiento',
                'alevinos_pedidos.temp_cargue',



                'alevinos_pedidos.conductor_id as conductor',
                DB::raw("CONCAT(conductor.name, ', ', conductor.surname) as NombreConductor"),
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),


                /**Datos del pedido */
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_dia_despacho.id as id_despacho',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
                /**Fin Datos del pedido */
                /**Datos del pedido despachado */

                'alevinos_pedidos.cantidad_alevinos',
                'alevinos_pedidos.talla_promedio',
                'alevinos_pedidos.peso_promedio',
                'alevinos_pedidos.cantidad_alevinos',


            )
            ->get();
        return $despachos;
    }

    public function datosPedido($id, $despachado)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->where([['users.id', '=', $id], ['alevinos_pedidos.despachado', '=', $despachado]])
            ->select(
                'alevinos_pedidos.id',
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
               DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbable"),

                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbableS"),
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

        $despachos = DB::table('alevinos_pedidos')

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



            $validate = Validator::make($params_array, [
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
                     $addday = $params->numeroSemana*7;
                     $stop_date = new DateTime($Adespachos->fecha_salida);
                    $fechaSalida = $stop_date->modify('+' .$addday. 'day');
                    $numerosemana = $Adespachos->numero_semana +  $params->numeroSemana;
                    $despachos = $this->Pedidos($fechaSalida, false);
                    $despachosOK = $this->PedidosASOCIADOS($params->idDiaPedido);


                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'despachados' => $despachos,
                        'Asociados' => $despachosOK,
                        'fecha' => $fechaSalida


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

    /**
     * ser envia un despacho y un pedido y se asocian
     * adicional se guarda informacion como
     *     id_despacho:                     number;  alevinos_pedidos id
     *     id_lote:                         number;
     *     id_pedido:                       number;
     *     lote_alevinos:                   string;
     *     referencia_alimento:             string;
     *     tratamientos_veterinarios:       string;
     *     duracion_tratamiento:            number;
     *     cantidad_alevinos:               number;
     *     peso_promedio:                   number;
     *     talla_promedio:                  number;
     */
    public function AsociarPedidoADespachoDia(Request $request)
    {
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto


        if (!empty($params)) {
            $validate = Validator::make($params_array, [
                'id_despacho' => 'required|numeric',
                "id_lote" => 'required|numeric',
                "id_pedido" => 'required|numeric',

                "lote_alevinos" => 'required',
                // "referencia_alimento" => 'required',
                "tratamientos_veterinarios" => 'required',
                "duracion_tratamiento" => 'required|numeric',
                "cantidad_alevinos" => 'required',
                "peso_promedio" => 'required',
                "talla_promedio" => 'required',
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {
                $Adespachos = AlevinosDespacho::find($params->id_despacho);
                $pedido = AlevinosPedidos::find($params->id_pedido);
                $lote = LoteNumero::find($params->id_lote);


                if (is_object($Adespachos) &&  is_object($pedido) && is_object($lote)) {
                    /**
                     * Buscar los despachos con el numer de semana del despacho 
                     * 
                     */

                    /**
                     * Guardamos la relacion entre el despacho y el pedido.
                     */
                    $alevinoSalida = new AlevinosSalida();
                    $alevinoSalida->id_alevinos_pedidos = $pedido->id;
                    $alevinoSalida->id_alevinos_dia_despacho = $Adespachos->id;
                    $alevinoSalida->save();

                    /**
                     * actualizamos los datos del pedido del cliente
                     * 
                     */
                    $pedido->despachado = true;
                    $pedido->lote_alevinos = $params->lote_alevinos;
                    $pedido->id_lote_numero = $params->id_lote;
                    // $pedido->referencia_alimento = $params->referencia_alimento;
                    $pedido->tratamientos_veterinarios = $params->tratamientos_veterinarios;
                    $pedido->duracion_tratamiento = $params->duracion_tratamiento;
                    $pedido->cantidad_alevinos = $params->cantidad_alevinos;
                    $pedido->peso_promedio = $params->peso_promedio;
                    $pedido->talla_promedio = $params->talla_promedio;


                    $pedido->save();

                    /**
                     * suamamnos la cantidad de alevinos a lo usado.
                     */
                    $lote->tamanio_usado_alevinos =  $lote->tamanio_usado_alevinos + $params->cantidad_alevinos;
                    $lote->save();


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
                'code' => 400,
                'dato' => $json,
                'message' => 'Sin datos que procesar',
            );
        }
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }

    /**
     * ser envia un despacho y un pedido y se asocian
     * adicional se guarda informacion como
     *     id_despacho:                     number;  alevinos_pedidos id
     *     id_lote:                         number;
     *     id_pedido:                       number;
     *     lote_alevinos:                   string;
     *     referencia_alimento:             string;
     *     tratamientos_veterinarios:       string;
     *     duracion_tratamiento:            number;
     *     cantidad_alevinos:               number;
     *     peso_promedio:                   number;
     *     talla_promedio:                  number;
     */
    public function desAsociarPedidoADespachoDia(Request $request)
    {
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto


        if (!empty($params)) {
            $validate = Validator::make($params_array, [
                'id_despacho' => 'required|numeric',
                "id_lote_numero" => 'required|numeric',
                "id" => 'required|numeric',

            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {
                $Adespachos = AlevinosDespacho::find($params->id_despacho);
                $pedido = AlevinosPedidos::find($params->id);
                $lote = LoteNumero::find($params->id_lote_numero);


                if (is_object($Adespachos) &&  is_object($pedido) && is_object($lote)) {
                    /**
                     * Buscar los despachos con el numer de semana del despacho 
                     * 
                     */

                    /**
                     * buscamos la relacion entre el despacho y el pedido.
                     */

                    $borrardatos =  AlevinosSalida::where(
                        [
                            ['id_alevinos_pedidos', '=', $pedido->id],
                            ['id_alevinos_dia_despacho', '=', $Adespachos->id]
                        ]
                    )->get();

                    foreach ($borrardatos as $borrar) {
                        $borrar->delete();
                    }


                    /**
                     * restamos la cantidad de alevinos a lo usado.
                     */
                    $lote->tamanio_usado_alevinos =  $lote->tamanio_usado_alevinos - $pedido->cantidad_alevinos;
                    $lote->save();
                    /**
                     * actualizamos los datos del pedido del cliente
                     * 
                     */
                    $pedido->despachado = false;
                    $pedido->lote_alevinos = '';
                    $pedido->id_lote_numero = null;
                    // $pedido->referencia_alimento = $params->referencia_alimento;
                    $pedido->tratamientos_veterinarios = '';
                    $pedido->duracion_tratamiento = 0;
                    $pedido->peso_promedio = 0;
                    $pedido->talla_promedio = 0;
                    $pedido->conductor_id = 0;
                    $pedido->temp_cargue = 0;


                    $pedido->save();
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
                'code' => 400,
                'dato' => $json,
                'message' => 'Sin datos que procesar',
            );
        }
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }


    /**
     * Asociar conductor y temperatura de cargue.
     * 
     */
    public function AsociarConductor(Request $request)
    {
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto


        if (!empty($params)) {
            $validate = Validator::make($params_array, [
                'conductor' => 'required|numeric',
                "id" => 'required|numeric',
                "temp_cargue" => 'required|numeric',
                "referencia_alimento" => 'required',

            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 401,
                );
            } else {
                $Adespachos = User::find($params->conductor);
                $pedido = AlevinosPedidos::find($params->id);
                if (is_object($Adespachos) &&  is_object($pedido)) {
                    /**
                     * Buscar los despachos con el numer de semana del despacho 
                     * 
                     * actualizamos los datos del pedido del cliente
                     * 
                     */
                    $pedido->conductor_id = $params->conductor;
                    $pedido->temp_cargue = $params->temp_cargue;
                    $pedido->referencia_alimento = $params->referencia_alimento;
                    $pedido->save();
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

    public function ObtenerPedidosPendientesConductores(Request $request)
    {
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto


        if (!empty($params)) {



            $validate = Validator::make($params_array, [
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
                    $sinconductor = $this->PedidosASOCIADOSinConductor($params->idDiaPedido);
                    $conconductor = $this->PedidosASOCIADOSConductor($params->idDiaPedido);


                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'despachados' => $sinconductor,
                        'Asociados' => $conconductor,


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


    public function Reporte($id)
    {
        $reporte = $this->ReportePedidoAlevino($id);
        if (count($reporte) > 0) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'reporte' => $reporte[0]
            ];
        } else {
            $data = [
                'code' => 201,
                'status' => 'success',
            ];
        }

        return response()->json($data, $data['code']);
    }


    public function PedidosUsuarioPendientes($idUsuario)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users as users', 'users.id', '=', 'fincas.user_id')
            // ->join('users as conductor', 'conductor.id', '=', 'alevinos_pedidos.conductor_id')
            // ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            // ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')
            ->where(
                [
                    ['users.id', '=', $idUsuario],
                 ['alevinos_pedidos.despachado', '=', false],

                ]
            )
            ->select(
                'alevinos_pedidos.id',
                'alevinos_pedidos.conductor_id as conductor',
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_pedidos.id_lote_numero',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
                DB::raw("DATE_FORMAT(alevinos_pedidos.fecha_probable, '%Y-%m-%d') as fechaProbable"),
                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"),
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion'
            )
            ->orderBy('alevinos_pedidos.numero_semana', 'asc')
            ->get();
        return $despachos;
    }
    //Pedidos Pendientes
    public function pedidosByToken(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken) {
            $user = $jwtAuth->checkToken($token, true);

            $pedidos = $this->PedidosUsuarioPendientes($user->sub);
            $data = array(
                'code' => 200,
                'status' => 'success',
                'pedidos' => $pedidos,

            );
        } else {
            $data = array(
                'code' => 401,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }


    /** Obtener pedidos que ya fueron despachados */
    public function ReportePedidoAlevinoToken($idUsuario)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users as users', 'users.id', '=', 'fincas.user_id')
            ->join('users as conductor', 'conductor.id', '=', 'alevinos_pedidos.conductor_id')
            ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')
            ->join('lote_numero', 'lote_numero.id', '=', 'alevinos_pedidos.id_lote_numero')
            ->join('despachos', 'despachos.id', '=', 'lote_numero.id_despacho')



            ->where(
                [
                    ['users.id', '=', $idUsuario],
                    ['alevinos_dia_despacho.despachado', '=', true],

                ]
            )
            ->select(
                'alevinos_pedidos.id',
                DB::raw("DATE_FORMAT(alevinos_dia_despacho.fecha_salida, '%Y-%m-%d') as fecha_salida"),

                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombre"), // CLIENTE
                /**DESTINO */
                'fincas.municipio',
                'fincas.departamento',
                'fincas.direccion',
                /** FIN DESTINO */
                'alevinos_pedidos.remision_numero',
                'alevinos_pedidos.lote_alevinos',
                /**Datos del lote */
                'alevinos_pedidos.id_lote_numero',
                'despachos.certificado',
                 DB::raw('(CASE WHEN despachos.certificado = "pendiente" THEN 0 ELSE 1 END) AS ExisteCertificado'),
                'lote_numero.numero_lote',
                'lote_numero.tamanio',  
                'lote_numero.edad_tcu',
                'lote_numero.ovas_ml',

                DB::raw("DATE_FORMAT(lote_numero.fecha_incubacion, '%Y-%m-%d') as fecha_incubacion"),
                DB::raw("DATE_FORMAT(lote_numero.fecha_fin_aborcion, '%Y-%m-%d') as fecha_fin_absorcion"),
                DB::raw("DATE_FORMAT(lote_numero.fecha_eclosion, '%Y-%m-%d') as fecha_eclosion"),

                DB::raw("DATE_FORMAT(lote_numero.fecha_primer_alimento, '%Y-%m-%d') as fecha_primer_alimento"),

                'lote_numero.temp_eclosion', // 'lote_numero.fecha_primer_alimento',

                'alevinos_pedidos.referencia_alimento',


                /**fin Datos del lote */

                'alevinos_pedidos.tratamientos_veterinarios',
                'alevinos_pedidos.duracion_tratamiento',
                'alevinos_pedidos.temp_cargue',



                'alevinos_pedidos.conductor_id as conductor',
                DB::raw("CONCAT(conductor.name, ', ', conductor.surname) as NombreConductor"),
                DB::raw("(CASE WHEN es_talla = 1  THEN 'TALLA' ELSE 'PESO' END) AS tipo"),


                /**Datos del pedido */
                'alevinos_pedidos.es_talla',
                'alevinos_pedidos.es_peso',
                'alevinos_pedidos.cantidad',
                'alevinos_dia_despacho.id as id_despacho',
                'alevinos_pedidos.centimetros AS talla',
                'alevinos_pedidos.peso_gramos as peso',
                'alevinos_pedidos.numero_semana as semana',
                'alevinos_pedidos.dia',
                'alevinos_pedidos.despachado',
                /**Fin Datos del pedido */
                /**Datos del pedido despachado */

                'alevinos_pedidos.cantidad_alevinos',
                'alevinos_pedidos.talla_promedio',
                'alevinos_pedidos.peso_promedio',
                'alevinos_pedidos.cantidad_alevinos',


            )
            ->orderBy('alevinos_dia_despacho.fecha_salida', 'desc')
            ->get();
        return $despachos;
    }
    public function pedidosByTokenDespachados(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken) {
            $user = $jwtAuth->checkToken($token, true);
            $pedidos = $this->ReportePedidoAlevinoToken($user->sub);
            $data = array(
                'code' => 200,
                'status' => 'success',
                'despachados' => $pedidos,
            );
        } else {
            $data = array(
                'code' => 401,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }
}
