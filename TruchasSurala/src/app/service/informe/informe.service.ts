import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { InformesTecnicosRequest } from '../../models/tecnicos/informes/informes.tecnicos.request';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(
    private service: UserService
  ) { }

  guardar(informe: InformesTecnicosRequest){
    let json = JSON.stringify(informe);
    let params = 'json=' + json;
   

    return this.service.ejecutarQueryPost('/api/informestecnicos', params);
  }
}
