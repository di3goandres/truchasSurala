import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { EstadisticaResponse } from '../../models/estadistica/estadistica.response';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(
    private userService: UserService
  ) { }

  getEstadisticaMes(){
    return  this.userService.ejecutarQuery<EstadisticaResponse>('/api/estadistica/mensual/');
   }
}
