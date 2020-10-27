<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Despacho;
use App\DespachosImagenes;

class DespachosImagenesController extends Controller
{
    public function getImagenReporte($id, $filename)
    {

    
        $despachoImagenes = DespachosImagenes::find($id);

        if (is_object($despachoImagenes)) {
            $despacho = Despacho::find($despachoImagenes->id_despacho);
            $fecha = str_replace(' 00:00:00', '', $despacho->fecha);
            $isset = \Storage::disk('reporteLLegada')->exists('ReporteLlegada\\'  . $fecha . '\\' . $filename);
            if ($isset) {
                $file = \Storage::disk('reporteLLegada')->get('ReporteLlegada\\'  . $fecha . '\\' . $filename);
                return new Response($file, 200);
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
}
