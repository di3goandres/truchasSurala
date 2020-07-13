<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Despacho extends Model {

    protected $table = 'despachos';

       //Relacion de uno a muchos
    public function Lotes(){
        return $this->hasMany('App\Lotes', 'id_despacho', 'id')->whereRaw('total_lote - tamanio_usado > 0');;
    }
    
        public function pedidos(){
        return $this->hasMany('App\Pedidos', 'id_despacho','id')->orderBy('total', 'DESC');;
    }

}
