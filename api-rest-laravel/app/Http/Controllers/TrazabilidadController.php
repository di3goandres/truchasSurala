<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Trazabilidad;
use App\TrazabilidadBandeja;
use App\Despacho;
use App\BandejasLotes;
use App\Pedidos;
use App\Lotes;
use App\Fincas;


class TrazabilidadController extends Controller
{

    public function getTraza($id)
    {
        $traza = Trazabilidad::find($id);
        $bandejas = $traza->bandejas;

        $data = [
            'code' => 200,
            'status' => 'success',
            'trazabilidad' => $traza,
        ];

        return response()->json($data, $data['code']);
    }

    public function generarTrazaPorDespacho($id)
    {
        //traigo el pedido
        $despacho = Despacho::find($id);


        if (is_object($despacho)) {
            $retorno = [];
            //si trae pedidos los organiza de mayor a menor
            $pedidos = $despacho->pedidos;

            $totalPedidos = count($pedidos);


            //            return $this->generarTrazaPorPedido(Pedidos::find(1));
            //           die();
            foreach ($pedidos as $pedido) {
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
        } else {
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


        if (is_object($despacho)) {
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

            foreach ($lineasGeneticas as $value) {
                //                var_dump($value['linea_genetica']);
                foreach ($lotes as $lote) {
                    //                    var_dump( $value['linea_genetica'], strcmp($bandeja['lineaGenetica'],  $value['linea_genetica']));

                    if (strcmp($lote['linea_genetica'], $value['linea_genetica']) == 0) {
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

            foreach ($lotes as $value) {
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
        } else {
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
        foreach ($allBandejas as $value) {
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
        foreach ($lotes as $lote) {


            $bandejasLote = $lote->bandejas;
            foreach ($bandejasLote as $value) {
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
        if ($primeraVez) {


            /// CONSEGUIR EL CONSECUTIVO REMISION

            /*
                BEGIN

                    declare REMISION varchar(500);

                    update parametros
                    set valor = CONVERT(valor, integer) + 1
                    WHERE  tipo_parametro = 'remision';

                    SELECT  VALOR INTO REMISION FROM parametros WHERE 
                    tipo_parametro = 'remision' ;



                    update trazabilidad
                    set remision = REMISION + DATE_FORMAT(NOW(), '%y')
                    where id = new.id;

                END
                             *              */

            $remision = \DB::select('call ObtenerRemision()');



            $traza = new Trazabilidad();
            $traza->id_finca = $pedido->id_finca;
            $traza->id_pedido = $pedido->id;

            $traza->id_lote = $lote->id;
            $traza->nombre_reclama = 'pendiente';

            $traza->ovas_adicionales = $pedido->adicional;
            $traza->ovas_facturadas = $pedido->pedido;
            $traza->ovas_reposicion = $pedido->reposicion;
            $traza->remision = $remision[0]->valor;
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

        $tnum = 0;
        $bandejas = 0;
        $inicial = 0;

        $bagrupada = [];
        $infoDespacho = [];

        $contacto = [];

        $Trazabilidad = [];
        $distribuciones = \DB::select('call verTrazabilidadPedido(?)', array($id));

        //        var_dump($distribuciones);
        // con este valor se arman las bandejas
        if (is_array($distribuciones) && count($distribuciones) > 0) {
            $pedido = Pedidos::find($id);

            //            $Trazabilidades = Trazabilidad::find($id);
            $Trazabilidades = Trazabilidad::where('id_pedido', '=', $id)->get();

            foreach ($Trazabilidades as $trazabilidad) {
                $tnum = 0;
                $cajas = \DB::select('call ObtenerCajas(?)', array($trazabilidad->id));
                foreach ($cajas as $caja) {
                    $infoDespacho[$bandejas]['Cantidad'] = $caja->cantidad;
                    $infoDespacho[$bandejas]['caja_numero'] = $caja->caja_numero;
                    $infoDespacho[$bandejas]['bandeja_numero'] = $caja->numero_bandeja;
                    $bandejas += 1;
                }
                $bandejas = 0;
                $contacto['Remision'] = $trazabilidad->remision;

                foreach ($distribuciones as $distribucion) {
                    if ($tnum === 0) {
                        $maximoLote = \DB::select('select max(bl.tamanio_inicial)  maximo from despachos d
                                                    left join lotes l on l.id_despacho = d.id
                                                    left join bandeja_lote bl on bl.id_lote = l.id
                                                    where d.id = ?', array($distribucion->id_despacho))[0];

                        $contacto['FechaEntrega'] = $distribucion->fecha; // del pedido mas un dia
                        $contacto['Cliente'] = $distribucion->name . ' ' . $distribucion->surname; // del dueño de la finca tabela usuarios
                        $contacto['Destino'] = $distribucion->id_municipio; // ubicacion de la finca/ Municipio departamento
                        $contacto['Finca'] = $distribucion->nombre;
                        // ubicacion de la finca/ Municipio departamento  
                        $contacto['Facturado'] = $distribucion->Facturadas;
                        $contacto['Adicionales'] = $distribucion->Adicionales;
                        $contacto['Reposicion'] = $distribucion->Repo;
                        $contacto['Total'] = $distribucion->TotalPedido;
                        $contacto['Total_enviado'] = $trazabilidad->total_ovas_enviadas;
                        $contacto['Maximo'] = $maximoLote->maximo;


                        // ubicacion de la finca/ Municipio departamento  
                    }

                    if ($distribucion->idtrazabilidad == $trazabilidad->id && $tnum === 0) {
                        $lotes = \DB::select('call verLoteTrazabilidad(?)', array($trazabilidad->id));
                        foreach ($lotes as $lote) {
                            $bagrupada[$tnum]['NumLote'] = $lote->numero_lote;
                            $bagrupada[$tnum]['Fechadesove'] = $lote->fecha_desove;
                            $bagrupada[$tnum]['LineaGenetica'] = $lote->linea_genetica;
                            $bagrupada[$tnum]['edad'] = $lote->edad_tcu;
                            $bagrupada[$tnum]['tamanio'] = $lote->tamanio;
                            $bagrupada[$tnum]['ovas_ml'] = $lote->ovas_ml;
                         
                        }
                    }
                    $tnum += 1;
                }
                $Trazabilidad[$inicial]['contacto'] = $contacto;
                $Trazabilidad[$inicial]['trazabilidad'] = $bagrupada;
                $Trazabilidad[$inicial]['InfoDespacho'] = $infoDespacho;

                $contacto = [];
                $infoDespacho = [];

                $inicial += 1;
                $tnum = $tnum - $tnum;
            }
            //         
            $data = [
                'code' => 200,
                'status' => 'success',
                'distribucion' => $Trazabilidad,
            ];
        } else {
            $data = [
                'code' => 200,
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
        $propia = Fincas::find($pedido->id_finca);
        if ($propia->propia) {
            $remision = \DB::select('call ObtenerRemisionPropio()');
        } else {
            $remision = \DB::select('call ObtenerRemision()');
        }

        $traza = new Trazabilidad();
        $traza->id_finca = $pedido->id_finca;
        $traza->id_pedido = $pedido->id;
        $traza->nombre_reclama = 'pendiente';
        $traza->remision = $remision[0]->valor;
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



        if (!empty($params_array)) {


            $validate = \Validator::make($params_array, [
                "bandejas" => "required|array|min:1",
                "bandejas.*.id_bandeja_lote" => "required|numeric|min:1",
                "bandejas.*.cantidad" => "required|numeric|min:1",
                'bandejas.*.id_lote' => 'required|numeric|min:1',
                'id_pedido' => 'required|numeric',
                'id_finca' => 'required|numeric',
                'total_ovas_enviadas' => 'required|numeric',
                'por_maximo' => 'required', // campo para validar si es por maximo
                'numero_bandejas_por_trazabilidad' => 'required|numeric'
                // si viene maximo en false debe venir este minimo 5 maximo 7 bandejas

            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Traza, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                $pedido = Pedidos::find($params_array['id_pedido']);
                if (!is_object($pedido)) {
                    $data = array(
                        'code' => 200,
                        'status' => 'error'
                    );
                } else {
                    $bandejas = $params_array['bandejas'];
                    $conteo = 0;
                    $idTraza = 0;
                    $cantidadGuardada = 0;

                    $porMaximo =  $params_array['por_maximo'];
                    $porNumero =  $params_array['numero_bandejas_por_trazabilidad'];


                    $maximoLote = Lotes::where('id_despacho', '=', $pedido->id_despacho)->max('total_lote');

                    $propia = Fincas::find($pedido->id_finca);


                    /* 
                        Organizar las bandejas por # de lote y cantidad, dejando
                        las de menor cantidad al final */

                    /*
                     una trazabilidad tienen maximo 5 bandejas al maximo si
                     es un cliente normal y si es un cliente como pesca se envia como
                     llega la caja con el maximo del lote.
                    las organiza por cantidad
 
                    */
                    $bandejas = collect($bandejas)->sortBy('cantidad')->reverse()->toArray();

                    $uniqueIDs = array();
                    foreach ($bandejas as $bandeja) {
                        if (!in_array($bandeja['id_lote'], $uniqueIDs)) {
                            $uniqueIDs[] = $bandeja['id_lote'];
                        }
                    }

                    $conteoPorbandeja = [];
                    $posicionBandeja = 0;
                    $cantidaBandeja = 0;
                    foreach ($uniqueIDs as $id) {
                        foreach ($bandejas as $bandeja) {
                            if ($id === $bandeja['id_lote']) {
                                $cantidaBandeja += 1;
                            }
                        }
                        $conteoPorbandeja[$posicionBandeja]['id'] = $id;
                        $conteoPorbandeja[$posicionBandeja]['conteo'] = $cantidaBandeja;
                        $cantidaBandeja = 0;
                        $posicionBandeja += 1;
                    }
                    $posicionBandeja = 0;

                    $bandejasOrganizadas = [];
                    $conteoPorbandeja = collect($conteoPorbandeja)->sortBy('conteo')->reverse()->toArray();

                    foreach ($conteoPorbandeja as $conteo) {
                        foreach ($bandejas as $bandeja) {
                            if ($conteo['id'] === $bandeja['id_lote']) {
                                $bandejasOrganizadas[] =  $bandeja;
                                $posicionBandeja += 1;
                            }
                        }
                    }

                    // foreach($bandejasOrganizadas as $bandeja){
                    //     var_dump($bandeja['cantidad'], $bandeja['id_bandeja_lote']);
                    // }
                    // foreach($bandejas as $bandeja){
                    //     var_dump( $bandeja['cantidad'], $bandeja['id_bandeja_lote']);
                    // }
                    // die();


                    // $cantidadBandejas = count($bandejas);
                    // $noContar = false;
                    // foreach ($bandejas as $bandeja) {
                    $conteo = 0;    
                    foreach ($conteoPorbandeja as $bandeja) {

                        $cantidad = 0;
                        $cantidad = $bandeja['cantidad'];
                       
                        $id = $bandeja['id_bandeja_lote'];
                       
                        $cantidadGuardada = $cantidadGuardada + $cantidad;
                        ////Guardar trazabilidad
                        if ($conteo == 0) {
                            $idTraza = $this->GuardarTraza($pedido);
                        } else if ($propia->propia) {
                            /** si la finca es propia, se va al maximo de lo que venga */
                            if ($cantidadGuardada > $maximoLote) {
                                $cantidadGuardada = 0;
                                $cantidadGuardada = $cantidadGuardada + $cantidad;
                                $idTraza = $this->GuardarTraza($pedido);
                            }
                        } else {
                            /** de lo contrario si la finca no es propia se debe ir a maximo 5 bandejas
                             * se debe agregar bandejas siempre y cuando no sumen el valor de la bandeja.
                             * y no pase de 5 bandejas.
                             */
                            if ($porMaximo) {
                                if ($cantidadGuardada > $maximoLote) {
                                    $cantidadGuardada = 0;
                                    $cantidadGuardada = $cantidadGuardada + $cantidad;
                                    $idTraza = $this->GuardarTraza($pedido);
                                }
                            } else  if ($conteo %  $porNumero === 0) {
                                $cantidadGuardada = 0;
                                $cantidadGuardada = $cantidadGuardada + $cantidad;
                                $idTraza = $this->GuardarTraza($pedido);
                            }
                        }
                        $conteo = $conteo  + 1;
                      
                        $tbandeja = new TrazabilidadBandeja();
                        $tbandeja->id_bandeja_lote = $id;
                        $tbandeja->id_trazabilidad = $idTraza;
                        $tbandeja->cantidad = $cantidad;
                        $tbandeja->save();
                    }
                    $pedido->genero_trazabilidad = true;
                    $pedido->save();

                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                    );
                }
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



    //recibimos el id del despacho
    public function showAll($idDespacho)
    {

        $tnum = 0;
        $bandejas = 0;
        $inicial = 0;

        $bagrupada = [];
        $infoDespacho = [];

        $contacto = [];

        $Trazabilidad = [];
        $distribuciones = \DB::select('call verTrazabilidadDespacho(?)', array($idDespacho));
        $trazabilidades = \DB::select('call obtenerTrazabilidadDespacho(?)', array($idDespacho));


        //        var_dump($distribuciones);
        // con este valor se arman las bandejas
        if (is_array($distribuciones) && count($distribuciones) > 0) {





            foreach ($trazabilidades as $trazabilidad) {
                $bandejas = 0;
                foreach ($distribuciones as $distribucion) {
                    if ($trazabilidad->idtrazabilidad === $distribucion->idtrazabilidad) {



                        $infoDespacho[$bandejas]['Cantidad'] = $distribucion->cantidad;
                        $infoDespacho[$bandejas]['caja_numero'] = $distribucion->caja_numero;
                        $infoDespacho[$bandejas]['bandeja_numero'] = $distribucion->numero_bandeja;
                        $infoDespacho[$bandejas]['ovas_ml'] = $distribucion->ovas_ml;

                        if ($bandejas === 0) {
                            $bagrupada[$bandejas]['NumLote'] = $distribucion->numero_lote;
                            $bagrupada[$bandejas]['Fechadesove'] = $distribucion->fecha_desove;
                            $bagrupada[$bandejas]['LineaGenetica'] = $distribucion->linea_genetica;
                            $bagrupada[$bandejas]['edad'] = $distribucion->edad_tcu;
                            $bagrupada[$bandejas]['tamanio'] = $distribucion->tamanio;
                            $bagrupada[$bandejas]['ovas_ml'] = $distribucion->ovas_ml;
                            $contacto['FechaEntrega'] = $distribucion->fecha; // del pedido mas un dia
                            $contacto['Cliente'] = $distribucion->name . ' ' . $distribucion->surname;
                            // del dueño de la finca tabela usuarios
                            $contacto['Destino'] = $distribucion->id_municipio; // ubicacion de la finca/ Municipio departamento
                            $contacto['Finca'] = $distribucion->nombre;
                            // ubicacion de la finca/ Municipio departamento  
                            $contacto['Facturado'] = $distribucion->Facturadas;
                            $contacto['Adicionales'] = $distribucion->Adicionales;
                            $contacto['Reposicion'] = $distribucion->Repo;
                            $contacto['Total'] = $distribucion->TotalPedido;
                            $contacto['Total_enviado'] = $distribucion->total_ovas_enviadas;
                            $contacto['Maximo'] = 0;
                        }
                        $bandejas += 1;
                    }
                }
                $Trazabilidad[$inicial]['contacto'] = $contacto;
                $Trazabilidad[$inicial]['trazabilidad'] = $bagrupada;
                $Trazabilidad[$inicial]['InfoDespacho'] = $infoDespacho;
                $bandejas = 0;
                $contacto = [];
                $infoDespacho = [];
                $bagrupada = [];
                $inicial += 1;
            }

            $data = [
                'code' => 200,
                'status' => 'success',
                'distribucion' => $Trazabilidad,
            ];
        } else {
            $data = [
                'code' => 200,
                'message' => 'Sin',
                'status' => 'error',
            ];
        }

        return response()->json($data, $data['code']);
    }
}
