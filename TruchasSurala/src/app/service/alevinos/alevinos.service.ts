import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { AlevinosPedidos, AlevinosPedidosRequest } from '../../models/alevinos/alevinos.pedidos';
import { ProgramacionAlevinosResponse } from '../../models/alevinos/programacion.alevinos';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';

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
  MostrarSnack(Mensaje: string){
    this.userService.openSnackBar(Mensaje, "");
  }

  guardarPedido(data: AlevinosPedidosRequest){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Alevinos', data)
  }


  consultarProgramacion(){
    return this.userService.ejecutarQuery<ProgramacionAlevinosResponse>('/api/Progamacion/Alevinos/')
  }
}
