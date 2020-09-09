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
}
