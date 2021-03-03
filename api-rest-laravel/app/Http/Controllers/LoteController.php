<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Lotes;
use App\BandejasLotes;
use App\LoteNumero;

class LoteController extends Controller
{

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
        if (is_object($lotes)) {

            $bandejas = BandejasLotes::where('id_lote', $id)->get();

            $data = [
                'code' => 200,
                'status' => 'success',
                'cajas' => $lotes,
                'bandejas' => $bandejas
            ];
        } else {
            $data = [
                'code' => 200,
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


        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'id_despacho' => 'required',
                'fecha_desove' => 'required',
                'linea_genetica' => 'required',
                'tamanio' => 'required|regex:/^\d+(\.\d{1,9})?$/',
                'ovasml' => 'required|regex:/^\d+(\.\d{1,9})?$/',
                'total_lote' => 'required|numeric',
                'numero_cajas' => 'required|numeric',
                'edad' => 'required|numeric',
                'numero_lote' => 'required',
                'repetir' => 'numeric'
            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Lote, no se pudo crear',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                $modulo = $params_array['total_lote'] % $params_array['numero_cajas'];

                if ($modulo != 0) {
                    $data = array(
                        'code' => 200,
                        'status' => 'error',
                        'message' => 'validar el tamaño del lote, y el numero de cajas'
                    );
                } else {


                    $lotes =   Lotes::where('id_despacho', '=', $params_array['id_despacho'])->get();
                    $countLotes = count($lotes);

                    $existe = \DB::table('lote_numero')
                        ->where(
                            [
                                ['lote_numero.id_despacho', '=',  $params_array['id_despacho']],
                                ['lote_numero.fecha_desove', '=',  $params_array['fecha_desove']],
                                ['lote_numero.linea_genetica', '=', $params_array['linea_genetica']],
                                ['lote_numero.edad_tcu', '=',  $params_array['edad']],
                                ['lote_numero.tamanio', '=', $params_array['tamanio']],
                                ['lote_numero.total_lote', '=',  $params_array['total_lote']]

                            ]
                        )
                        ->select('lote_numero.id')
                        ->get();
                    $idLoteNumero = 0;
                    if (count($existe) == 0) {
                        $loteNumero = new LoteNumero();
                        $loteNumero->id_despacho = $params_array['id_despacho'];
                        $loteNumero->fecha_desove = $params_array['fecha_desove'];
                        $loteNumero->numero_lote = $params_array['numero_lote'];
                        $loteNumero->linea_genetica = $params_array['linea_genetica'];
                        $loteNumero->edad_tcu = $params_array['edad'];
                        $loteNumero->tamanio = $params_array['tamanio'];
                        $loteNumero->ovas_ml = $params_array['ovasml'];
                        $loteNumero->total_lote = 0;
                        $loteNumero->tamanio_usado_alevinos = 0;
                        $loteNumero->save();
                        $idLoteNumero = $loteNumero->id;
                    } else {
                        $idLoteNumero = $existe[0]->id;
                    }
                    for ($i = 1; $i <= $params_array['repetir']; $i++) {
                        $countLotes += 1;
                        $lote = new Lotes();
                        $lote->id_despacho = $params_array['id_despacho'];
                        $lote->fecha_desove = $params_array['fecha_desove'];
                        $lote->linea_genetica = $params_array['linea_genetica'];
                        $lote->tamanio = $params_array['tamanio'];
                        $lote->ovas_ml = $params_array['ovasml'];
                        $lote->total_lote = $params_array['total_lote'];
                        $lote->caja_numero = $countLotes;
                        $lote->numero_bandejas = $params_array['numero_cajas'];
                        $lote->edad_tcu = $params_array['edad'];
                        $lote->numero_lote = $params_array['numero_lote'];
                        $lote->id_lote_numero = $idLoteNumero;

                        $lote->tamanio_usado = 0;

                        //Guardar el Usuario
                        $lote->save();
                    }
                    // actualizar el tamanio del lote en la tabla lote numero
                    $this->ActualizarDatosLoteNumero($idLoteNumero);
                    //devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
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
    public function ActualizarDatosLoteNumero($id)
    {
        // actualizar el tamanio del lote en la tabla lote numero
        \DB::select('call 01_ActualizarLoteTamanio(?)', array($id));
    }
    public function BorrarLote($id)
    {
        $lote = Lotes::find($id);
        if (is_object($lote)) {
            $bandejas =  BandejasLotes::where(
                [
                    ['id_lote', '=', $lote->id]
                ]
            )->get();

            foreach ($bandejas as $borrar) {
                $borrar->delete();
            }
            $this->ActualizarDatosLoteNumero($lote->id_lote_numero);
            $lote->delete();

            $data = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'borrado exitosamente',
            );
        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Sin datos que procesar',
            );
        }

        // devolver el resutlado
        return response()->json($data, $data['code']);
    }
    public function prueba($id)
    {
        $lotes = Lotes::find($id);
        if (is_object($lotes)) {

            $bandejas = $lotes->bandejas;

            $data = [
                'code' => 200,
                'status' => 'success',
                'cajas' => $lotes,
                'bandejas' => $bandejas
            ];
        } else {
            $data = [
                'code' => 200,
                'status' => 'Lote No encontrado',
            ];
        }

        return response()->json($data, $data['code']);
    }
}
