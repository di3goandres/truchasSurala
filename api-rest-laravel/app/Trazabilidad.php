<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trazabilidad extends Model {

    //

    protected $table = 'trazabilidad';

    public function bandejas()
    {
        return $this->hasMany('App\TrazabilidadBandeja', 'id_trazabilidad', 'id');
    }

}
