<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use App\MetodoConteo;
use App\MortalidaConteo;
use App\Pedidos;
use App\Trazabilidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ConteoController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function ConsultaPorPedido($usuario)
    {


        $despachos = DB::select(
            'select 
                            p.id,
                            m.id mortalidad,
                            p.pedido,
                            p.porcentaje,
                            p.adicional,
                            p.reposicion,
                            p.total,
                            p.nombre_factura,
                            date_format(d.fecha_salida, "%Y-%m-%d") fecha_salida,
                            date_format( DATE_ADD( d.fecha_salida, INTERVAL pa.valor DAY),  "%Y-%m-%d")  fecha_maxima, 
                            d.certificado,
                            f.nombre ,
                            f.municipio,
                            f.departamento
                    from pedidos p
                    left join despachos d on p.id_despacho = d.id
                    left join fincas f on p.id_finca = f.id
                    left join users u on f.user_id  = u.id
                    left join parametros pa on 1=1
                    left join mortalidad_conteo m on m.id_pedido = p.id
                    where u.id = ? and  pa.tipo_parametro = "tiempo_mortalidad_conteo"
                    and m.id is null

                    and  d.fecha_salida  >= ( CURDATE() - INTERVAL pa.valor DAY )',
            array(5)
        );


        return $despachos;
    }

    public function TrazabilidadConteo($idPedido)
    {
        $trazabilidad = DB::select(
            'select 
                distinct tr.id,
                tr.remision,
                tr.total_ovas_enviadas,
                tr.tiene_reporte_conteo,
                tr.cantidad_reportada,
                lotn.tamanio,
                lotn.ovas_ml
                from trazabilidad_bandejas tb
            left join trazabilidad tr on tb.id_trazabilidad = tr.id
            left join pedidos ped on tr.id_pedido = ped.id
            left join bandeja_lote bl on tb.id_bandeja_lote = bl.id
            left join lotes l on bl.id_lote = l.id
            left join lote_numero lotn on l.id_lote_numero = lotn.id
            where ped.id = ?;',
            array(581)
        );
        return $trazabilidad;
    }

    public function MetodoConteo()
    {
        $trazabilidad = DB::select(
            'select
                    mc.id,
                    mc.Nombre, 
                    mc.descripcion,
                    mc.esOvacon,
                    mc.esOtro
            from 
            metodo_conteo mc ',
            array()
        );
        return $trazabilidad;
    }

    public function obtnerPorcentaje()
    {
        $porcentaje = collect(DB::select(
            'select
                    pa.valor
            from 
            parametros pa
            where pa.tipo_parametro ="porcentaje_conteo" ',
            array()
        ))->first()->valor;
        return $porcentaje;
    }

    public function Dias()
    {
        $porcentaje = collect(DB::select(
            'select
                    pa.valor
            from 
            parametros pa
            where pa.tipo_parametro ="tiempo_mortalidad_conteo" ',
            array()
        ))->first()->valor;
        return $porcentaje;
    }


    /**
     * Metodo encargado de obtener los datos dle usuario y devolver los datos
     * de despachos que pueden ser posibles para registrar el conteo mal.
     */
    public function ConteopedidosByToken(Request $request)
    {
        $token = $request->header('Authorization');
        //aca
        $jwtAuth = new JwtAuth();
        $checktoken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        if ($checktoken) {
            $user = $jwtAuth->checkToken($token, true);

            $pedidos = $this->ConsultaPorPedido($user->sub);
            $data = array(
                'code' => 200,
                'status' => 'success',
                'pedidos' => $pedidos,

            );
        } else {
            $data = array(
                'code' => 401,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        return response()->json($data, $data['code']);
    }


    /**
     * Metodo encargado de obtener los datos de la trazabilida asociado al pedido
     */
    public function TrazabilidadConteopedidosByToken($id)
    {

        $ConteoTrazabilidad = $this->TrazabilidadConteo($id);
        $metodoConteo = $this->MetodoConteo();
        $porcentaje = $this->obtnerPorcentaje();
        $data = array(
            'code' => 200,
            'status' => 'success',
            'ConteoTrazabilidad' => $ConteoTrazabilidad,
            'metodoConteo' => $metodoConteo,
            'porcentaje' => (int)$porcentaje,



        );


        return response()->json($data, $data['code']);
    }

    public function Guardar(Request $request)
    {

        $json = $request->input('json', null);

        $params_array = json_decode($json, true); // array
        $params = json_decode($json); //objeto

        if (!empty($params_array)) {
            $validate = Validator::make($params_array, [
                'id_pedido' => 'required|numeric',
                'id_metodo' => 'required|numeric',
                'NumeroConteoRealizado' => 'required|numeric',
                "ConteoTrazabilidad" => "required|array|min:1",
                "ConteoTrazabilidad.*.id" => "required|numeric|min:1",
                "ConteoTrazabilidad.*.cantidad_reportada" => "required|min:1",
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

                $pedido = Pedidos::find($params->id_pedido);
                $MetodoConteo = MetodoConteo::find($params->id_metodo);

                if (is_object($pedido) && is_object($MetodoConteo)) {
                    $existe = MortalidaConteo::where('id_pedido', $pedido->id)->get();
                    if (count($existe) == 0) {
                        $trazabilidades = $params_array['ConteoTrazabilidad'];
                        foreach ($trazabilidades as $trazabilidad) {
                            $traza = Trazabilidad::find($trazabilidad["id"]);
                            if (is_object($traza)) {
                                $traza->tiene_reporte_conteo = true;
                                $traza->cantidad_reportada = $trazabilidad["cantidad_reportada"];
                                $traza->save();
                            }
                        }
                        $guardar = new  MortalidaConteo();
                        $guardar->id_pedido = $pedido->id;
                        $guardar->id_finca = $pedido->id_finca;
                        $guardar->id_metodoConteo = $MetodoConteo->id;
                        $guardar->MetodoConteo = $MetodoConteo->Nombre;
                        $guardar->NumeroConteoRealizado = $params->NumeroConteoRealizado;

                        $guardar->save();
                        $data = array(
                            'status' => 'success',
                            'code' => 200,
                            'message' => 'Informe se pudo crear',
                        );
                    } else {
                        $data = array(
                            'status' => 'success',
                            'code' => 201,
                            'message' => 'Informe no se pudo crear',

                        );
                    }
                } else {
                    $data = array(
                        'status' => 'error',
                        'code' => 401,
                        'message' => 'Informe, no se pudo crear',
                    );
                }
            }
        }

        return response()->json($data, $data['code']);
    }
}
