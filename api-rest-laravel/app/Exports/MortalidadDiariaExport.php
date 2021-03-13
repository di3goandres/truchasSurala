<?php

namespace App\Exports;

use App\MortalidadDiario;
use Maatwebsite\Excel\Concerns\FromCollection;

class MortalidadDiariaExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return MortalidadDiario::all();
    }
}
