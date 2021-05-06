<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
                    left join mortalidad m on m.id_pedido = p.id
                    where u.id = ? and  pa.tipo_parametro = "tiempo_mortalidad_conteo"
                    and  d.fecha_salida  >= ( CURDATE() - INTERVAL pa.valor DAY )',
            array(5)
        );


        return $despachos;
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


}
