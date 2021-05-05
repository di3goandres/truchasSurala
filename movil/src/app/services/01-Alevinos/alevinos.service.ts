import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { AlevinosPedidosResponse } from '../../models/alevinos/alevinos.pedidos.response';
import { AlevinosDespachadosResponse } from '../../models/alevinos/alevinos.despachados.response';
import { AlevinosArchivosResponse } from 'src/app/models/alevinos/alevinos.archivos';

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

 async ModalSinDatos(Titulo, Descrip, Ruta){
   return this.userService.ModalGenericoVolver(Titulo, Descrip, Ruta)
  }
  GetReporteArchivos(id: number){
    return this.userService.ejecutarQuery<AlevinosArchivosResponse>('/api/Programacion/Alevinos/pedidos/archivos/' + id);
  }
}
