import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../../models/users';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';
import { Observable } from 'rxjs';
import { UsuariosFincasResponse } from 'src/app/models/usuarios.fincas';

@Injectable({
  providedIn: 'root'
})
export class UsuarioappService {

  constructor(
    private userService: UserService

  ) { }


  Exitoso() {
    this.userService.registroExitoso();
  }

  NoExitoso(Titulo: string, Mensaje: string) {
    this.userService.registroNoExitoso(Titulo, Mensaje);
  }

  NoExitosoComun() {
    this.userService.registroNoExitosoComun();
  }


  MostrarSnack(Mensaje: string) {
    this.userService.openSnackBar(Mensaje, "");
  }

  guardarUsuarioSuarala(user: User){
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/user/surala/add', user);
  }

  getUsuarios(): Observable<UsuariosFincasResponse> {
    return this.userService.ejecutarQuery<UsuariosFincasResponse>('/api/users/surala/get');
  }


}
