<?php

namespace App\Http\Controllers;

use App\Exports\MortalidadExport;
use App\Exports\MortalidadTotalExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class InformesExcelController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function Mortalidad(Request $request)
    {
        return Excel::download(new MortalidadTotalExport, 'MortalidadesPendientes' . time() . '.xlsx');
    }
}

