<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Despacho extends Model {

    protected $table = 'despachos';

       //Relacion de uno a muchos
    public function Lotes(){
        return $this->hasMany('App\Lotes');
    }

}
