import { Injectable } from '@angular/core';
import { ConteoRequest } from 'src/app/models/conteo/conteo.request';
import { ConteoTrazabilidadResponse } from 'src/app/models/conteo/conteo.trazabilida';
import { PedidosResponse } from 'src/app/models/pedidos/pedidos.response';
import { Respuesta } from 'src/app/models/Response';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteConteoService {



  constructor(
    private userService: UserService
  ) { }

  //Metodo para traer la informacion al cual se le puede reportar.
  ConteoPedidosUsuario() {
    return this.userService.ejecutarQuery<PedidosResponse>('/api/reporte/conteo/obtener/disponibles')
  }

  GetTrazabilidad($id) {
    return this.userService.ejecutarQuery<ConteoTrazabilidadResponse>('/api/reporte/conteo/trazabilidad/pedido/' + $id)
  }
  async ModalSinDatos(Titulo, Descrip, Ruta) {
    return this.userService.ModalGenericoVolver(Titulo, Descrip, Ruta)
  }


  presentToast(message: string) {
    this.userService.presentToast(message);
  }

  GuardarConteo(data: ConteoRequest) {
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/reporte/conteo/trazabilidad/guardar', data)

  }
}
