<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fincas extends Model
{
    //
   protected  $table = 'fincas';
    
    // relacion de uno a muchos e inversa(muchos a uno)
    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }
    
     public function pedidos(){
        return $this->hasMany('App\Pedidos', 'id_finca');
    }
   
  
}
