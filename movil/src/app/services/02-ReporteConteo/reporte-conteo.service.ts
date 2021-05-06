import { Injectable } from '@angular/core';
import { PedidosResponse } from 'src/app/models/pedidos/pedidos.response';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteConteoService {

  constructor(
    private userService: UserService
  ) { }

  //Metodo para traer la informacion al cual se le puede reportar.
  ConteoPedidosUsuario(){
    return this.userService.ejecutarQuery<PedidosResponse>('/api/reporte/conteo/obtener/disponibles')
  }
  async ModalSinDatos(Titulo, Descrip, Ruta){
    return this.userService.ModalGenericoVolver(Titulo, Descrip, Ruta)
   }
}
