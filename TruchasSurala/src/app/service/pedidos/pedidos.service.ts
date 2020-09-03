import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedidos';

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
}
