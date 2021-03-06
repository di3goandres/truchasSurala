<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Pedidos;
use App\Fincas;
use App\Lotes;
use App\Trazabilidad;
use App\TrazabilidadBandeja;
use App\BandejasLotes;
use App\Despacho;

class PedidosController extends Controller
{

    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        $pedidos = Pedidos::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'pedidos' => $pedidos
        ]);
    }

    public function show($id)
    {



        $pedidos = Pedidos::where('id_despacho', '=', $id)->orderBy('total', 'DESC')->get();

        $despacho = Despacho::where('Activo', '=', 1)->get();






        if (is_object($pedidos) && is_object($despacho)) {
            $retorno = [];
            $id = 0;
            foreach ($despacho as $des) {
                $totalpedidos = Pedidos::where('id_despacho', '=', $des->id)->get()->sum('total');
                $totaldespacho = Lotes::where('id_despacho', '=', $des->id)->get()->sum('total_lote');
                $totaldespachoUsado = Lotes::where('id_despacho', '=', $des->id)->get()->sum('tamanio_usado');
            }

            foreach ($pedidos as $pedido) {
                $retorno[$id] = ($pedido);
                $retorno[$id]['nombre'] = $pedido->finca->departamento . '/' . $pedido->finca->nombre;
                $retorno[$id]['usuario'] = $pedido->finca->user->name . ' ' . $pedido->finca->user->surname;

                // $retorno[$id]['despacho'] = $pedido->despacho;

                unset($retorno[$id]['finca']);
                $id = $id + 1;
            }



            $data = [
                'code' => 200,
                'status' => 'success',
                'pedido' => $retorno,
                'despacho' => $despacho,
                'totalPedidos' => $totalpedidos,
                'total' => $totaldespacho,
                'totalUsado' => $totaldespachoUsado,
            ];
        } else {
            $data = [
                'code' => 200,
                'message' => 'Pedido No encontrado',
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
                'id_despacho' => 'required|numeric',
                'id_finca' => 'required|numeric',
                'pedido' => 'required|numeric',
                'porcentaje' => 'required|numeric',
                'reposicion' => 'required|numeric',
                'adicional' => 'required|numeric',
                'total' => 'required|numeric',
            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Pedido, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                //quitar los campos que n quiero actualizar por si los llegan a envir
                unset($params_array["id"]);
                unset($params_array["created_at"]);
                unset($params_array["updated_at"]);


                $pedido = new Pedidos();
                $pedido->id_despacho = $params_array['id_despacho'];
                $pedido->id_finca = $params_array['id_finca'];
                $pedido->pedido = $params_array['pedido'];
                $pedido->porcentaje = $params_array['porcentaje'];
                $pedido->reposicion = $params_array['reposicion'];

                $pedido->adicional = $params_array['adicional'];
                $pedido->total = $params_array['total'];

                //Guardar el Usuario
                $pedido->save();
                //devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'finca' => $pedido
                );
                $this->ActualizarDatosLoteNumero($params_array['id_despacho']);

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

    /*
     * Se recibe las bandejas y el pedido pendiente por completar
     * se debe verificar y asingar el la bandeja // se pasa el id del pedido
     * para este proceso automatico
     */

    public function getTraza($id)
    {
        //traigo el pedido
        $pedido = Pedidos::find($id);
        $lotes = $pedido->lotes;
        $retorno = [];
        // Variable con la que continua con el siguiente
        $continuar = True;
        $primeraVez = True;

        $lugar = 0;
        foreach ($lotes as $lote) {
            $retorno[$lugar]['caja'] = $lote;
            $retorno[$lugar]['bandeja'] = $lote->bandejas;
            $lugar = $lugar + 1;
        }

        // Variable que contiene el pedido total del cliente 
        $total = $pedido->total;
        $totalPendiente = $pedido->total;
        $traza = new Trazabilidad();

        //        return response()->json([
        //                    'code' => 200,
        //                    'status' => 'success',
        //                    'trazabilidad' => $retorno
        //        ]);
        //        die();
        foreach ($lotes as $lote) {

            $primeraVez = True;

            $bandejasLote = $lote->bandejas;
            $posicion = 0;
            $sum = 0;
            //            foreach ($bandejasLote as $bandeja)
            //            {
            //                $sum = $sum + $bandeja->tamanio_final;
            //            }
            //            $sum = array_sum($bandejasLote->tamanio_final);
            //            var_dump($sum);
            //            die();

            foreach ($bandejasLote as $bandeja) {
                //                if($totalPendiente > $lote->tamanio_usado){
                //                    continue 2;
                //                }
                $retorno[$posicion]['bandejas'] = $bandeja;

                if (!$continuar) {
                    break;
                }
                if (($bandeja->tamanio_inicial != $bandeja->tamanio_final)) {
                    break; // continua con el siguiente lote
                }

                $totalPendiente = $totalPendiente - $bandeja->tamanio_final; {


                    if ($totalPendiente < 0) {
                        $totalPendiente = $totalPendiente + $bandeja->tamanio_final;
                        $trazabilidad[$posicion]['idLote'] = $lote->id;
                        $trazabilidad[$posicion]['idBandeja'] = $bandeja->id;
                        $trazabilidad[$posicion]['TotalOvas'] = $totalPendiente;

                        $trazabilidad[$posicion]['QuedanEnBandeja'] = $bandeja->tamanio_inicial - $totalPendiente;
                        $trazabilidad[$posicion]['finca'] = $pedido->id_finca;



                        $traza = $this->generarTrazasLote($pedido, $lote, $primeraVez, $traza, $bandeja, $totalPendiente);
                        $primeraVez = False;


                        $continuar = False;
                        break;
                    } else if ($totalPendiente >= 0) {
                        $traza = $this->generarTrazasLote($pedido, $lote, $primeraVez, $traza, $bandeja, $bandeja->tamanio_final);
                        $primeraVez = false;
                        // crear una trazabilidad 
                        $trazabilidad[$posicion]['idLote'] = $lote->id;
                        $trazabilidad[$posicion]['idBandeja'] = $bandeja->id;
                        $trazabilidad[$posicion]['TotalOvas'] = $bandeja->tamanio_inicial;
                        $trazabilidad[$posicion]['pendiente'] = $totalPendiente;
                        $trazabilidad[$posicion]['finca'] = $pedido->id_finca;
                        $posicion = $posicion + 1;
                    }
                }
            }
        }


        $totalPedido['traza'] = $trazabilidad;

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'trazabilidad' => $totalPedido
        ]);
    }

    ///
    private function generarTrazasLote($pedido, $lote, $primeraVez, $traza, $bandeja, $tamanio)
    {
        if ($primeraVez) {

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


    public function getPedido($id)
    {
        $pedidos = Pedidos::find($id);

        if (is_object($pedidos)) {
            $finca = $pedidos->finca;
            $usuario = $finca->user;
            $nombre = $usuario->name . ' ' . $usuario->surname;
            $fincaNombre = $finca->departamento . '/' . $finca->municipio . ', ' . $finca->nombre;
            unset($pedidos['usuarios']);
            unset($pedidos['finca']);


            $pedidos['finca'] = $fincaNombre;
            $pedidos['usuario'] = $nombre;

            $data = [
                'code' => 200,
                'status' => 'success',
                'pedido' => $pedidos,
            ];
        } else {
            $data = [
                'code' => 200,
                'message' => 'Pedido No encontrado',
                'status' => 'error',
            ];
        }

        return response()->json($data, $data['code']);
    }


    public function ActualizarPedido(Request $request)
    {
        //recoger los datos por post 
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        // validar los datos


        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'id' => 'required|numeric',
                'pedido' => 'required|numeric',
                'porcentaje' => 'required|numeric',
                'reposicion' => 'required|numeric',
                'adicional' => 'required|numeric',
                'total' => 'required|numeric',
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

                unset($params_array["created_at"]);
                unset($params_array["updated_at"]);

                $pedido = Pedidos::find($params_array['id']);
                $pedido->pedido = $params_array['pedido'];
                $pedido->porcentaje = $params_array['porcentaje'];
                $pedido->reposicion = $params_array['reposicion'];
                $pedido->adicional = $params_array['adicional'];
                $pedido->total = $params_array['total'];
                $pedido->save();
                $this->ActualizarDatosLoteNumero($pedido->id_despacho);

                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'finca' => $pedido
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

    public function EliminarPedido($id, $borrar)
    {
      

        //Buscar el pedido
        $pedido = Pedidos::find($id);

        if (is_object($pedido)) {


            //Buscar si el despacho se encuentra activo de lo contrario no borrar nada
            //Buscar las trazabilidades que tenga el pedido

            $trazabilidades = Trazabilidad::where('id_pedido', '=', $pedido->id)->get();

            if (is_object($trazabilidades)) {


                foreach ($trazabilidades as $trazabilidad) {
                    //Buscar trazabilidades bandeja

                    $bandejaTrazas = TrazabilidadBandeja::where('id_trazabilidad', '=', $trazabilidad->id)->get();
                    if (is_object($bandejaTrazas)) {
                        foreach ($bandejaTrazas as $bandeja) {
                            //por cada trazabiliadad devolver lo que tenia a las bandejas

                            $bandejaLote = BandejasLotes::where('id', '=', $bandeja->id_bandeja_lote)->get();

                            if (is_object($bandejaLote)) {
                                foreach ($bandejaLote as $unicaBandeja) {
                                    $unicaBandeja->tamanio_final = $unicaBandeja->tamanio_final  + $bandeja->cantidad;
                                    $unicaBandeja->save();
                                    $lote = Lotes::find($unicaBandeja->id_lote);
                                    $lote->tamanio_usado = $lote->tamanio_usado - $bandeja->cantidad;
                                    $lote->save();
                                }

                                // borrar trazabilidad bandeja
                            }
                            $bandeja->delete();
                        }
                    }
                    // borrar trazabilidad

                    $trazabilidad->delete();
                }
            }
            $pedido->genero_trazabilidad = 0;
            $pedido->save();
            //borrar el pedido ya que no tiene trazabilidades
            $this->ActualizarDatosLoteNumero($pedido->id_despacho);
            if ($borrar == "true") {

                $pedido->delete();
                $data = array(
                    'code' => 200,
                    'status' => 'OK',
                    'message' => 'BORRADO  PEDIDO EXITOSO',

                );
            } else {
                $data = array(
                    'status' => 'OK',
                    'code' => 200,
                    'message' => 'BORRADO DE TRAZABILIDAD EXITOSO',

                );
            }







            // borrar pedido

        } else {
            $data = array(
                'status' => 'error',
                'code' => 200,
                'message' => 'Sin datos que procesar',
            );
        }
        //     }
        // } else {
        //     $data = array(
        //         'status' => 'error',
        //         'code' => 200,
        //         'dato' => $params_array,
        //         'message' => 'Sin datos que procesar',
        //     );
        // }
        // guardar los datos
        // devolver el resutlado
        return response()->json($data, $data['code']);
    }


    public function ActualizarDatosLoteNumero($id){
        // actualizar el tamanio del lote en la tabla lote numero
        \DB::select('call 02_ActualizarPropios(?)', array($id));
    }

    public function pedidosByToken(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken) {
            // recoger los datos por post / get
            $user = $jwtAuth->checkToken($token, true);

            // var_dump($params->id);
            // die();

            $pedidos = \DB::select('call PedidosUsuario(?, ?)', array($user->sub, $params_array['id']));




            $data = array(
                'code' => 200,
                'status' => 'success',
                'pedidos' => $pedidos
            );
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function EstadisticaByToken(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken) {
            // recoger los datos por post / get
            $user = $jwtAuth->checkToken($token, true);

            $estadistica = \DB::select('call EstadisticaByUser(?)', array($user->sub));



            $data = array(
                'code' => 200,
                'status' => 'success',
                'datos' => $estadistica
            );
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }



    public function pedidosMortalidad($id)
    {

        $pedidos = \DB::select('call PedidoMortatalidad(?)', array($id));

        $data = array(
            'code' => 200,
            'status' => 'success',
            'pedidos' => $pedidos
        );

        return response()->json($data, $data['code']);
    }

    public function pedidosByTokenMortalidad(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);

        if ($checktoken) {
       
            $user = $jwtAuth->checkToken($token, true);
            $pedidos = \DB::select('call PedidosUsuarioMortalidad(?)', array($user->sub));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'pedidos' => $pedidos
            );
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function pedidosByTokenMortalidadRegistrada(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);

        if ($checktoken) {
       
            $user = $jwtAuth->checkToken($token, true);
            $useriud = $user->sub;
            // $useriud = 58;
            $pedidos = \DB::select('call 06_MortalidadReportada(?)', array($useriud));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'Reportados' => $pedidos
            );
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }
}
