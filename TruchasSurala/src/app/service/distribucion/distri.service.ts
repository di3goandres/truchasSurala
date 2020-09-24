import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { DistribucionResponse } from '../../models/distribucion.response';
import { DespachoNewResponse } from '../../models/despacho/despachonew.response';

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
  distribucionDespachoNew(idDespacho){
    return  this.userService.ejecutarQuery<DespachoNewResponse>('/api/Distribucion/DespachoNuevo/' + idDespacho);
   }
}
