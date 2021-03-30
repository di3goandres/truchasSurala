import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { AlevinosPedidosResponse } from '../../models/alevinos/alevinos.pedidos.response';
import { AlevinosDespachadosResponse } from '../../models/alevinos/alevinos.despachados.response';

@Injectable({
  providedIn: 'root'
})
export class AlevinosService {

  constructor(
    private userService: UserService
  ) { }

  traerPedidosUsuario(){
    return this.userService.ejecutarQuery<AlevinosPedidosResponse>('/api/movil/alevinos/pedidos/token')
  }

  traerPedidosDespachadosUsuario(){
    return this.userService.ejecutarQuery<AlevinosDespachadosResponse>('/api/movil/alevinos/pedidos/despachados/token')
  }

  presentToast(message:string){
    this.userService.presentToast(message);
  }
}
