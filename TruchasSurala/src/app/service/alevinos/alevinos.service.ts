import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { AlevinosPedidos } from '../../models/alevinos/alevinos.pedidos';
import { ProgramacionAlevinosResponse } from '../../models/alevinos/programacion.alevinos';

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

  guardarPedido(data: AlevinosPedidos){
    return this.userService.ejecutarQueryPostNuevo('/api/Alevinos', data)
  }


  consultarProgramacion(){
    return this.userService.ejecutarQuery<ProgramacionAlevinosResponse>('/api/Progamacion/Alevinos/')
  }
}
