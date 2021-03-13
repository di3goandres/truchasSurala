<?php

namespace App\Exports;

use App\MortalidadDiario;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class MortalidadDiariaExport implements  FromQuery, WithHeadings, WithEvents, WithColumnFormatting, WithTitle
{
    use Exportable;

    protected $results;

    public function title(): string
    {
        return 'Mortalidad Diaria';
    }
    public function query()
    {

        $programacion = MortalidadDiario::query()
            ->join('mortalidad', 'mortalidad.id', '=', 'mortalidad_diario.id_mortalidad')
            ->join('pedidos', 'mortalidad.id_pedido', '=', 'pedidos.id')
            ->join('despachos', 'despachos.id', '=', 'pedidos.id_despacho')
            ->join('fincas', 'fincas.id', '=', 'mortalidad.id_finca')
            ->join('users', 'users.id', '=', 'fincas.user_id')
            ->select(
                'mortalidad_diario.id',
                'mortalidad.id as id_mortalidad',
                'mortalidad.Estado',
                'despachos.fecha_salida',
                'despachos.numero_factura',
                'pedidos.pedido',
                DB::raw('(CASE WHEN pedidos.adicional =  0  THEN "0" ELSE pedidos.adicional END) AS adicional'),
                DB::raw('(CASE WHEN pedidos.reposicion =  0  THEN "0" ELSE pedidos.reposicion END) AS reposicion'),
                DB::raw('(CASE WHEN pedidos.total =  0  THEN "0" ELSE pedidos.total END) AS total'),   
                'mortalidad_diario.dia',
                DB::raw('(CASE WHEN mortalidad_diario.cantidad =  0  THEN "0" ELSE mortalidad_diario.cantidad END) AS cantidad'),
                'mortalidad_diario.created_at',
                
                'mortalidad_diario.updated_at',
            );


        $this->results =    $programacion; //Mortalidad::query()->where('Estado', 'Pendiente');
        return $this->results;
    }
    public function headings(): array
    {
        return [
            "ID",
            "ID MORTALIDAD",
            "Estado",
            "Fecha Salida Despacho",
            "Num Factura despacho",
            "Total Pedido",
            "Total Adicional",
            "Total Reposicion",
            "Total",
            "# Dia",
            "Cantidad",            
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

                $event->sheet->getStyle('F2:M'.$row_count)->applyFromArray(
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
                
                $conditionalStyles = $event->sheet->getStyle('C1:C'.$row_count)->getConditionalStyles();
                $conditionalStyles[] = $conditional1;
                $conditionalStyles[] = $conditional2;                            
                $event->sheet->getStyle('C1:C'.$row_count)->setConditionalStyles($conditionalStyles);
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
            'L' =>  'yyyy-mm-ddTh:mm:ss',
            'M' =>  'yyyy-mm-ddTh:mm:ss',
            'F' =>"#,##0",
            'G' =>"#,##0",
            'H' =>"#,##0",
            'I' =>"#,##0",



            'J' =>"#,##0",
            'K' => "#,##0",
     

        ];
    }
}
