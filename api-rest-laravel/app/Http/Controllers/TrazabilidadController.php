<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Trazabilidad;
use App\TrazabilidadBandeja;
use App\Despacho;
use App\BandejasLotes;
use App\Pedidos;
use App\Lotes;

class TrazabilidadController extends Controller {

//

    public function getTraza($id)
    {
        $traza = Trazabilidad::find($id);
        $bandejas = $traza->bandejas;

        $data = ['code' => 200,
            'status' => 'success',
            'trazabilidad' => $traza,
        ];

        return response()->json($data, $data['code']);
    }

    public function generarTrazaPorDespacho($id)
    {
//traigo el pedido
        $despacho = Despacho::find($id);


        if (is_object($despacho))
        {
            $retorno = [];
            //si trae pedidos los organiza de mayor a menor
            $pedidos = $despacho->pedidos;

            $totalPedidos = count($pedidos);


//            return $this->generarTrazaPorPedido(Pedidos::find(1));
//           die();
            foreach ($pedidos as $pedido)
            {
                $this->generarTrazaPorPedido($pedido);
            }


            $totalPedido['despacho'] = $despacho;

            // consulto mis pedidos
            $totalPedido['pedidos'] = $pedidos;

//            return response()->json([
//                        'code' => 200,
//                        'status' => 'success',
//                        'datos' => $totalPedido
//            ]);
        }
        else
        {
            return response()->json([
                        'code' => 200,
                        'status' => 'error',
                        'message' => ' No hay datos'
            ]);
        }
    }

    public function obtenerCajasBandejas($id)
    {
//traigo el pedido
        $despacho = Despacho::find($id);


        if (is_object($despacho))
        {
            $retorno = [];
            //si trae pedidos los organiza de mayor a menor


            $lineasGeneticas = Lotes::select('linea_genetica')->where('id_despacho', '=', $id)
                    ->groupBy('linea_genetica')
                    ->get();


            $lotes = $despacho->Lotes;  //Lotes::where('id_despacho', '=', $id)->whereRaw('ttotal')->get();


            $allBandejas = $this->getAllBandejas($lotes);

            $agrupadoPos = 0;
            $agrupadoInicial = 0;

            $retornoAgrupado = [];
            $grupo = [];

            foreach ($lineasGeneticas as $value)
            {
//                var_dump($value['linea_genetica']);
                foreach ($lotes as $lote)
                {
//                    var_dump( $value['linea_genetica'], strcmp($bandeja['lineaGenetica'],  $value['linea_genetica']));

                    if (strcmp($lote['linea_genetica'], $value['linea_genetica']) == 0)
                    {
                        $retornoAgrupado[$agrupadoPos] = $lote;
                        $retornoAgrupado[$agrupadoPos]['habilitado'] = true;

                        $agrupadoPos += 1;
                    }
                }
                $grupo[$agrupadoInicial]['name'] = $value['linea_genetica'];
                $grupo[$agrupadoInicial]['cajas'] = $retornoAgrupado;
                $agrupadoInicial += 1;
                $retornoAgrupado = [];
                $agrupadoPos = 0;
            }

            foreach ($lotes as $value)
            {
                unset($value['bandejas']);
                unset($value['created_at']);
                unset($value['updated_at']);
            }

            return response()->json([
                        'code' => 200,
                        'status' => 'success',
                        'grupocajas' => $grupo,
                        'bandejas' => $allBandejas,
//                        'agrupado' => $grupo
            ]);
        }
        else
        {
            return response()->json([
                        'code' => 200,
                        'status' => 'error',
                        'message' => ' No hay datos'
            ]);
        }
    }

    private function generarTrazaPorPedido($pedido)
    {

        $lotes = $pedido->lotes;
        $retorno = [];
        $continuar = True;
        $primeraVez = True;
// Variable que contiene el pedido total del cliente 
        $total = $pedido->total;
        $totalPendiente = $pedido->total;
        $traza = new Trazabilidad();
        $allBandejas = [];



        $allBandejas = $this->getAllBandejas($lotes);


//        return response()->json([
//                    'code' => 200,
//                    'status' => 'success',
//                    'trazabilidad' => $allBandejas
//        ]);
//        die();
////        
        $posicion = 0;
        foreach ($allBandejas as $value)
        {
            $trazabilidad[$posicion]['idLote'] = $value['bandejas']['id_lote'];
            $trazabilidad[$posicion]['idBandeja'] = $value['bandejas']['id'];
            $posicion = $posicion + 1;
        }

//                return response()->json([
//                    'code' => 200,
//                    'status' => 'success',
//                    'trazabilidad' => $trazabilidad
//        ]);
//        die();
    }

    private function getAllBandejas($lotes)
    {
        $allBandejas = [];
        $posicion = 0;
        foreach ($lotes as $lote)
        {


            $bandejasLote = $lote->bandejas;
            foreach ($bandejasLote as $value)
            {
                unset($value["created_at"]);
                unset($value["updated_at"]);
                $value['lineaGenetica'] = $lote->linea_genetica;
//                $allBandejas[$posicion]['bandejas']['idLote'] = $lote->id;
                $allBandejas[$posicion] = $value;
                $posicion = $posicion + 1;
            }
        }

        return $allBandejas;
    }

