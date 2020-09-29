<?php

namespace App\Http\Controllers;

use App\Dispositivos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use OneSignal;


class NotificacionesController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('api.auth', ['except' => []]);
    // }

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
                $dispositivo = new Dispositivos();
                $dispositivo->user_id = $user->sub;
                $dispositivo->token = $params_array["token"];
                $dispositivo->save();
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'Registro Exitoso'
                );
            }
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }

        return response()->json($data, $data['code']);
    }


    public function SendUniqueUser(Request $request)
    {
       
    

        $userId = ["ed41dced-1eeb-473c-98c1-364c11b44bfd", "ed41dced-1eeb-473c-98c1-364c11b44bfd"]; 
        $params = []; 
        $params['include_player_ids'] = $userId; 
        $contents = [ 
        "en" => "Algun Mensaje", 
        "tr" => "Some Turkish Message"
        ]; 
        $params['contents'] = $contents; 
        $headings = [
            "en"=> "Algn titulo  :)",
             "es"=> "Titulo en español2"
        ];
        $params['headings'] = $headings; 


        OneSignal::sendNotificationCustom($params);

        

        $data = array(
            'status' => 'success',
            'code' => 200,
          
        );
        return response()->json($data, $data['code']);
    }
}
