<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class UserController extends Controller {

    public function pruebas(Request $request)
    {
        return "Accion de pruebas de user controller";
    }
    

    public function register(Request $request)
    {
        // Se envia un Json recibimos un json 
        // recoger los datos del usuario por post
        $json = $request->input('json', null);


        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array

        if (!empty($params) && !empty($params_array))
        {
            //limpiar datos
            $params_array = array_map('trim', $params_array);
            // validar datos
            $validate = \Validator::make($params_array, [
                        'name' => 'required|regex:/^[\pL\s\-]+$/u',
                        'surname' => 'required|regex:/^[\pL\s\-]+$/u',
                        'numero_identificacion' => 'required|numeric|unique:users', //comprueba que el numero de identificacion sea unico
                        'email' => 'required|email|unique:users', //comprueba si el usuario esta duplicaod
                        'password' => 'required',
            ]);

            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'El usuario no se ha creado',
                    'errors' => $validate->errors()
                );
            }
            else
            {
                // Cifrar la contraseña
                // $pwd = password_hash($params->password, PASSWORD_BCRYPT, ['cost' => 4]);
                $pwd = hash('sha256', $params->password);
                // Comprobar si el usuario ya existe(duplicado)
                // Crear usuario
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->id_identificacion = $params_array['tipo_identificacion'];
                $user->numero_identificacion = $params_array['numero_identificacion'];


                $user->password = $pwd;
                $user->role = 'ROLE_USER';


                //Guardar el Usuario
                $user->save();


                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se creo correctamente',
                    'user' => $user
                );
            }
        }
        else
        {
            $data = array(
                'status' => 'error',
                'code' => 200,
                'message' => 'Los datos enviados no son correctos',
                'ENVIADO' => $json
            );
        }

        return response()->json($data, $data['code']);
    }

    public function login(Request $request)
    {
        $jwtAuth = new \JwtAuth();
        $json = $request->input('json', null);


        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if (!empty($params) && !empty($params_array))
        {//
            $validate = \Validator::make($params_array, [
                        'email' => 'required|email', //comprueba si el usuario esta duplicaod
                        'password' => 'required',
            ]);

            if ($validate->fails())
            {
                $signup = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'Los datos enviados no son correctos',
                    'errors' => $validate->errors()
                );
            }
            else
            {
                //
                $email = $params_array['email'];
                $password = $params_array['password'];
                $pwd = hash('sha256', $params->password);

                if (!empty($params->gettoken))
                {
                    $signup = $jwtAuth->signup($email, $pwd, true);
                }
                else
                {
                    $signup = $jwtAuth->signup($email, $pwd);
                }
            }
        }
        else
        {
            $signup = array(
                'status' => 'error',
                'code' => 200,
                'message' => 'Los datos enviados no son correctos'
            );
        }


        return response()->json($signup, 200);
    }

    public function update(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array))
        {
            // recoger los datos por post
            $user = $jwtAuth->checkToken($token, true);


            //validar datos
            $validate = \Validator::make($params_array, [
                        'name' => 'required|alpha',
                        'surname' => 'required|alpha',
                        'email' => 'required|email|unique:users', //.$user->sub,
                            //comprueba si el email esta duplido, siempre y cuando no sea el mism
            ]);

            if ($validate->fails())
            {
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El usuario no se ha creado',
                    'errors' => $validate->errors()
                );
            }
            //quitar los campos que n quiero actualizar por si los llegan a envir
            unset($params_array["id"]);
            unset($params_array["role"]);
            unset($params_array["password"]);
            unset($params_array["created_at"]);
            unset($params_array["remember_token"]);
            unset($params_array["email"]);

            // actualizar usuario
            $user_update = User::where('id', $user->sub)->update($params_array);
            //devolver array con resultado
            $data = array(
                'code' => 200,
                'status' => 'success',
                'message' => $user_update
            );
        }
        else
        {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        // recoger datos de la peticion
        $imagen = $request->file('file0');


        //Validar si es una imagen
        $validate = \Validator::make($request->all(), [
                    'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        //Guardar Imagen

        if (!$imagen || $validate->fails())
        {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'image' => 'Error al subir la imagen'
            );
        }
        else
        {
            $image_name = time() . $imagen->getClientOriginalName();
            \Storage::disk('users')->put($image_name, \File::get($imagen));

            $data = array(
                'code' => 200,
                'status' => 'success',
                'image' => $image_name,
            );
        }


        // devolver el resultado


        return response()->json($data, $data['code']);
    }

    public function getImage($filename)
    {
        $isset = \Storage::disk('users')->exists($filename);
        if ($isset)
        {
            $file = \Storage::disk('users')->get($filename);
            return new Response($file);
        }
        else
        {
            $data = array(
                'code' => 400,
                'status' => 'error',
            );
        }
        return response()->json($data, $data['code']);
    }

    public function detail($id)
    {
        $user = User::find($id);
        if (is_object($user))
        {
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user
            );
        }
        else
        {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Ha ocurrido un error al consultar el usuario'
            );
        }
        return response()->json($data, $data['code']);
    }



}
