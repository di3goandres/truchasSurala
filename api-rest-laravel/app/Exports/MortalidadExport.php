<?php

namespace App\Exports;

use App\Mortalidad;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MortalidadExport implements FromQuery, WithHeadings, WithEvents, WithColumnFormatting, WithTitle
{
    use Exportable;

    protected $results;

    public function title(): string
    {
        return 'Mortalidad';
    }
    public function query()
    {

        $programacion = Mortalidad::query()
            ->join('pedidos', 'mortalidad.id_pedido', '=', 'pedidos.id')
            ->join('despachos', 'despachos.id', '=', 'pedidos.id_despacho')
            ->join('fincas', 'fincas.id', '=', 'mortalidad.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->select(
                'mortalidad.id',
                'mortalidad.Estado',
                'despachos.fecha_salida',
                'despachos.numero_factura',
                'users.name',
                'users.surname',
                'fincas.nombre',
                'fincas.departamento',
                'fincas.municipio',
                'pedidos.pedido',
                DB::raw('(CASE WHEN pedidos.adicional =  0  THEN "0" ELSE pedidos.adicional END) AS adicional'),
                DB::raw('(CASE WHEN pedidos.reposicion =  0  THEN "0" ELSE pedidos.reposicion END) AS reposicion'),
                DB::raw('(CASE WHEN pedidos.total =  0  THEN "0" ELSE pedidos.total END) AS total'),    

             
             
                'mortalidad.temp_bandeja_superior',
                'mortalidad.temp_bandeja_intermedia',
                'mortalidad.temp_bandeja_inferior',
                'mortalidad.hielo_bandeja_superior',
                'mortalidad.hielo_bandeja_intermedia',
                'mortalidad.hielo_bandeja_inferior',
                'mortalidad.temp_ovas_llegar',
                'mortalidad.temp_agua_incubacion',
                'mortalidad.metodo_aclimatacion',
                'mortalidad.fuente_agua_incubacion',
                'mortalidad.origen_agua_incubacion',
                'mortalidad.uso_agua_incubacion',
                'mortalidad.nivel_oxigeno',
                'mortalidad.hora_aclimatacion',
                DB::raw('(CASE WHEN mortalidad.minutos_aclimatacion =  0  THEN "0" ELSE mortalidad.minutos_aclimatacion END) AS minutos_aclimatacion'),
                'mortalidad.llegada_ovas',
                'mortalidad.llegada_ovas_finca',
                'mortalidad.apertura_cajas',
                'mortalidad.inicio_hidratacion',
                'mortalidad.inicio_siembra',
                'mortalidad.finalizacion_siembra',
                'mortalidad.inicio_eclosion',
                'mortalidad.fin_eclosion',
                'mortalidad.fecha_inicioProblema',
                DB::raw('(CASE WHEN mortalidad.utilizo_transporte =  1  THEN "SI" ELSE "NO" END) AS utilizo_transporte'),
                DB::raw('(CASE WHEN mortalidad.demora_llegada =  1  THEN "SI" ELSE "NO" END) AS demora_llegada'),
                DB::raw('(CASE WHEN mortalidad.danio_cajas =  1  THEN "SI" ELSE "NO" END) AS danio_cajas'),
                DB::raw('(CASE WHEN mortalidad.cambioGranja =  1  THEN "SI" ELSE "NO" END) AS cambioGranja'),
                DB::raw('(CASE WHEN mortalidad.similar =  1  THEN "SI" ELSE "NO" END) AS similar'),
                DB::raw('(CASE WHEN mortalidad.distintas =  1  THEN "SI" ELSE "NO" END) AS distintas'),
                'mortalidad.aprobado_Troutlodge',
                'mortalidad.aprobado_Surala',
                'mortalidad.Observaciones',
                'mortalidad.created_at',
                'mortalidad.updated_at',
            );


        $this->results =    $programacion; //Mortalidad::query()->where('Estado', 'Pendiente');
        return $this->results;
    }
    public function headings(): array
    {
        return [
            "ID",
            "Estado",
            "Fecha Salida Despacho",
            "Num Factura despacho",
            "Nombre",
            "Apellido",
            "Finca",
            "Departamento",
            "Municipio",
            "Total Pedido",
            "Total Adicional",
            "Total Reposicion",
            "Total",
            'Temp Bandeja Superior',
            'Temp Bandeja Intermedia',
            'Temp Bandeja Inferior',
            'Hielo Bandeja Superior',
            'Hielo Bandeja Intermedia',
            'Hielo Bandeja Inferior',
            'Temp Ovas al Llegar',
            'Temp Incubación',
            'Metodo de Aclimatación',
            'Fuente del agua',
            'Origen del agua',
            'Uso del agua',
            'Nivel de Oxigeno',
            'Hora Aclimatación',
            'Minutos',
            'Llegada',
            'Llegada Finca',
            'Apertura',
            'Inicio Hidratación',
            'Inicio Siembra',
            'Fin Siembra',
            'Inicio Eclosion',
            'Fin Eclosion',
            'Inicio Problema',
            'Uso Transporte',
            'Demora En Llegada',
            'Cajas dañadas',
            'Cambio de Granja',
            'Similar',
            'Distintas',
            "AprobadoTroutlodge",
            'Aprobado Surala',
            'Observaciones',
            'Fecha registro Reporte',
            'Fecha Actualizacion',
        ];
    }

    public function registerEvents(): array
    {
        return [
            // handle by a closure.
            AfterSheet::class => function (AfterSheet $event) {

                $row_count = $this->results->count() + 1;
                
                $event->sheet->getStyle('A1:AV1')->applyFromArray(
                    [
                        'font' => [

                            'bold' => true,
                            'size' => 13,             
                        ],
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            ],
                        ],
                        'alignment' => [
                            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        ],

                    ]
                );
                $event->sheet->getStyle('A2:AV'.$row_count)->applyFromArray(
                    [
                        'font' => [

                            'bold' => false,
                            'size' => 12,
                        ],
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            ],
                        ]

                    ]
                );

                $event->sheet->getStyle('J2:AV'.$row_count)->applyFromArray(
                    [
                        'alignment' => [
                            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        ],

                    ]
                );


                $conditional1 = new \PhpOffice\PhpSpreadsheet\Style\Conditional();
                $conditional1->setConditionType(\PhpOffice\PhpSpreadsheet\Style\Conditional::CONDITION_CONTAINSTEXT);
                $conditional1->setOperatorType(\PhpOffice\PhpSpreadsheet\Style\Conditional::OPERATOR_CONTAINSTEXT);
                $conditional1->setText('Pendiente');
                $conditional1->getStyle()->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_RED);
                $conditional1->getStyle()->getFont()->setBold(true);
                
                $conditional2 = new \PhpOffice\PhpSpreadsheet\Style\Conditional();
                $conditional2->setConditionType(\PhpOffice\PhpSpreadsheet\Style\Conditional::CONDITION_CONTAINSTEXT);
                $conditional2->setOperatorType(\PhpOffice\PhpSpreadsheet\Style\Conditional::OPERATOR_CONTAINSTEXT);
                $conditional2->setText('Aprobada');
                $conditional2->getStyle()->getFont()->getColor()->setARGB("bbde8e");
                $conditional2->getStyle()->getFont()->setBold(true);
                
                $conditionalStyles = $event->sheet->getStyle('B1:B'.$row_count)->getConditionalStyles();
                $conditionalStyles[] = $conditional1;
                $conditionalStyles[] = $conditional2;                            
                $event->sheet->getStyle('B1:B'.$row_count)->setConditionalStyles($conditionalStyles);
                // get layout counts (add 1 to rows for heading row)
                $column_count = count($this->headings());
                // set columns to autosize
                for ($i = 1; $i <= $column_count; $i++) {
                    $column = Coordinate::stringFromColumnIndex($i);
                    $event->sheet->getColumnDimension($column)->setAutoSize(true);
                }
            },
        ];
    }

    public function columnFormats(): array
    {
        return [
            'C' => NumberFormat::FORMAT_DATE_YYYYMMDD2,
            'AU' => NumberFormat::FORMAT_DATE_YYYYMMDD2,
            'AV' => NumberFormat::FORMAT_DATE_YYYYMMDD2,
            'J' =>"#,##0",
            'K' => "#,##0",
            'L' => "#,##0",
            'M' => "#,##0",

        ];
    }
}
