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

        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array

        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'idUserFinca' => 'required|numeric',
                'tipo' => 'required',
                'cantidad' => 'required|numeric',
                'talla' => 'required|numeric',
                'peso' => 'required|numeric',
                'fechaProbable' => 'required',

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

                $talla = false;
                if( strtoupper($params_array['tipo']) == "TALLA")
                {
                    $talla = true;
                }
                $usuario = Fincas::find($params_array['idUserFinca']);
                if (is_object($usuario)) {
                    $alevinosPedido = new AlevinosPedidos();
                    $alevinosPedido->user_id = $usuario->user_id;
                    $alevinosPedido->id_finca = $usuario->id;
                    $alevinosPedido->es_talla =  $talla;
                    $alevinosPedido->es_peso =   !$talla;
                    $alevinosPedido->cantidad =   $params_array['cantidad'];
                    $alevinosPedido->centimetros =   $params_array['talla'];
                    $alevinosPedido->peso_gramos =   $params_array['peso'];
                    $alevinosPedido->fecha_probable =  str_replace('T05:00:00.000Z', '', $params_array['fechaProbable']);
                    $alevinosPedido->save();
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'id' => $alevinosPedido->id

                    );
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
