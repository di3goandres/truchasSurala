<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Fincas;
use App\User;

class FincasController extends Controller {

    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        $fincas = Fincas::all();

        return response()->json([
                    'code' => 200,
                    'status' => 'success',
                    'fincas' => $fincas
        ]);
    }

    public function show($id)
    {
        $finca = Fincas::find($id);

        if (is_object($finca))
        {
            $data = ['code' => 200,
                'status' => 'success',
                'finca' => $finca];
        }
        else
        {
            $data = ['code' => 200,
                'message' => 'Finca No encontrada',
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
                        'nombre' => 'required',
                        'direccion' => 'required',
                        'temperatura' => 'integer',
                        'userid' => 'integer',
                        'altura' => 'integer',
                        'municipio' => 'required|numeric',
            ]);


            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Finca, no se ha creado',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            }
            else
            {

                //quitar los campos que n quiero actualizar por si los llegan a envir
                unset($params_array["id"]);
                unset($params_array["role"]);
                unset($params_array["password"]);
                unset($params_array["created_at"]);
                unset($params_array["updated_at"]);
                unset($params_array["email"]);

                $finca = new Fincas();
                $finca->nombre = $params_array['nombre'];
                $finca->user_id = $params_array['userid'];
                $finca->direccion = $params_array['direccion'];
                $finca->altura_nivel_mar = $params_array['altura'];
                $finca->id_municipio = $params_array['municipio'];
                $finca->temperatura_centigrados = $params_array['temperatura'];

                //Guardar el Usuario
                $finca->save();
                //devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'finca' => $finca
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

    public function getUserFincas()
    {
        $duenios = User:: where('role', '=', 'ROLE_USER')->get();
        $pos = 0;
        $retorno = [];
        $retorno[$pos]['numeroIdentificacion'] = '';

        $retorno[$pos]['nombre'] = strtoupper('Seleccione una Opcion');
        $retorno[$pos]['id'] = 0;
        foreach ($duenios as $value)
        {
            $pos += 1;

            $retorno[$pos]['numeroIdentificacion'] = $value->numero_identificacion;
            $retorno[$pos]['nombre'] = strtoupper($value->name . '  ' . $value->surname);
            $retorno[$pos]['id'] = $value->id;
        }



        return response()->json([
                    'code' => 200,
                    'status' => 'success',
                    'userFincas' => $retorno
        ]);
    }

    public function getFincasUser($id)
    {
        $duenios = Fincas:: where('user_id', '=', $id)->get();
        $pos = 0;
        $retorno = [];
        $retorno[$pos]['nombre'] = strtoupper('Seleccione una Opcion');
        $retorno[$pos]['id'] = 0;
        foreach ($duenios as $value)
        {
            $pos += 1;

            $retorno[$pos]['nombre'] = strtoupper($value->nombre);
            $retorno[$pos]['id'] = $value->id;
        }



        return response()->json([
                    'code' => 200,
                    'status' => 'success',
                    'userFincas' => $retorno
        ]);
    }

}
