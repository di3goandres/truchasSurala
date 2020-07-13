<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Trazabilidad;
use App\TrazabilidadBandeja;
use App\Despacho;
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
                    
                    if (strcmp($lote['linea_genetica'],  $value['linea_genetica']) ==0)
                    {
                        $retornoAgrupado[$agrupadoPos]= $lote;
                        $agrupadoPos += 1;
                    }
                }
                $grupo[$agrupadoInicial]['name'] = $value['linea_genetica'];
                $grupo[$agrupadoInicial]['cajas'] = $retornoAgrupado;
                $agrupadoInicial+= 1;
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
        $pedido->genero_trazabilida = 1;
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

}
