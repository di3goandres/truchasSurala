import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { MortalidadResponse } from '../../models/mortalidad/mortalidad.response';
import { MortalidadUsuariosRespose } from '../../models/mortalidad/mortalidad.usuarios';

@Injectable({
  providedIn: 'root'
})
export class MortalidadService {

  constructor(
    private service: UserService

  ) { }

  traerInformacion(){
    return this.service.ejecutarQuery<MortalidadResponse>('/api/mortalidad/registrosMortalidad/');
  }
  traerRegistros(id){
    return this.service.ejecutarQuery<MortalidadUsuariosRespose>('/api/mortalidad/UsuarioregistrosMortalidad/' + id);
  }
}
