<?php

namespace App\Http\Controllers;

use App\Despacho;
use App\Fincas;
use App\InformesTecnicos;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InformesTecnicosController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['getpdf', 'informesUsuario']]);
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
                                $name = time() . "_LaboratorioPCR.pdf";
                                $data->archivo_pcr = $name;
                                break;
                            case 3:
                                $name = time() . "_Histopatologia.pdf";
                                $data->histopatologia = $name;
                                break;

                            case 4:
                                $name = time() . "_LaboratorioNutricional.pdf";
                                $data->laboratorioNutricional = $name;
                                break;
                        }

                        \Storage::disk('users')
                            ->put($usuario[0]->numero_identificacion . '\\InformesTecnicos\\' . $fechaUbicacions . '\\' . $name, base64_decode($file));
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



    public function actualizarInforme(Request $request)
    {
        //recoger los datos por post 
        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        // validar los datos


        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'user_id' => 'required',
                'id' => 'required',
                'finca_id' => 'required',
                'observaciones' => 'required',
                "informes" => "array|min:0",
                "informes.*.tipo" => "numeric|min:0",
                "informes.*.file" => "min:0",
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Informe, no se pudo actualizar',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {

                $usuario = \DB::table('users')
                    ->where('users.id', '=',  intval($params_array['user_id']))
                    ->select('users.id', 'users.numero_identificacion')
                    ->get();
                $finca = Fincas::find($params_array['finca_id']);
                $informe = InformesTecnicos::find($params_array['id']);

                if (is_object($usuario) &&  is_object($finca) && is_object($informe)) {
             
                    $fechaUbicacions = str_replace(' 00:00:00', '', $informe->fecha_visita);
                    $informe->observaciones = $params_array['observaciones'];
                    $informe->save();

                  
                    $archivos = $params_array['informes'];
                    foreach ($archivos as $archivo) {

                        $file = $archivo['file'];
                        $id = $archivo['tipo'];
                        $file = str_replace('data:application/pdf;base64,', '', $file);
                        $file = str_replace(' ', '+', $file);
                        switch ($id) {
                            case 1:
                                $name = time() . "_InformeTecnico.pdf";
                                $informe->InformeTecnico = $name;

                                break;
                            case 2:
                                $name = time() . "_LaboratorioPCR.pdf";
                                $informe->archivo_pcr = $name;
                                break;
                            case 3:
                                $name = time() . "_Histopatologia.pdf";
                                $informe->histopatologia = $name;
                                break;

                            case 4:
                                $name = time() . "_LaboratorioNutricional.pdf";
                                $informe->laboratorioNutricional = $name;
                                break;
                        }

                        \Storage::disk('users')
                            ->put($usuario[0]->numero_identificacion . '\\InformesTecnicos\\' . $fechaUbicacions . '\\' . $name, base64_decode($file));
                        $informe->save();
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

    public function getpdf($id, $filename)
    {

        $headers = array(
            'Content-Type: application/pdf',
        );

        $informe = InformesTecnicos::find($id);

        if (is_object($informe)) {

            $usuario = \DB::table('users')
                ->where('users.id', '=',  $informe->user_id)
                ->select('users.id', 'users.numero_identificacion')
                ->get();

            $fechaUbicacions = str_replace(' 00:00:00', '', $informe->fecha_visita);

            $isset =  \Storage::disk('users')
                ->exists($usuario[0]->numero_identificacion . '\\InformesTecnicos\\' . $fechaUbicacions . '\\' . $filename);
            if ($isset) {
                $file = \Storage::disk('users')->get($usuario[0]->numero_identificacion . '\\InformesTecnicos\\' . $fechaUbicacions . '\\' . $filename);
                return new Response($file, 200, $headers);
            } else {
                $data = array(
                    'code' => 200,
                    'status' => 'no existo',
                    'user' =>  $filename
                );
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'no me encuentro ',
                'user' =>  $filename
            );
        }



        return response()->json($data, $data['code']);
    }
    public function informesTecnicosByToken(Request $request)
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
            $informes = \DB::select('call ObtenerInformesTecnicos(?)', array($user->sub));

            $data = array(
                'code' => 200,
                'status' => 'success',
                'informes' => $informes

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


    public function existeinforme($id, $fecha)
    {


        $informe = \DB::table('informes_tecnicos')

            ->where('informes_tecnicos.finca_id', '=',  $id)
            ->where('informes_tecnicos.fecha_visita', '=',  $fecha)

            ->select('informes_tecnicos.id')
            ->get();

        if (is_object($informe)) {
            if (count($informe) > 0) {
                $data = array(
                    'code' => 200,
                    'status' => 'Existe',

                );
            } else {
                $data = array(
                    'code' => 400,
                    'status' => 'No Existe',

                );
            }
        } else {
            $data = array(
                'code' => 400,
                'status' => 'No',

            );
        }



        return response()->json($data, $data['code']);
    }

    public function informesUsuario($id)
    {


        $informe = \DB::table('informes_tecnicos')
            ->join('fincas', 'fincas.id', '=',  'informes_tecnicos.finca_id')
            ->where('informes_tecnicos.user_id', '=',  $id)


            ->select(
                'informes_tecnicos.*',
                'fincas.nombre',
                'fincas.municipio',
                'fincas.departamento',
            )
            ->get();

        if (is_object($informe)) {

            $data = array(
                'code' => 200,
                'status' => 'success',
                'informe' => $informe

            );
        } else {
            $data = array(
                'code' => 400,
                'status' => 'sin datos',

            );
        }



        return response()->json($data, $data['code']);
    }

    // Retornar usuarios que tengan Informes tecnicos.
    public function GetAllUserFincas()
    {
        $usuarios = DB::table('users')
            ->join('informes_tecnicos', 'informes_tecnicos.user_id', '=', 'users.id')
            ->select(
                'users.*',
            )->distinct()
            ->get();
        return response()->json([
            'code' => 200,
            'status' => 'success',
            'Usuarios' => $usuarios
        ]);
    }

    public function InformesRegistrados()
    {
        $informe = DB::table('informes_tecnicos')
            ->join('fincas', 'fincas.id', '=',  'informes_tecnicos.finca_id')
            ->join('users', 'users.id', '=',  'fincas.user_id')
            ->select(
                'informes_tecnicos.id',
                'informes_tecnicos.user_id',
                'informes_tecnicos.finca_id',
                DB::raw("DATE_FORMAT(informes_tecnicos.fecha_visita, '%Y-%m-%d') as fecha_visita"),
                'informes_tecnicos.observaciones',
                'informes_tecnicos.informeTecnico',
                'informes_tecnicos.archivo_pcr',
                'informes_tecnicos.histopatologia',
                'informes_tecnicos.laboratorioNutricional',
                DB::raw("DATE_FORMAT(informes_tecnicos.created_at, '%Y-%m-%d') as created_at"),
                DB::raw("DATE_FORMAT(informes_tecnicos.updated_at, '%Y-%m-%d') as updated_at"),
                'fincas.nombre',
                'fincas.municipio',
                'fincas.departamento',
                DB::raw("CONCAT(users.name, ', ', users.surname ) as nombreUsuario"),
                'users.numero_identificacion'
            )
            ->orderBy('informes_tecnicos.created_at', 'desc')
            ->get();
        if (is_object($informe)) {
            $data = array(
                'code' => 200,
                'status' => 'success',
                'informe' => $informe
            );
        } else {
            $data = array(
                'code' => 400,
                'status' => 'sin datos',
            );
        }
        return response()->json($data, $data['code']);
    }
}
