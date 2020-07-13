<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrazabilidadBandeja extends Model
{
   protected  $table = 'trazabilidad_bandejas';
    
    // relacion de uno a muchos e inversa(muchos a uno)
    public function trazabilidad(){
        return $this->belongsTo('App\trazabilidad', 'id_trazabilidad');
    }
    

    public function bandejas(){
        return $this->hasOne('App\BandejasLotes', 'id', 'id_bandeja');
    }
    
     public function Lote(){
        return $this->hasOne('App\Lotes', 'id', 'id_lote');
    }
}
