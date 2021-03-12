<?php

namespace App\Exports;

use App\Mortalidad;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MortalidadExport implements FromQuery, WithHeadings
{
    use Exportable;

    public function query()
    {
        return Mortalidad::query()->where('Estado', 'Pendiente');
    }
    public function headings(): array
    {
        return [
            "id",
            "idPedido",
            "idFinca",
            "estado",
            "AprobadoTroutlodge",
            'Aprobado Surala',
            'Observaciones',
            'Temperatura Bandeja Superior',
            'Temperatura Bandeja Intermedia',
            'Temperatura Bandeja Inferior',
            'Hielo Bandeja Superior',
            'Hielo Bandeja Intermedia',
            'Hielo Bandeja Inferior',       
            'Fecha registro',
            'Fecha Actualizacion',            




        ];
    }
}
