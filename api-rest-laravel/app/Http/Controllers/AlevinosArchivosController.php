<?php

namespace App\Http\Controllers;

use App\AlevinosArchivos;
use App\AlevinosPedidos;
use App\AlevinosTipoArchivo;
use App\Helpers\JwtAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AlevinosArchivosController extends Controller
{
    public function __construct()
    {
        // $this->middleware('api.auth');
    }


    public function ConsultaPorPedido($idPedido)
    {
        $despachos = DB::table('alevinos_pedidos')
            ->join('fincas', 'fincas.id', '=', 'alevinos_pedidos.id_finca')
            ->join('users as users', 'users.id', '=', 'fincas.user_id')
            ->join('alevinos_pedido_semana', 'alevinos_pedido_semana.id_alevinos_pedidos', '=', 'alevinos_pedidos.id')
            ->join('alevinos_dia_despacho', 'alevinos_dia_despacho.id', '=', 'alevinos_pedido_semana.id_alevinos_dia_despacho')
            ->where(
                [
                    ['alevinos_pedidos.id', '=', $idPedido]
                ]
            )
            ->select(
                'users.numero_identificacion',
                DB::raw("DATE_FORMAT(alevinos_dia_despacho.fecha_salida, '%Y-%m-%d') as fecha_salida")

            )
            ->get();

        return $despachos;
    }

    public function ConsultarArchivos($idAlevinos)
    {


        $Tipoarchivos = AlevinosTipoArchivo::all();


        $archivos = AlevinosArchivos::where([
            ['id_alevinos_pedidos', '=', $idAlevinos]
        ])
            ->get();

        $retorno = [];
        $id = 0;
        foreach ($Tipoarchivos as $Tipo) {
            $retorno[$id] =  $Tipo;
            if (count($archivos) > 0) {
                foreach ($archivos as $archivo) {
                    if ($Tipo['id'] === $archivo['id_tipo']) {
                        $retorno[$id]['estado'] = true;
                        $retorno[$id]['id_archivo'] = $archivo['id'];
                        $retorno[$id]['nombre'] = $archivo['nombre'];
                    } else {
                        $retorno[$id]['estado'] = false;
                    }
                }
            } else {
                $retorno[$id]['estado'] = false;
            }
            $id = $id + 1;
        }
        if (count($retorno) > 0) {
            return response()->json([
                'code' => 200,
                'status' => 'success',
                'archivosAlevinos' => $retorno
            ]);
        } else {
            return response()->json([
                'code' => 401,
                'status' => 'success',

            ]);
        }
    }


    public function store(Request $request)
    {

        //recoger los datos por post 
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array
        // validar los datos


        if (!empty($params_array)) {
            $validate = Validator::make($params_array, [

                'id_pedido_alevino' => 'required',
                "archivos" => "required|array|min:1",
                "archivos.*.tipo" => "required|numeric|min:1",
                "archivos.*.file" => "required|min:1",
            ]);


            if ($validate->fails()) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Reporte de Archivos, no se pudo crear',
                    'errors' => $validate->errors(),
                    'data' => $params_array
                );
            } else {
                $alevinosPedido = AlevinosPedidos::find($params->id_pedido_alevino);
                $usuario = $this->ConsultaPorPedido($params->id_pedido_alevino);
                if (is_object($alevinosPedido) && is_object($usuario)) {
                    $archivos = $params_array['archivos'];
                    foreach ($archivos as $archivo) {
                        $tipoArchivo = AlevinosTipoArchivo::find($archivo['tipo']);
                        if (is_object($tipoArchivo)) {
                            $data =  new AlevinosArchivos();
                            $data->id_alevinos_pedidos = $alevinosPedido->id;
                            $data->id_tipo = $tipoArchivo->id;
                            $file = $archivo['file'];
                            $file = str_replace('data:application/pdf;base64,', '', $file);
                            $file = str_replace(' ', '+', $file);
                            $name = time() . "_" . $tipoArchivo->tipo . ".pdf";
                            $data->nombre = $name;


                            Storage::disk('users')
                                ->put($usuario[0]->numero_identificacion . '\\Alevinos\\' . $usuario[0]->fecha_salida . '\\' . $name, base64_decode($file));
                            $data->save();
                        } else {
                            $data = array(
                                'status' => 'success',
                                'code' => 201,
                                'message' => 'Archivos no Creados'

                            );
                            return response()->json($data, $data['code']);
                        }
                    }
                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Archivos Creados'

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
