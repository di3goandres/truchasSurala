<?php

namespace App\Http\Controllers;

use App\Dispositivos;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use OneSignal;


class NotificacionesController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => []]);
    }

    public function store(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {

            $user = $jwtAuth->checkToken($token, true);
            //validar datos
            $validate = \Validator::make($params_array, [
                'token' => 'required|unique:users_movil',
                //comprueba si el token no  esta duplicaod

            ]);

            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'no se guardo el token del dispositivo',
                    'errors' => $validate->errors()
                );
            } else {
                $usuario = User::find($user->sub);
                if (is_object($usuario)) {
                    $dispositivo = new Dispositivos();
                    $dispositivo->user_id = $user->sub;
                    $dispositivo->token = $params_array["token"];
                    $dispositivo->save();
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'message' => 'Registro Exitoso'
                    );
                } else {
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'message' => 'Registro No Exitoso'
                    );
                }
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado',
            );
        }

        return response()->json($data, $data['code']);
    }


    public function borrarToken(Request $request)
    {

        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {

            $user = $jwtAuth->checkToken($token, true);
            //validar datos
            $validate = \Validator::make($params_array, [
                'token' => 'required',


            ]);

            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'no se elimino el token del dispositivo'

                );
            } else {
                $usuario = User::find($user->sub);
                if (is_object($usuario)) {
                    $dispositivo =  Dispositivos::where(
                        [
                            ['user_id', '=', $usuario->id],
                            ['token', '=', $params_array["token"]]
                        ]
                    )->get();

                    foreach ($dispositivo as $borrar) {
                        $borrar->delete();
                    }
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'message' => 'Registro Exitoso'
                    );
                } else {
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'message' => 'Registro No Exitoso'
                    );
                }
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'message' => 'Usuario no identificado',
            );
        }

        return response()->json($data, $data['code']);
    }

    public function SendUniqueUser(Request $request)
    {

        // Se envia un Json recibimos un json 
        // recoger los datos del usuario por post
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array

        if (!empty($params) && !empty($params_array)) {

            $validate = \Validator::make($params_array, [
                'titulo' => 'required',
                'mensaje' => 'required',
                'destino' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'No se ha enviado',
                    'errors' => $validate->errors()
                );
            } else {    
                
                // Para Todos los usuarios
                if($params_array['destino']=="TODOS"){
                    $usuarios= \DB::select('call UsuariosNotificarDespacho()');

                }else{
                    $usuarios= \DB::select('call UsuariosNotificarDespachoRuta(?)', array($params_array['destino']));
                }


                //Para la ruta seleccionada
              
                $userId =[];
                $conteo = 0;
                foreach($usuarios as $usuario){
                        $userId[$conteo] = $usuario->token;
                        $conteo++;
                }
                
                // var_dump($userId);
                // die();
                // $userId = ["ed41dced-1eeb-473c-98c1-364c11b44bfd", "edb5a98e-574c-4422-9fab-64b8d693173c", "edb5a98e-574c-4422-9fab-64b8d693173c"];
                $params = [];
                $params['include_player_ids'] = $userId;
                $contents = [
                    "en" => $params_array['mensaje'],
                    "tr" =>$params_array['mensaje'],
                ];
                $params['contents'] = $contents;
                $headings = [
                    "en" => $params_array['titulo'],
                    "es" => $params_array['titulo']
                ];
                $params['headings'] = $headings;
                OneSignal::sendNotificationCustom($params);

                $data = array(
                    'status' => 'success',
                    'code' => 200,

                );
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'No se ha enviado',
            );
        }

        return response()->json($data, $data['code']);
    }

    public function SendPersonal(Request $request)
    {

        // Se envia un Json recibimos un json 
        // recoger los datos del usuario por post
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array

        if (!empty($params) && !empty($params_array)) {

            $validate = \Validator::make($params_array, [
                'titulo' => 'required',
                'mensaje' => 'required',
                'usuario' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'No se ha enviado',
                    'errors' => $validate->errors()
                );
            } else {    
                
                $usuarios = \DB::table('users_movil')
           
                ->where('users_movil.user_id', '=',  $params_array['usuario'])
                ->select(
                    'users_movil.token',
                )
                ->get();
              
                $userId =[];
                $conteo = 0;
                foreach($usuarios as $usuario){
                        $userId[$conteo] = $usuario->token;
                        $conteo++;
                }
                
                 $params = [];
                $params['include_player_ids'] = $userId;
                $contents = [
                    "en" => $params_array['mensaje'],
                    "tr" =>$params_array['mensaje'],
                ];
                $params['contents'] = $contents;
                $headings = [
                    "en" => $params_array['titulo'],
                    "es" => $params_array['titulo']
                ];
                $params['headings'] = $headings;
                 OneSignal::sendNotificationCustom($params);

                $data = array(
                    'status' => 'success',
                    'code' => 200
                 

                );
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'No se ha enviado',
            );
        }

        return response()->json($data, $data['code']);
    }


    public function ObtenerNotificacionActual($id)
    {
        $usuarioActuales =  \DB::select('call UsuariosNotificarDespacho(?)', array($id));

        $data = array(
            'status' => 'sucess',
            'code' => 200,
            'notificaciones' => $usuarioActuales,

        );
        return response()->json($data, $data['code']);
    }

    public function ObtenerNotificacionRutas($id)
    {
        $rutas =  \DB::select('call obteneRutasDisponibles(?)', array($id));

        $data = array(
            'status' => 'sucess',
            'code' => 200,
            'rutas' => $rutas,

        );
        return response()->json($data, $data['code']);
    }
}
