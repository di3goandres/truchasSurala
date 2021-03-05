<?php

namespace App\Http\Controllers;

use App\LoteNumero;
use Illuminate\Http\Request;

class LoteNumeroController extends Controller
{
    //
    public function __construct()
    {
        //$this->middleware('api.auth');
    }

    public function ConsultarLotesPropios()
    {
        // recoger los datos por post / get
        $priopios = \DB::select('call 03_ConsultarLotesPropios()');
        $data = array(
            'code' => 200,
            'status' => 'success',
            'lotesPropios' => $priopios
        );
        return response()->json($data, $data['code']);
    }

    public function ConsultarLotesPropiosListos()
    {
        // recoger los datos por post / get
        $priopios = \DB::select('call 04_LotesPropiosListos()');
        $data = array(
            'code' => 200,
            'status' => 'success',
            'lotesPropios' => $priopios
        );
        return response()->json($data, $data['code']);
    }

    public function ActualizarLotesPropios(Request $request)
    {
        //recoger los datos por post 
        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array
        // validar los datos
        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'id' => 'required|numeric',
                'fecha_incubacion' => 'required',
                'fecha_eclosion' => 'required',
                'fecha_fin_aborcion' => 'required',
                'temp_eclosion' => 'required',
                'fecha_primer_alimento' => 'required'

            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Pedido, no se ha actualizado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                $lote = LoteNumero::find($params_array['id']);
                if (is_object($lote)) {


                    $lote->fecha_incubacion = $params_array['fecha_incubacion'];
                    $lote->fecha_eclosion = $params_array['fecha_eclosion'];
                    $lote->fecha_fin_aborcion = $params_array['fecha_fin_aborcion'];
                    $lote->temp_eclosion = $params_array['temp_eclosion'];
                    $lote->fecha_primer_alimento = $params_array['fecha_primer_alimento'];
                    $lote->save();
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                    );
                }else{
                    $data = array(
                        'code' => 401,
                        'status' => 'bye',
                    );
                }
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'dato' => $params_array,
                'message' => 'Sin datos que procesar',
            );
        }
        // guardar los datos
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
}
