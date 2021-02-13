<?php

namespace App\Http\Controllers;

use App\AlevinosDespacho;
use Illuminate\Http\Request;

class AlevinosDespachoController extends Controller
{
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

        $json = $request->input('json', null);
        $params_array = json_decode($json, true); // array

        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [

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
                $programacion = \DB::table('alevinos_dia_despacho')
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
            $retorno[$id]['estado'] = $despacho->despachado == true? "DESPACHADO": "SIN DESPACHAR";
            $id = $id + 1;
        }
        return response()->json([
            'code' => 200,
            'status' => 'success',
            'programacion' => $retorno
        ]);
    }
}
