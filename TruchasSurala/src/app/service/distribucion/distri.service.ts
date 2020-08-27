import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { DistribucionResponse } from '../../models/distribucion.response';

@Injectable({
  providedIn: 'root'
})
export class DistriService {
  constructor(
    private userService: UserService

  ) { }


  distribucionDespacho(idDespacho){
   return  this.userService.ejecutarQuery<DistribucionResponse>('/api/Distribucion/Despacho/' + idDespacho);
  }
}
