import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedidos';
import { EliminarPedido } from '../../models/pedidos/delete.pedidos.request';


@Injectable({
  providedIn: 'root'
})

export class PedidosService {

  constructor(
    private userService: UserService
  ) { }

  updatePedido(data: Pedido): Observable<any> {
    let json = JSON.stringify(data);
    let params = 'json=' + json;
    return this.userService.ejecutarQueryPost('/api/pedidos/actualizarpedido', params);
   }

   borrarTrazabilidad(id): Observable<any> {
  let   eliminar = new EliminarPedido();
    eliminar.id = id;
    eliminar.borrarPedido = false;

    let json = JSON.stringify("eliminar");
    let params = 'json=' + json;
    console.log(params)

    return this.userService.ejecutarQueryDelete('/api/pedidos/eliminarpedido/'+id+'/false', '');
   }

   borrarTrazabilidadyPedido(id): Observable<any> {
    let   eliminar = new EliminarPedido();
    eliminar.id = id;
    eliminar.borrarPedido = true;

    let json = JSON.stringify("eliminar");
    let params = 'json=' + json;
    console.log(params)
    return this.userService.ejecutarQueryDelete('/api/pedidos/eliminarpedido/'+id+'/true', '');
   }

}
