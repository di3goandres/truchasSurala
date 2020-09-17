<?php

namespace App\Http\Controllers;

use App\Mortalidad;
use App\MortalidadDiario;
use App\MortalidadPreguntas;
use Illuminate\Http\Request;

class MortalidadController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('api.auth');
    // }


    public function show($id)
    {
        $mortalidad = Mortalidad::find($id);



        if (is_object($mortalidad)) {
         

            $mortalidad->Preguntas;
            $mortalidad->Diario;


            unset($mortalidad['created_at']);
            unset($mortalidad['updated_at']);
           
            // unset($mortalidad['updated_at']);

            $data = [
                'code' => 200,
                'status' => 'success',
                'mortalidad' => $mortalidad,
            ];
        } else {
            $data = [
                'code' => 200,
                'message' => 'Mortalidad No encontrada',
                'status' => 'error',
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {

        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array



        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'id_pedido' => 'required|numeric',
                'id_finca' => 'required|numeric',
                'temp_bandeja_superior' => 'required|numeric',
                'temp_bandeja_intermedia' => 'required|numeric',
                'temp_bandeja_inferior' => 'required|numeric',

                'hielo_bandeja_superior' => 'required|numeric',
                'hielo_bandeja_intermedia' => 'required|numeric',
                'hielo_bandeja_inferior' => 'required|numeric',
        
                "preguntas" => "required|array|min:1",
                "preguntas.*.tipo_pregunta" => "required|min:1",
                "preguntas.*.pregunta" => "required|min:1",
                'preguntas.*.respuesta' => 'required|min:1',
                'preguntas.*.observaciones' => 'required|min:1',


                "diario" => "required|array|min:1",
                "diario.*.dia" => "required|min:1",
                "diario.*.cantidad" => "required|min:1",

            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Mortalidad, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

   

                $mortalidad = new Mortalidad();
                $mortalidad->id_pedido = $params_array['id_pedido'];
                $mortalidad->id_finca = $params_array['id_finca'];
                $mortalidad->temp_bandeja_superior = $params_array['temp_bandeja_superior'];
                $mortalidad->temp_bandeja_intermedia = $params_array['temp_bandeja_intermedia'];
                $mortalidad->temp_bandeja_inferior = $params_array['temp_bandeja_inferior'];

                $mortalidad->hielo_bandeja_superior = $params_array['hielo_bandeja_superior'];
                $mortalidad->hielo_bandeja_intermedia = $params_array['hielo_bandeja_intermedia'];
                $mortalidad->hielo_bandeja_inferior = $params_array['hielo_bandeja_inferior'];
                //Guardar el Usuario
                $mortalidad->save();


                //guardamos las preguntas

                $preguntas = $params_array['preguntas'];

                foreach($preguntas as $pregunta){
               
                    $guardarPregunta = new MortalidadPreguntas();
                    $guardarPregunta->id_mortalidad = $mortalidad->id;
                    $guardarPregunta->tipo_pregunta = $pregunta['tipo_pregunta'];
                    $guardarPregunta->pregunta = $pregunta['pregunta'];
                    $guardarPregunta->respuesta = $pregunta['respuesta'];
                    $guardarPregunta->observaciones = $pregunta['observaciones'];
                    $guardarPregunta->save();

                }
                //guardamos los dias registrados
                $diario = $params_array['diario'];

                foreach($diario as $dia){
               
                    $guardarDiario = new MortalidadDiario();
                    $guardarDiario->id_mortalidad = $mortalidad->id;
                    $guardarDiario->tipo_pregunta = $dia['dia'];
                    $guardarDiario->pregunta = $dia['cantidad'];
                    $guardarDiario->save();

                }

                //devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
               
                );
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 200,
                'dato' => $params_array,
                'message' => 'Sin datos que procesar',
            );
        }
        // guardar los datos
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
}
