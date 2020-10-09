<?php

namespace App\Http\Controllers;

use App\Fincas;
use App\InformesTecnicos;
use App\User;
use Illuminate\Http\Request;

class InformesTecnicosController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function index()
    {
        $data = InformesTecnicos::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'Informes' => $data
        ]);
    }

    public function show($id)
    {
        $data = InformesTecnicos::find($id);
        if (is_object($data)) {

            t();

            $data = [
                'code' => 200,
                'status' => 'success',
                'informe' => $data,

            ];
        } else {
            $data = [
                'code' => 200,
                'status' => 'sin datos',
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
                'cedula' => 'required',
                'finca_id' => 'required',
                'fecha' => 'required',
                'observaciones' => 'required',
                "informes" => "required|array|min:1",
                "informes.*.tipo" => "required|numeric|min:1",
                "informes.*.file" => "required|min:1",
            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Informe, no se pudo crear',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {
            
                $usuario = \DB::table('users')
                 
                    ->where('users.numero_identificacion', '=',  intval($params_array['cedula']))
                    ->select('users.id', 'users.numero_identificacion')
                    ->get();
                $finca = Fincas::find($params_array['finca_id']);

                if (is_object($usuario) &&  is_object($finca)) {

                    $fecha = str_replace('T05:00:00.000Z', ' 00:00:00', $params_array['fecha']);
                    
                    $fechaUbicacions = str_replace(' 00:00:00', '', $fecha);

                   

                    $data =  new InformesTecnicos();
                    $data->user_id = $usuario[0]->id;

                    $data->finca_id = $params_array['finca_id'];
                    $data->fecha_visita = $fecha;
                    $data->observaciones = $params_array['observaciones'];

                    $archivos = $params_array['informes'];
                   

                    foreach ($archivos as $archivo) {

                        $file = $archivo['file'];
                        $id = $archivo['tipo'];
                        $file = str_replace('data:application/pdf;base64,', '', $file);
                        $file = str_replace(' ', '+', $file);
                        switch ($id) {
                            case 1:
                                $name = time() . "_InformeTecnico.pdf";
                                $data->InformeTecnico = $name;

                                break;
                            case 2:
                                $name = time() . "_LaboratorioPSR.pdf";
                                $data->archivo_psr = $name;
                                break;
                            case 3:
                                $name = time() . "_Histopatologia.pdf";
                                $data->histopatologia = $name;
                                break;
                        }
                      
                        \Storage::disk('users')
                            ->put($usuario[0]->numero_identificacion . '\\InformesTecnicos\\' . $fechaUbicacions. '\\' . $name, base64_decode($file));
                        $data->save();
                    }
                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Informe creado'

                    );
                } else {
                    $data = array(
                        'status' => 'error',
                        'code' => 400,
                        'message' => 'Informe no creado'

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
}
