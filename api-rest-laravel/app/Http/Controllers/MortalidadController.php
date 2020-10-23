<?php

namespace App\Http\Controllers;

use App\Mortalidad;
use App\MortalidadDiario;
use App\MortalidadPreguntas;
use App\Parametros;
use App\Pedidos;
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
                'temp_bandeja_superior' => 'required|numeric',
                'temp_bandeja_intermedia' => 'required|numeric',
                'temp_bandeja_inferior' => 'required|numeric',
                'hielo_bandeja_superior' => 'required',
                'hielo_bandeja_intermedia' => 'required',
                'hielo_bandeja_inferior' => 'required',

                'utilizo_transporte' => 'required',
                'demora_llegada' => 'required',
                'danio_cajas' => 'required',
                'cambioGranja' => 'required',
                'similar' => 'required',
                'distintas' => 'required',

                'temp_ovas_llegar' => 'required|numeric',
                'temp_agua_incubacion' => 'required|numeric',

                'metodo_aclimatacion' => 'required',
                'fuente_agua_incubacion' => 'required',
                'origen_agua_incubacion' => 'required',
                'uso_agua_incubacion' => 'required',
                'nivel_oxigeno' => 'required|numeric',
                'hora_aclimatacion' => 'required|numeric',
                'minutos_aclimatacion' => 'required|numeric',

                'llegada_ovas' => 'required',
                'llegada_ovas_finca' => 'required',
                'apertura_cajas' => 'required',
                'inicio_hidratacion' => 'required',
                'inicio_siembra' => 'required',
                'finalizacion_siembra' => 'required',
                'inicio_eclosion' => 'required',
                'fin_eclosion' => 'required',
                'fecha_inicioProblema' => 'required',
            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Mortalidad, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {


                $pedido = Pedidos::find($params_array['id_pedido']);
                if ($pedido) {

                    $existeMortalidad =  Mortalidad::where(
                        [
                            ['id_pedido', '=', $params_array['id_pedido']]
                        ]
                    )->get();
                    if (count($existeMortalidad) == 0) {

                        $mortalidad = new Mortalidad();
                        $mortalidad->id_pedido = $params_array['id_pedido'];
                        $mortalidad->id_finca = $pedido->id_finca;
                        $mortalidad->temp_bandeja_superior = $params_array['temp_bandeja_superior'];
                        $mortalidad->temp_bandeja_intermedia = $params_array['temp_bandeja_intermedia'];
                        $mortalidad->temp_bandeja_inferior = $params_array['temp_bandeja_inferior'];

                        $mortalidad->hielo_bandeja_superior = $params_array['hielo_bandeja_superior'];
                        $mortalidad->hielo_bandeja_intermedia = $params_array['hielo_bandeja_intermedia'];
                        $mortalidad->hielo_bandeja_inferior = $params_array['hielo_bandeja_inferior'];

                        $mortalidad->utilizo_transporte  = $params_array['utilizo_transporte'] == "true" ? 1 : 0;
                        $mortalidad->demora_llegada = $params_array['demora_llegada'] == "true" ? 1 : 0;
                        $mortalidad->danio_cajas = $params_array['danio_cajas'] == "true" ? 1 : 0;
                        $mortalidad->cambioGranja = $params_array['cambioGranja'] == "true" ? 1 : 0;
                        $mortalidad->similar = $params_array['similar'] == "true" ? 1 : 0;
                        $mortalidad->distintas = $params_array['distintas'] == "true" ? 1 : 0;

                        $mortalidad->temp_ovas_llegar = $params_array['temp_ovas_llegar'];
                        $mortalidad->temp_agua_incubacion = $params_array['temp_agua_incubacion'];

                        $mortalidad->metodo_aclimatacion = $params_array['metodo_aclimatacion'];
                        $mortalidad->fuente_agua_incubacion = $params_array['fuente_agua_incubacion'];
                        $mortalidad->origen_agua_incubacion = $params_array['origen_agua_incubacion'];
                        $mortalidad->uso_agua_incubacion = $params_array['uso_agua_incubacion'];
                        $mortalidad->nivel_oxigeno = $params_array['nivel_oxigeno'];
                        $mortalidad->hora_aclimatacion = $params_array['hora_aclimatacion'];
                        $mortalidad->minutos_aclimatacion = $params_array['minutos_aclimatacion'];

                        $mortalidad->llegada_ovas = str_replace('-00:00', '', $params_array['llegada_ovas']);
                        $mortalidad->llegada_ovas_finca = str_replace('-00:00', '', $params_array['llegada_ovas_finca']);
                        $mortalidad->apertura_cajas = str_replace('-00:00', '', $params_array['apertura_cajas']);
                        $mortalidad->inicio_hidratacion = str_replace('-00:00', '', $params_array['inicio_hidratacion']);
                        $mortalidad->inicio_siembra = str_replace('-00:00', '', $params_array['inicio_siembra']);
                        $mortalidad->finalizacion_siembra = str_replace('-00:00', '', $params_array['finalizacion_siembra']);
                        $mortalidad->inicio_eclosion = str_replace('-00:00', '', $params_array['inicio_eclosion']);
                        $mortalidad->fin_eclosion = str_replace('-00:00', '', $params_array['fin_eclosion']);
                        $mortalidad->fecha_inicioProblema = str_replace('-00:00', '', $params_array['fecha_inicioProblema']);
                        //Guardar el Usuario
                        $mortalidad->save();


                        $diasMortalidad =  Parametros::where(
                            [
                                ['tipo_parametro', '=', 'tiempo_mortalidad']
                            ]
                        )
                            ->select(
                                'parametros.valor'
                            )->get();

                        $numDias = $diasMortalidad[0]->valor;
                        for ($i = 1; $i <= $numDias; $i++) {
                            $guardarDiario = new MortalidadDiario();
                            $guardarDiario->id_mortalidad = $mortalidad->id;
                            $guardarDiario->dia = $i;
                            $guardarDiario->cantidad = 0;
                            $guardarDiario->save();
                        }

                        $data = array(
                            'code' => 200,
                            'status' => 'success',
                            'id' => $mortalidad->id

                        );
                    } else {
                        $data = array(
                            'code' => 400,
                            'status' => 'ya Registrado',

                        );
                    }

                    //devolver array con resultado

                } else {
                    $data = array(
                        'code' => 400,
                        'status' => 'No existe el pedido',

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


    public function obtenerDiarioDisponible($id)
    {

        $dias = \DB::select('select  DATEDIFF(DATE_ADD(NOW(), interval -5 HOUR),d.fecha_salida )dias, p.id id from pedidos p
                             left join despachos d on d.id = p.id_despacho 
                                left join mortalidad m on m.id_pedido = p.id
                                where m.id  = ?', array($id));
        if (count($dias) != 0) {
            $calculo = 0;
            if ($dias[0]->dias == 0) {
                $calculo = 1;
            } else {
                $calculo = $dias[0]->dias;
            }
            $mortalidadDiario = MortalidadDiario::where(
                [
                    ['id_mortalidad', '=', $id],
                    ['dia', '>=', 1],
                    ['dia', '<=', $calculo],
                ]
            )->get();

            $pedidos = \DB::select('call PedidoMortatalidad(?)', array($dias[0]->id));

            $columna = 0;
            $infoMortalidad = [];

            foreach ($mortalidadDiario as $mortalidad) {
                $infoMortalidad[$columna] = $mortalidad;
                if ($mortalidad->created_at != $mortalidad->updated_at) {
                    $infoMortalidad[$columna]['desactivar'] = true;
                } else {
                    $infoMortalidad[$columna]['desactivar'] = false;
                }
                $columna += 1;
            }
            $data = array(
                'status' => 'sucess',
                'code' => 200,

                'diario' => $infoMortalidad,
                'pedido' => $pedidos[0]
            );
        } else {
            $data = array(
                'status' => 'sin data',
                'code' => 400,
            );
        }

        return response()->json($data, $data['code']);
    }

    public function ActualizarDiario(Request $request)
    {

        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array
        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                "diario" => "required|array|min:1",
                "diario.*.dia" => "required|min:1",
                "diario.*.cantidad" => "required|min:1",
                "diario.*.id" => "required|min:1",


            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'No se ha actualizado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                $diario = $params_array['diario'];

                foreach ($diario as $dia) {

                    $update = MortalidadDiario::find($dia['id']);
                    if ($update->cantidad != $dia['cantidad']) {
                        $update->cantidad = $dia['cantidad'];
                        $update->save();
                    }
                }
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                );
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'dato' => $params_array,
                'message' => 'Sin datos que procesar',
            );
        }
        return response()->json($data, $data['code']);
    }
}
