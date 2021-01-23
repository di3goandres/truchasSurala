import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FincaUserResponse } from '../../models/fincas/fincas.user.response';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FincasService {

  constructor(private userService: UserService) { }


  getFincasUser(): Observable<any> {
    return this.userService.ejecutarQuery<FincaUserResponse>('/api/usuarios/fincas');
  }

  getFincasUserAlevinos(): Observable<any> {
    return this.userService.ejecutarQuery<FincaUserResponse>('/api/usuarios/fincasAlevinos');
  }


  // this.json = JSON.stringify(user);
  // console.log(this.json);

  // this.params = 'json=' + this.json;
  // this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');



  // return this.http.post('/api/register', this.params, { headers: this.header });

  asociarFinca(data): Observable<any> {
    let json = JSON.stringify(data);
    let params = 'json=' + json;
    return this.userService.ejecutarQueryPost('/api/user/addfincas', params);
  }


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

}
