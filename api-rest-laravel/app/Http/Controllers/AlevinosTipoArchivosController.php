<?php

namespace App\Http\Controllers;

use App\AlevinosTipoArchivo;
use Illuminate\Http\Request;

class AlevinosTipoArchivosController extends Controller
{

    public function index()
    {
        $despachos = AlevinosTipoArchivo::orderby('id', 'DESC')->get();



        

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'tipoArchivos' => $despachos
        ]);
    }
}
