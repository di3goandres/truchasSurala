<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BandejasLotes extends Model {

    //
    protected $table = 'bandeja_lote';

    
    
    public function Lote(){
        return $this->belongsTo('App\Lote', 'id_lote');
    }
}
