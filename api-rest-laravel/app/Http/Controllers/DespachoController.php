<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Despacho;
use App\Lotes;


class DespachoController extends Controller
{
    
     public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        $despachos = Despacho::orderby('id', 'DESC')->get();

        return response()->json([
                    'code' => 200,
                    'status' => 'success',
                    'despachos' => $despachos
        ]);
    }

    public function show($id)
    {
        $despacho = Despacho::find($id);
        $lotes = Lotes::where('id_despacho', $id)->get();
        if (is_object($despacho ))
        {
            
            $data = ['code' => 200,
                'status' => 'success',
                'despacho' => $despacho,
                'cajas' => $lotes
                 ];
        }
        else
        {
            $data = ['code' => 200,
                'message' => 'Despacho No encontrada',
                'status' => 'error',
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
                        'fecha' => 'required',
                        'fechaSalida' => 'required',
                        'numero_factura' => 'required',
                        'numero_ovas' => 'required|integer',
                        'ovas_regalo' => 'required|integer',
                        'ovas_adicionales' => 'required|integer',
                        'ovas_reposicion' => 'required|integer',
                        'porcentaje' => 'required|numeric|between:0,99.99',

            ]);


            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Despacho, no se pudo crear',
                    'errors' => $validate->errors(),
                    'data' =>$params_array
                );
            }
            else
            {

                //quitar los campos que n quiero actualizar por si los llegan a envir
        
                unset($params_array["created_at"]);
                unset($params_array["updated_at"]);
         

                $despacho = new Despacho();
                $despacho->fecha= $params_array['fecha'];
                $despacho->fecha_salida= $params_array['fechaSalida'];
                $despacho->numero_factura = $params_array['numero_factura'];
                $despacho->numero_ovas = $params_array['numero_ovas'];
                $despacho->ovas_regalo = $params_array['ovas_regalo'];
                $despacho->ovas_adicionales = $params_array['ovas_adicionales'];
                $despacho->ovas_reposicion = $params_array['ovas_reposicion'];
                $despacho->porcentaje = $params_array['porcentaje'];
                $despacho->save();
                //devolver array con resultado

                Despacho::where('id', '<>', $despacho->id)
                      ->update(['Activo' => 0]);
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'despacho' => $despacho
                );
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

    public function actualizar(Request $request)
    {
        //recoger los datos por post 
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        // validar los datos

     
        if (!empty($params_array))
        {
            $validate = \Validator::make($params_array, [
                        'id' => 'required',
                        'fechaEntrada' => 'required',
                        'fechaEntrega' => 'required',
                        'numero_factura' => 'required',
                        'numero_ovas' => 'required|integer',
                        'ovas_regalo' => 'required|integer',
                        'ovas_adicionales' => 'required|integer',
                        'ovas_reposicion' => 'required|integer',
                        'porcentaje' => 'required|numeric|between:0,99.99',

            ]);


            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Despacho, no se pudo crear',
                    'errors' => $validate->errors(),
                    'data' =>$params_array
                );
            }
            else
            {

                //quitar los campos que n quiero actualizar por si los llegan a envir
        
                unset($params_array["created_at"]);
                unset($params_array["updated_at"]);
                $despacho = Despacho::find($params_array['id']);
                $despacho->fecha= $params_array['fechaEntrada'];
                $despacho->fecha_salida= $params_array['fechaEntrega'];
                $despacho->numero_factura = $params_array['numero_factura'];
                $despacho->numero_ovas = $params_array['numero_ovas'];
                $despacho->ovas_regalo = $params_array['ovas_regalo'];
                $despacho->ovas_adicionales = $params_array['ovas_adicionales'];
                $despacho->ovas_reposicion = $params_array['ovas_reposicion'];
                $despacho->porcentaje = $params_array['porcentaje'];
                $despacho->save();
              
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'despacho' => $despacho
                );
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

    public function getDespachoActual()
    {
        $despacho = Despacho::where('Activo', '=', 1)->get();
     
        if (is_object($despacho ))
        {
            
            $data = ['code' => 200,
                'status' => 'OK',
                'despacho' => $despacho,
                 ];
        }
        else
        {
            $data = ['code' => 200,
                'message' => 'Despacho No encontrada',
                'status' => 'error',
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function despachosByToken(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken)
        {
            // recoger los datos por post / get
            $user = $jwtAuth->checkToken($token, true);


         
            $despachos = \DB::table('despachos')
            ->join('pedidos', 'despachos.id', '=', 'pedidos.id_despacho')

            ->join('fincas', 'pedidos.id_finca', '=', 'fincas.id')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->where('users.id', '=',  $user->sub)
            ->select(
                'despachos.id', 
                'despachos.fecha_salida'
                )
            ->distinct('id')
            ->orderBy('fecha_salida', 'desc')
            ->get();
         
            $data = array(
                'code' => 200,
                'status' => 'success',
                'despachos' => $despachos
            );
        }
        else
        {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }
}
