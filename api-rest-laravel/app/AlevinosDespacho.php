<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlevinosDespacho extends Model
{
    //
    protected $table = 'alevinos_dia_despacho';

    public function pedidosSemana()
    {
        return $this->hasMany('App\AlevinosSalida', 'id_alevinos_dia_despacho', 'id');
    }
}
