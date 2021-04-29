<?php

namespace App\Http\Controllers;

use App\Despacho;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;
use App\Fincas;
use App\Helpers\JwtAuth;
use App\Pedidos;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['getpdf', 'login', 'loginsurala', 'UsuariosApp']]);
    }

    /// para registrar usarios fincas
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
            $validate = Validator::make($params_array, [
                'name' => 'required',
                // 'surname' => 'required',
                'tipo_usuario' => 'required',

                'numero_identificacion' => 'required|numeric|unique:users', //comprueba que el numero de identificacion sea unico
                'email' => 'required|unique:users', //comprueba si el usuario esta duplicaod
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
                $user->tipo_usuario = $params_array['tipo_usuario'];


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


    /**
     * para registrar usuarios en la app de administracion
     * los conductore como podran acceder a la app
     */
    public function registerAPP(Request $request)
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
            $validate = Validator::make($params_array, [
                'name' => 'required',
                // 'surname' => 'required',
                'role' => 'required|in:ADMIN,OVAS,ALEVINOS,TECNICO,CONDUCTOR',
                'numero_identificacion' => 'required|numeric|unique:users', //comprueba que el numero de identificacion sea unico
                'email' => 'required|unique:users', //comprueba si el usuario esta duplicado
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
                $user->telefono = '0';
                $user->tipo_usuario = 'SURALA';
                $user->role = $params_array['role'];
                $user->password = $pwd;
                //Guardar el Usuario
                $user->save();

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
        $jwtAuth = new JwtAuth();
        $json = $request->input('json', null);


        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if (!empty($params) && !empty($params_array)) { //
            $validate = Validator::make($params_array, [
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
                    $signup = $jwtAuth->signup(false,$email, $pwd, true);
                } else {
                    $signup = $jwtAuth->signup(false, $email, $pwd);
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
    public function loginsurala(Request $request)
    {
        $jwtAuth = new JwtAuth();
        $json = $request->input('json', null);


        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if (!empty($params) && !empty($params_array)) { //
            $validate = Validator::make($params_array, [
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
                    $signup = $jwtAuth->signup(true,$email, $pwd, true);
                } else {
                    $signup = $jwtAuth->signup(true,$email, $pwd);
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

            $despacho = Despacho::find($pedido->id_despacho);
            $fechaUbicacions = str_replace(' 00:00:00', '', $despacho->fecha);
            $porFecha = \Storage::disk('users')->exists($usuario[0]->numero_identificacion . '\\Facturas\\' . $fechaUbicacions . '\\' . $filename);

            if ($isset) {
                $file = \Storage::disk('users')->get($usuario[0]->numero_identificacion . '\\Facturas\\' . $pedido->id . '\\' . $filename);
                return new Response($file, 200, $headers);
            } else  if ($porFecha) {
                $file = \Storage::disk('users')->get($usuario[0]->numero_identificacion . '\\Facturas\\' . $fechaUbicacions . '\\' . $filename);
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
            $name = time() . "_Factura.pdf";
            $file = str_replace('data:application/pdf;base64,', '', $file);
            $file = str_replace(' ', '+', $file);
            $pedido = Pedidos::find($idPedido);

            if (is_object($pedido)) {


                $despacho = Despacho::find($pedido->id_despacho);
                $usuario = \DB::table('users')
                    ->join('fincas', 'fincas.user_id', '=', 'users.id')
                    ->where('fincas.id', '=',  $pedido->id_finca)
                    ->select('users.numero_identificacion', 'users.id')
                    ->get();
                $fechaUbicacions = str_replace(' 00:00:00', '', $despacho->fecha);
                \Storage::disk('users')->put($usuario[0]->numero_identificacion . '\\Facturas\\' . $fechaUbicacions . '\\' . $name, base64_decode($file));

                $pedido->nombre_factura = $name;
                $pedido->save();


                $pedidosUsuario = \DB::table('pedidos')
                    ->join('fincas', 'fincas.id', '=', 'pedidos.id_finca')
                    ->join('users', 'fincas.user_id', '=', 'users.id')
                    ->where([
                        ['pedidos.id_despacho', '=',  $pedido->id_despacho],
                        ['users.id', '=',  $usuario[0]->id],

                    ])
                    ->select('pedidos.id')
                    ->get();

                foreach ($pedidosUsuario as $update) {
                    $updatePedido = Pedidos::find($update->id);
                    $updatePedido->nombre_factura = $name;
                    $updatePedido->save();
                }

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

    public function GetAllUserSurala()
    {
        $usuarios = User::where('role', '!=', 'USUARIO')->get();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'Usuarios' => $usuarios
        ]);
    }


    public function getConductores()
    {
        $usuarios = User::where('role', '=', 'CONDUCTOR')->get();
        return response()->json([
            'code' => 200,
            'status' => 'success',
            'Usuarios' => $usuarios
        ]);
    }



    public function resetPasswordByAdmin(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            // recoger los datos por post
            $user = $jwtAuth->checkToken($token, true);

            if ($user->rol === "ADMIN" |$user->email === "adrianasastre@truchasurala.com" ) {


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

    public function changePerfilByAdmin(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            // recoger los datos por post
            $user = $jwtAuth->checkToken($token, true);

            if ($user->rol === "ADMIN" |$user->email === "adrianasastre@truchasurala.com" ) {


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
                unset($params_array["password"]);
            

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

    public function changeMailByAdmin(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            // recoger los datos por post
            $user = $jwtAuth->checkToken($token, true);

            if ($user->rol === "ADMIN" |$user->email === "adrianasastre@truchasurala.com" ) {


                $validate = Validator::make($params_array, [
              
                    'email' => 'required|unique:users', //comprueba si el usuario esta duplicado
                ]);
    
                if ($validate->fails()) {
                    $data = array(
                        'status' => 'error',
                        'code' => 201,
                        'message' => 'Ya existe un usuario con este mail',
                        'errors' => $validate->errors(),
                    );
                } 
                else {
                   

                    //quitar los campos que n quiero actualizar por si los llegan a envir
                    unset($params_array["id"]);
                    unset($params_array["role"]);
                    unset($params_array["name"]);
                    unset($params_array["telefono"]);
                    unset($params_array["surname"]);
                    unset($params_array["numero_identificacion"]);
                    unset($params_array["tipo_identificacion"]);
                    unset($params_array["description"]);
                    unset($params_array["image"]);
                    unset($params_array["created_at"]);
                    unset($params_array["updated_at"]);
                    unset($params_array["password"]);
                    unset($params_array["tipo_usuario"]);
    
                
    
                    // actualizar usuario
                    $user_update = User::where('id', $params->id)->update($params_array);
                    //devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                        'message' => $user_update
                    );
                }
                
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


    public function asociarFinca(Request $request)
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
                'id' => 'required',
                'Fincas' => 'required|array|min:1'

            ]);
            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 200,
                    'message' => 'No se ha agregado',
                    'errors' => $validate->errors()
                );
            } else {


                $user = User::find($params->id);
                if (is_object($user)) {
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
                        'message' => 'Se agregaron correctamente',


                    );
                } else {
                    $data = array(
                        'status' => 'error',
                        'code' => 200,
                        'message' => 'No se ha agregado',
                        'errors' => $validate->errors(),
                    );
                }
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


    public function resetPasswordByUser(Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        if ($checktoken && !empty($params) && !empty($params_array)) {
            // recoger los datos por post
            $userToken = $jwtAuth->checkToken($token, true);

            if ($userToken->rol === "USUARIO") {


                $old_password = $params_array['old_password'];

                $old_password = hash('sha256',    $old_password);
                $user = User::where([
                    'email' => $userToken->email,
                    'password' => $old_password
                ])->first();
                //comprobar si son correctas
                $signup = false;
                if (is_object($user)) {
                    $signup = true;
                }

                if ($signup) {

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
                    unset($params_array["old_password"]);
                    unset($params_array["password_confirm"]);


                    //se setea la nueva contraseña encriptada
                    $params_array['password'] = $pwd;
                    // actualizar usuario
                    $user_update = User::where('id', $user->id)->update($params_array);
                    //devolver array con resultado
                    $data = array(
                        'code' => 200,
                        'status' => 'success',
                    );
                } else {
                    $data = array(
                        'code' => 400,
                        'status' => 'error',
                        'message' => 'Login incorrecto.'
                    );
                }
            } else {
                $data = array(
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No autorizado a cambiar'
                );
            }
        } else {
            $data = array(
                'code' => 401,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function UsuariosApp(){
        $usuarios= DB::select('call 00_UsuariosAPP()');
        $data = array(
            'code' => 200,
            'status' => 'success',
            'usuarios'=> $usuarios,
        );
        return response()->json($data, $data['code']);
    }
}
