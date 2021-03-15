import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { AlevinosPedidos, AlevinosPedidosRequest, AlevinosPedidosResponse, A_DiaDespachoRequest, A_ProgramacionDiaRequest } from '../../models/alevinos/alevinos.pedidos';
import { ProgramacionAlevinosResponse, ProgramacionAlevinos } from '../../models/alevinos/programacion.alevinos';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';
import { LotesPropio, LotesPropiosResponse } from '../../models/alevinos/lotes.propio.response';
import { ComplementoPedido } from 'src/app/models/alevinos/alevinos.agregar';
import { UsuariosFincasResponse } from 'src/app/models/usuarios.fincas';

@Injectable({
  providedIn: 'root'
})
export class AlevinosService {

  constructor(
    private userService : UserService
  ) { }

  Exitoso(){
    this.userService.registroExitoso();
  }

  NoExitoso(Titulo, Mensaje){
    this.userService.registroNoExitoso(Titulo, Mensaje);
  }

  NoExitosoComun(){
    this.userService.registroNoExitosoComun();
  }
  MostrarSnack(Mensaje: string, Action: string ){
    this.userService.openSnackBar(Mensaje, Action);
  }

  guardarPedido(data: AlevinosPedidosRequest){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Alevinos', data)
  }


  /// get
  consultarProgramacion(){
    return this.userService.ejecutarQuery<ProgramacionAlevinosResponse>('/api/Programacion/Alevinos')
  }

  ///post
  GuardarDiaDespacho(data: A_DiaDespachoRequest){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Programacion/Alevinos', data)
  }

  consultarPedidosUsuario(id: number){
    return this.userService.ejecutarQuery<AlevinosPedidosResponse>('/api/Programacion/Alevinos/usuario/' + id)
  }

  consultarPedidosPendientes(data: A_ProgramacionDiaRequest){
    return this.userService.ejecutarQueryPostNuevo<AlevinosPedidosResponse>('/api/Programacion/Alevinos/usuario/pendientes', data)
  }

  consultarPedidosConductor(data: A_ProgramacionDiaRequest){
    return this.userService.ejecutarQueryPostNuevo<AlevinosPedidosResponse>('/api/Programacion/Alevinos/usuario/conductor/pendientes', data)
  }

  despacharDia(data: ProgramacionAlevinos){
    return this.userService.ejecutarQueryPostNuevo<AlevinosPedidosResponse>('/api/Programacion/Alevinos/despacho/despachar', data)
  }
  
  borrarPedidosUsuario(id: number){
    return this.userService.ejecutarQuery<Respuesta>('/api/Programacion/Alevinos/usuario/delete/' + id)
  }

  ActualizarPedido(data: AlevinosPedidos){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Programacion/Alevinos/usuario/pedido/actualizar', data)

  }

  Propios(){
    return this.userService.ejecutarQuery<LotesPropiosResponse>('/api/Programacion/lotes/propios/')
  }

  PropiosListos(){
    return this.userService.ejecutarQuery<LotesPropiosResponse>('/api/Programacion/lotes/propios/listos/')
  }
  UpdatePropios(data: LotesPropio){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Programacion/lotes/propios/update', data)
  }


  AsociarPedido(data: ComplementoPedido){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Programacion/lotes/propios/asociar', data)

  }


  desAsociarPedido(data: AlevinosPedidos){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Programacion/lotes/propios/desasociar', data)

  }


  AsociarConductor(data: AlevinosPedidos){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Programacion/Alevinos/usuario/conductor/asociar', data)

  }

  getConductores() {
    return this.userService.ejecutarQuery<UsuariosFincasResponse>('/api/users/surala/get');
  }
}