    /// generar Traza por Pedio
    private function generarTrazasLote($pedido, $lote, $primeraVez, $traza, $bandeja, $tamanio)
    {
        if ($primeraVez)
        {

            $traza = new Trazabilidad();
            $traza->id_finca = $pedido->id_finca;
            $traza->id_pedido = $pedido->id;

            $traza->id_lote = $lote->id;
            $traza->nombre_reclama = 'pendiente';

            $traza->ovas_adicionales = $pedido->adicional;
            $traza->ovas_facturadas = $pedido->pedido;
            $traza->ovas_reposicion = $pedido->reposicion;
            $traza->remision = 'Remision';
// se debe crear un consecutivo por medio de algun sp que consulte cual es siguiente

            $traza->total_ovas_enviadas = 0;

//Guardar el Usuario
            $traza->save();
        }


        $tbandeja = new TrazabilidadBandeja();
        $tbandeja->id_bandeja_lote = $bandeja->id;
        $tbandeja->id_trazabilidad = $traza->id;
        $tbandeja->cantidad = $tamanio; //$bandeja->tamanio_final;
        $tbandeja->save();
        $bandeja->tamanio_final = $bandeja->tamanio_final - $tamanio;
        $bandeja->save();

        $traza->total_ovas_enviadas = $traza->total_ovas_enviadas + $tamanio;
        $traza->save();

        $lote->tamanio_usado = $lote->tamanio_usado + $tamanio;
        $lote->save();
        $pedido->genero_trazabilidad = 1;
        $pedido->save();
        return $traza;
    }

    public function show($id)
    {
        $distribucion = Trazabilidad::where('id_pedido', '=', $id)->get();

        if (is_object($distribucion))
        {



            $data = ['code' => 200,
                'status' => 'success',
                'distribucion' => $distribucion,
            ];
        }
        else
        {
            $data = ['code' => 200,
                'message' => 'Sin',
                'status' => 'error',
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function index(Request $request)
    {
        
    }

    private function GuardarTraza($pedido)
    {
        $traza = new Trazabilidad();
        $traza->id_finca = $pedido->id_finca;
        $traza->id_pedido = $pedido->id;
        $traza->nombre_reclama = 'pendiente';
        $traza->remision = 'Remision';
        $traza->nombre_reclama = 'pendiente';
// se debe crear un consecutivo por medio de algun sp que consulte cual es siguiente o al momento de guardar
        $traza->total_ovas_enviadas = 0; //$params_array['total_ovas_enviadas'];
        $traza->save();


        return $traza->id;
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
                        "bandejas" => "required|array|min:1",
                        "bandejas.*.id_bandeja_lote" => "required|numeric|min:1",
                        "bandejas.*.cantidad" => "required|numeric|min:1",
                        'bandejas.*.id_lote' => 'required|numeric|min:1',
                        'id_pedido' => 'required|numeric',
                        'id_finca' => 'required|numeric',
                        'total_ovas_enviadas' => 'required|numeric',
            ]);
            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Traza, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            }
            else
            {

                $pedido = Pedidos::find($params_array['id_pedido']);
                if (!is_object($pedido))
                {
                    $data = array(
                        'code' => 200,
                        'status' => 'error'
                    );
                }
                else
                {
                    $bandejas = $params_array['bandejas'];
                    $conteo = 1;
                    $idTraza = 0;
                    $cantidadGuardada = 0;
                    $ids = '';
                    $maximoLote = Lotes::where('id_despacho', '=', $pedido->id_despacho)->max('total_lote');
                    foreach ($bandejas as $bandeja)
                    {

                        $cantidad = $bandeja['cantidad'];
                        $id = $bandeja['id_bandeja_lote'];
                        $cantidadGuardada = $cantidadGuardada + $cantidad;
////Guardar trazabilidad
                        if ($conteo == 1)
                        {

                            $idTraza = $this->GuardarTraza($pedido);
                            $conteo = 2;
//                            $ids = $ids . ',' . $idTraza;
                        }
                        else if ($cantidadGuardada > $maximoLote)
                        {
                            $cantidadGuardada = 0;
                            $cantidadGuardada = $cantidadGuardada + $cantidad;
//                         var_dump('cantidad Guardad: ' . $cantidadGuardada . ' Esto es el maximoLote: ' . $maximoLote);
                            $idTraza = $this->GuardarTraza($pedido);
//                            $ids = $ids . ',' . $idTraza;
                        }
                        $tbandeja = new TrazabilidadBandeja();
                        $tbandeja->id_bandeja_lote = $id;
                        $tbandeja->id_trazabilidad = $idTraza;
                        $tbandeja->cantidad = $cantidad;

                        $tbandeja->save();
                    }
                    $pedido->genero_trazabilidad = true;
                    $pedido->save();
                    //devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
           
                    );
                }
            }
        }
        else
        {
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
