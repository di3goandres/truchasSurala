<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use App\Fincas;
use App\Lotes;


class Pedidos extends Model {

    protected $table = 'pedidos';

    public function finca()
    {
        return $this->hasOne('App\Fincas', 'id', 'id_finca');
    }
    
    public function lotes()
    {   
        return $this->hasMany('App\Lotes', 'id_despacho', 'id_despacho')->whereRaw('total_lote - tamanio_usado > 0');
    }
    
    
     public function despacho()
    {
        return $this->hasOne('App\Despacho', 'id', 'id_despacho');
    }

}
