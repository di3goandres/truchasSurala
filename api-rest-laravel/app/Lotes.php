<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lotes extends Model
{
     protected  $table = 'lotes';
    
    // relacion de uno a muchos e inversa(muchos a uno)
    public function Despacho(){
        return $this->belongsTo('App\Despacho', 'id_despacho');
    }
    

    public function bandejas(){
        return $this->hasMany('App\BandejasLotes');
    }
    
}
