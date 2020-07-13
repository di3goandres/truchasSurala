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
                        'numero_factura' => 'required',
                        'numero_ovas' => 'required|integer',
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
                $despacho->numero_factura = $params_array['numero_factura'];
                $despacho->numero_ovas = $params_array['numero_ovas'];
                

                //Guardar el Usuario
                $despacho->save();
                //devolver array con resultado
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
}
