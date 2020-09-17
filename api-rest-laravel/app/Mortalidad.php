<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mortalidad extends Model
{
    protected  $table = 'mortalidad';

        // relacion de uno a muchos e inversa(muchos a uno)
  
        
        public function Preguntas()
        {   
            return $this->hasMany('App\MortalidadPreguntas', 'id_mortalidad', 'id');
        }
    
        public function Diario(){
            return $this->hasMany('App\MortalidadDiario', 'id_mortalidad', 'id');
        }
}
