import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { PedidosResponse } from '../../models/pedidos/pedidos.response';
import { EstadisticaResponse } from '../../models/pedidos/estadistica.response';
import { DespachoResponse } from '../../models/despacho/despacho.response';
import { PedidosRequest } from '../../models/pedidos/pedidos.request';
import { TrazabilidadResponse } from '../../models/trazabilidad/trazabilidad.response';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedido: PedidosRequest
  constructor(private userService: UserService) { }

  obtenerMisPedidos(id) {
    this.pedido = new PedidosRequest(id);
    let json = JSON.stringify(this.pedido)
    let params = 'json=' + json;
    
    return this.userService
      .ejecutarQueryPost<PedidosResponse>('/api/movil/pedidosusuario', params)
  }

  obtenerMisDespachos() {
    return this.userService
      .ejecutarQuery<DespachoResponse>('/api/movil/despachos')
  }

  obtenerEstadistica() {
    return this.userService
      .ejecutarQuery<EstadisticaResponse>('/api/estadistica/usuario')
  }

  obtenerTrazabilidad(id) {
    return this.userService
      .ejecutarQuery<TrazabilidadResponse>('/api/Distribucion/' + id)


  }

  obtenerPedidoMoralidad(id){
    return this.userService
      .ejecutarQuery<PedidosResponse>('/api/movil/pedidoMortalidad/' + id)

  }

  responseError(){
    this.userService.responseError();
  }
}
