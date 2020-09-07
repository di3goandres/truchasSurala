<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;
use App\Fincas;
use App\Pedidos;

class UserController extends Controller
{

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

        if (!empty($params) && !empty($params_array)) {
            //limpiar datos
            // $params_array = array_map('trim', $params_array);
            // validar datos
            $validate = \Validator::make($params_array, [
                'name' => 'required',
                // 'surname' => 'required',
                'numero_identificacion' => 'required|numeric|unique:users', //comprueba que el numero de identificacion sea unico
                'email' => 'required|email|unique:users', //comprueba si el usuario esta duplicaod
                'telefono' => 'numeric',
                'Fincas' => 'required|array|min:1'


            ]);

            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'El usuario no se ha creado',
                    'errors' => $validate->errors(),


                );
            } else {



                // Cifrar la contraseña
                // $pwd = password_hash($params->password, PASSWORD_BCRYPT, ['cost' => 4]);
                $pwd = hash('sha256', $params->numero_identificacion);
                // Comprobar si el usuario ya existe(duplicado)
                // Crear usuario
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->id_identificacion = $params_array['tipo_identificacion'];
                $user->numero_identificacion = $params_array['numero_identificacion'];
                $user->telefono = $params_array['telefono'];

                $user->password = $pwd;
                $user->role = 'USUARIO';
                //Guardar el Usuario
                $user->save();

                foreach ($params->Fincas as $finca) {
                    $fincasave = new Fincas();
                    $fincasave->user_id = $user->id;
                    $fincasave->nombre = $finca->nombre;
                    $fincasave->id_municipio = $finca->municipio;
                    $fincasave->direccion = $finca->direccion;
                    $fincasave->municipio = $finca->NombreMunicipio;
                    $fincasave->departamento = $finca->NombreDepartamento;
                    $fincasave->save();
                }

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se creo correctamente',


                );
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 200,
                'message' => 'Los datos enviados no son correctos',

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
        if (!empty($params) && !empty($params_array)) { //
            $validate = \Validator::make($params_array, [
                'email' => 'required|email', //comprueba si el usuario esta duplicaod
                'password' => 'required',
            ]);

            if ($validate->fails()) {
                $signup = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'Los datos enviados no son correctos',
                    'errors' => $validate->errors()
                );
            } else {
                //
                $email = $params_array['email'];
                $password = $params_array['password'];
                $pwd = hash('sha256', $params->password);

                if (!empty($params->gettoken)) {
                    $signup = $jwtAuth->signup($email, $pwd, true);
                } else {
                    $signup = $jwtAuth->signup($email, $pwd);
                }
            }
        } else {
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
        if ($checktoken && !empty($params) && !empty($params_array)) {
            // recoger los datos por post
            $user = $jwtAuth->checkToken($token, true);


            //validar datos
            $validate = \Validator::make($params_array, [
                'name' => 'required|alpha',
                'surname' => 'required|alpha',
                'email' => 'required|email|unique:users', //.$user->sub,
                //comprueba si el email esta duplido, siempre y cuando no sea el mism
            ]);

            if ($validate->fails()) {
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
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function uploadBase64(Request $request)
    {

        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken) {

            // recoger datos de la peticion
            $imagen = $request->file('file0');
            $user = $jwtAuth->checkToken($token, true);

            //Validar si es una imagen
            $validate = \Validator::make($request->all(), [
                'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
            ]);
            //Guardar Imagen

            if (!$imagen || $validate->fails()) {
                $data = array(
                    'code' => 400,
                    'status' => 'error',
                    'image' => 'Error al subir la imagen'
                );
            } else {
                $image_name = time() . $imagen->getClientOriginalName();
                \Storage::disk('users')->put($user->sub . '\\' . $image_name, \File::get($imagen));

                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'image' => $image_name,

                );
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
            );
        }


        // devolver el resultado


        return response()->json($data, $data['code']);
    }



    public function getpdf($id, $filename)
    {

        $headers = array(
            'Content-Type: application/pdf',
        );

        $pedido = Pedidos::find($id);

        if (is_object($pedido)) {
            $usuario = \DB::table('users')
                ->join('fincas', 'fincas.user_id', '=', 'users.id')
                ->where('fincas.id', '=',  $pedido->id_finca)
                ->select('users.numero_identificacion')
                ->get();
            $isset = \Storage::disk('users')->exists($usuario[0]->numero_identificacion . '\\Facturas\\' . $pedido->id . '\\' . $filename);
            if ($isset) {
                $file = \Storage::disk('users')->get($usuario[0]->numero_identificacion . '\\Facturas\\' . $pedido->id . '\\' . $filename);
                return new Response($file, 200, $headers);
             
            } else {
                $data = array(
                    'code' => 200,
                    'status' => 'error',
                    'user' =>  $filename
                );
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
                'user' =>  $filename
            );
        }



        return response()->json($data, $data['code']);
    }

    public function subirarchivo(Request $request)
    {

        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            $user = $jwtAuth->checkToken($token, true);

            // recoger datos de la peticion
            $file = $params_array['file'];
            $idPedido = $params_array['id'];
            $name = time() . $params_array['nombre'];
            $file = str_replace('data:application/pdf;base64,', '', $file);
            $file = str_replace(' ', '+', $file);
            $pedido = Pedidos::find($idPedido);

            if (is_object($pedido)) {
                $image_name = time() . $params_array['nombre'];

                $usuario = \DB::table('users')
                    ->join('fincas', 'fincas.user_id', '=', 'users.id')


                    ->where('fincas.id', '=',  $pedido->id_finca)
                    ->select('users.numero_identificacion')
                    ->get();

                \Storage::disk('users')->put($usuario[0]->numero_identificacion . '\\Facturas\\' . $pedido->id . '\\' . $name, base64_decode($file));

                $pedido->nombre_factura = $name;
                $pedido->save();
                $data = array(
                    'code' => 200,
                    'status' => 'OK',
                    'image' => $name
                );
            } else {
                $data = array(
                    'code' => 200,
                    'status' => 'error',
                    'message' => 'sin datos que procesar'


                );
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',


            );
        }


        // devolver el resultado


        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {

        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            $user = $jwtAuth->checkToken($token, true);

            // recoger datos de la peticion
            $imagen = $params_array['file'];
            $imagen = str_replace('data:image/jpeg;base64,', '', $imagen);
            $imagen = str_replace(' ', '+', $imagen);
            $image_name = time() . $params_array['nombre'];

            \Storage::disk('users')->put($user->sub . '\\' . $image_name, base64_decode($imagen));




            $data = array(
                'code' => 200,
                'status' => 'OK',
                'image' => $image_name
            );
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',


            );
        }


        // devolver el resultado


        return response()->json($data, $data['code']);
    }
    public function getImage($user, $filename)
    {


        $token = $user;
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);

        if ($checktoken) {
            $userId = $jwtAuth->checkToken($token, true);

            $isset = \Storage::disk('users')->exists($userId->sub . "//" . $filename);
            if ($isset) {
                $file = \Storage::disk('users')->get($userId->sub . "//" . $filename);
                return new Response($file, 200);
            } else {
                $data = array(
                    'code' => 200,
                    'status' => 'error',
                    'user' => "/" . $userId->sub . "/" . $filename
                );
            }
        } else {
            $data = array(
                'code' => 200,
                'status' => 'error',
            );
        }


        return response()->json($data, $data['code']);
    }



    public function detail($id)
    {
        $user = User::find($id);
        if (is_object($user)) {
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user
            );
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Ha ocurrido un error al consultar el usuario'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function GetAllUserFincas()
    {
        $usuarios = User::where('role', '=', 'USUARIO')->get();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'Usuarios' => $usuarios
        ]);
    }



    public function resetPasswordByAdmin(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            // recoger los datos por post
            $user = $jwtAuth->checkToken($token, true);

            if ($user->rol === "ADMIN") {


                $pwd = hash('sha256', $params->password);

                //quitar los campos que n quiero actualizar por si los llegan a envir
                unset($params_array["id"]);
                unset($params_array["role"]);
                unset($params_array["name"]);
                unset($params_array["telefono"]);
                unset($params_array["surname"]);
                unset($params_array["numero_identificacion"]);
                unset($params_array["tipo_identificacion"]);
                unset($params_array["email"]);
                unset($params_array["description"]);
                unset($params_array["image"]);
                unset($params_array["created_at"]);
                unset($params_array["updated_at"]);

                $params_array['password'] = $pwd;


                // actualizar usuario
                $user_update = User::where('id', $params->id)->update($params_array);
                //devolver array con resultado
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'message' => $user_update
                );
            } else {
                $data = array(
                    'code' => 200,
                    'status' => 'error',
                    'message' => 'No autorizado a cambiar'
                );
            }
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
