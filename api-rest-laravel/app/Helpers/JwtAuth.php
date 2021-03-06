<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

class JwtAuth
{

    public $key;

    public function __construct()
    {
        $this->key = 'esto_es_una_clave_super_secreta';
    }

    public function signup($admin, $email, $password, $getToken = null)
    {
        //Buscar si existe un usuario con esas credenciales

        $user = User::where([
            'email' => $email,
            'password' => $password
        ])->first();




        //comprobar si son correctas
        $signup = false;
        if (is_object($user)) {
            $signup = true;
        }

        if ($admin) {
            if ($user->role == 'USUARIO' || $user->role == 'CONDUCTOR') {
                $signup = false;
            }
        }
        //Generar el token con los datos del usuario identificado
        if ($signup) {

            $EXPIRACION = time();
            if ($user->role == 'USUARIO' || $user->role == 'CONDUCTOR') {
                //dias horas minutos segundos.
                $EXPIRACION = time() +  (180 * 24 * 60 * 60);
            } else {
                $EXPIRACION = time() + (1 * 12 * 60 * 60);
            }
            $token = array(
                'sub' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'surname' => $user->surname,
                'numero_identificacion' => $user->numero_identificacion,
                'telefono' => $user->telefono,
                'tipo_usuario' => $user->tipo_usuario,
                'rol' => $user->role,
                'iat' => time(),
                'exp' => $EXPIRACION,
            );

            $jwt = JWT::encode($token, $this->key, 'HS256'); //key es la que va estar en el bakend
            // devolver el parametro
            if (is_null($getToken)) {
                $data = $jwt;
            } else {
                $decode = JWT::decode($jwt, $this->key, ['HS256']);
                $data = $decode;
            }
        } else {
            $data = array(
                'status' => 'error',
                'message' => 'Login incorrecto.'
            );
        }
        // devolver los datos decodificados o el token, en funcion de un parametro

        return $data;
    }

    public function checkToken($jwt, $getIdentity = false)
    {
        $auth = false;
        try {
            $jwt = str_replace('"', "", $jwt);
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        } catch (\UnexpectedValueException $e) {
            $auth = false;
        } catch (\DomainException $e) {
            $auth = false;
        }

        if (!empty($decoded) && is_object($decoded) && isset($decoded)) {
            $auth = true;
        }
        if ($getIdentity) {
            return $decoded;
        }
        return $auth;
    }
}
