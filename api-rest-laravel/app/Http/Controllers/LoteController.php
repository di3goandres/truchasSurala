<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Lotes;
use App\BandejasLotes;

class LoteController extends Controller {

    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        $lotes = Lotes::all();

        return response()->json([
                    'code' => 200,
                    'status' => 'success',
                    'Lotes' => $lotes
        ]);
    }

    public function show($id)
    {
        $lotes = Lotes::find($id);
        if (is_object($lotes))
        {
                  
            $bandejas = BandejasLotes::where('id_lote', $id)->get();

            $data = ['code' => 200,
                'status' => 'success',
                'cajas' => $lotes,
                'bandejas' => $bandejas
            ];
        }
        else
        {
            $data = ['code' => 404,
                'status' => 'Lote No encontrado',
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        //recoger los datos por post 
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        // validar los datos


        if (!empty($params_array))
        {
            $validate = \Validator::make($params_array, [
                        'id_despacho' => 'required',
                        'fecha_desove' => 'required',
                        'linea_genetica' => 'required',
                        'tamanio' => 'required|regex:/^\d+(\.\d{1,2})?$/',
                        'ovasml' => 'required|regex:/^\d+(\.\d{1,2})?$/',
                        'total_lote' => 'required|numeric',
                        'numero_cajas' => 'required|numeric',
                        'edad' => 'required|numeric',
            ]);


            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'Lote, no se pudo crear',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            }
            else
            {

                $modulo = $params_array['total_lote'] % $params_array['numero_cajas'];

                if ($modulo != 0)
                {
                    $data = array(
                        'code' => 400,
                        'status' => 'error',
                        'message' => 'validar el tamaño del lote, y el numero de cajas'
                    );
                }
                else
                {

                    $lote = new Lotes();
                    $lote->id_despacho = $params_array['id_despacho'];
                    $lote->fecha_desove = $params_array['fecha_desove'];
                    $lote->linea_genetica = $params_array['linea_genetica'];
                    $lote->tamanio = $params_array['tamanio'];
                    $lote->ovas_ml = $params_array['ovasml'];
                    $lote->total_lote = $params_array['total_lote'];
                    $lote->numero_bandejas = $params_array['numero_cajas'];
                    $lote->edad_tcu = $params_array['edad'];



                    //Guardar el Usuario
                    $lote->save();
                    //devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'lote' => $lote
                    );
                }
            }
        }
        else
        {
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
