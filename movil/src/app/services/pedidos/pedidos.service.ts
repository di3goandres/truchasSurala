import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { PedidosResponse } from '../../models/pedidos/pedidos.response';
import { EstadisticaResponse } from '../../models/pedidos/estadistica.response';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private userService: UserService) { }

  obtenerMisPedidos(){
    return this.userService
        .ejecutarQuery<PedidosResponse>('/api/datos/pedidosusuario')
  }

  obtenerEstadistica(){
    return this.userService
        .ejecutarQuery<EstadisticaResponse>('/api/estadistica/usuario')
  }
}
