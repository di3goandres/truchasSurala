import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { PedidosResponse } from '../../models/pedidos/pedidos.response';
import { EstadisticaResponse } from '../../models/pedidos/estadistica.response';
import { DespachoResponse } from '../../models/despacho/despacho.response';
import { PedidosRequest } from '../../models/pedidos/pedidos.request';
import { TrazabilidadResponse } from '../../models/trazabilidad/trazabilidad.response';
import { Mortalidad } from '../../models/mortalidad/mortalidad.request';
import { Observable } from 'rxjs';
import { MortalidadDiarioResponse } from '../../models/mortalidad/mortalidad.diario.response';
import { DiarioRequest } from '../../models/mortalidad/mortalidad.diario.request';
import { Respuesta } from '../../models/Response';
import { InformesTecnicosResponse } from '../../models/pedidos/informes.tecnicos.response';

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

  obtenerPedidosMortalidad(id){
    this.pedido = new PedidosRequest(id);
    let json = JSON.stringify(this.pedido)
    let params = 'json=' + json;
    return this.userService
      .ejecutarQueryPost<PedidosResponse>('/api/movil/pedidosMortalidad', params)

  }

  registrarMortalidadInicial(mortalidad:Mortalidad ): Observable<any>{
    let json = JSON.stringify(mortalidad);
    let params = 'json=' + json;

    return this.userService.ejecutarQueryPost('/api/datos/mortalidad', params);
  }

  getReporteDiario($id){
    return this.userService.ejecutarQuery<MortalidadDiarioResponse>('/api/datos/mortalidad/reportediario/' + $id)
  }


  updateReportDiario(diario : DiarioRequest){
    let json = JSON.stringify(diario);
    let params = 'json=' + json;

    return this.userService.ejecutarQueryPost<Respuesta>('/api/datos/mortalidad/reportediario/update', params);
    
  }


  ObtenerReportesTecnicos(){

    return this.userService.ejecutarQuery<InformesTecnicosResponse>('/api/movil/despachos/obtenerpropios')

  }
  responseError(){
    this.userService.responseError();
  }
}
