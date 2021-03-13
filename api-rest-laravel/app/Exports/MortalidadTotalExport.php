<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class MortalidadTotalExport implements WithMultipleSheets, SkipsUnknownSheets
{
    public function sheets(): array
    {
        return [
            'Mortalidad' => new MortalidadExport(),
            'Registro Diario' => new MortalidadDiariaExport()
        ];
    }
    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        info("Sheet {$sheetName} was skipped");
    }
}
