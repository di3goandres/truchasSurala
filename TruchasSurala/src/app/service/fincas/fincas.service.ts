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
}
