import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { RutasResponse } from '../../models/Notificaciones/rutas.response';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';
import { EnvioNotificacion } from '../../models/Notificaciones/Notificacion.request';
import { UserNotificacion } from '../../models/Notificaciones/user.notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificarService {

  constructor(
    private userService: UserService
  ) { }


  obtenerRutasDisponibles(id) {

    return this.userService.ejecutarQuery<RutasResponse>('/api/Notificaciones/RutasActual/' + id );
  }


  enviarNotificacionPersonalizada(data: EnvioNotificacion){
    let json = JSON.stringify(data);
    let params = 'json=' + json;
    return this.userService.ejecutarQueryPostRetorno<Respuesta>('/api/Notificaciones/personalizado' , params );

    
  }

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

  ObtenerUsuariosRegistrados() {

    return this.userService.ejecutarQuery<UserNotificacion>('/api/usuarios/notificaciones' );
  }

  ObtenerUsuariosActual() {

    return this.userService.ejecutarQuery<UserNotificacion>('/api/usuarios/despacho/actual/notificaciones');
  }

  enviarNotificacionPersonalizadaUsuario(data: EnvioNotificacion){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/Notificaciones/unico/personalizado' , data );
  }

}
