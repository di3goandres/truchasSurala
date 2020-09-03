import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Despacho } from '../../models/despacho';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespachoService {

  constructor(
    private userService: UserService
  ) { }

  updateDespacho(despacho: Despacho): Observable<any> {
    let json = JSON.stringify(despacho);
    let params = 'json=' + json;
    return this.userService.ejecutarQueryPost('/api/despacho/actualizar', params);
   }
}
