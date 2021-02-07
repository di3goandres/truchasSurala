<?php

namespace App\Http\Controllers;

use App\AlevinosPedidos;
use App\Fincas;
use Illuminate\Http\Request;

class AlevinosController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function store(Request $request)
    {

        // peridiocidad tipos
        /** 
         * tipo de peridiocidad
         * unico
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

                        if (count($existe) == 0) {
                            $talla = false;
                            if (strtoupper($pedido['tipo']) == "TALLA") {
                                $talla = true;
                            }
                            $alevinosPedido = new AlevinosPedidos();
                            $alevinosPedido->user_id = $usuario->user_id;
                            $alevinosPedido->id_finca = $usuario->id;
                            $alevinosPedido->despachado =  false;
                            $alevinosPedido->es_talla =  $talla;
                            $alevinosPedido->es_peso =   !$talla;
                            $alevinosPedido->cantidad =   $pedido['cantidad'];
                            $alevinosPedido->centimetros =   $pedido['talla'];
                            $alevinosPedido->peso_gramos =   $pedido['peso'];
                            $alevinosPedido->fecha_probable =  str_replace('T05:00:00.000Z', '', $pedido['fechaProbableS']);
                            $alevinosPedido->save();
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
                    }else{
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
}
