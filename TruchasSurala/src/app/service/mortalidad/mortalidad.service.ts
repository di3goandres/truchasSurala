import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { MortalidadResponse } from '../../models/mortalidad/mortalidad.response';
import { MortalidadUsuariosRespose } from '../../models/mortalidad/mortalidad.usuarios';
import { DetalleMortalidadResponse } from '../../models/mortalidad/mortalidad.detalle';
import { MortalidadAprobacionRequest } from '../../models/mortalidad/mortalidad.aprobacion';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';

@Injectable({
  providedIn: 'root'
})
export class MortalidadService {

  constructor(
    private service: UserService

  ) { }

  traerInformacion(){
    return this.service.ejecutarQuery<MortalidadResponse>('/api/mortalidad/registrosMortalidad');
  }
  traerRegistros(id){
    return this.service.ejecutarQuery<MortalidadUsuariosRespose>('/api/mortalidad/UsuarioregistrosMortalidad/' + id);
  }

  traerRegistrosDiarios(id){
    return this.service.ejecutarQuery<DetalleMortalidadResponse>('/api/mortalidad/getregistrosDiarioMortalidad/' + id);
  }

  Aprobar(datos : MortalidadAprobacionRequest){
    let json = JSON.stringify(datos);
    let params = 'json=' + json;
    return this.service.ejecutarQueryPostRetorno<Respuesta>('/api/mortalidad/aprobar', params);
  }
 
}
