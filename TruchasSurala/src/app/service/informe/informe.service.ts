import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { InformesTecnicosRequest } from '../../models/tecnicos/informes/informes.tecnicos.request';
import { InformesResponse } from '../../models/tecnicos/informes/informes.tecnicos.response';

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

  //Verifica la existencia de un reporte
  verificarExisteInforme(id, fecha){
    return this.service.ejecutarQuery('/api/movil/despacho/reporte/existe/' + id + '/' + fecha);
  }


  traerInformacion(id){
    return this.service.ejecutarQuery<InformesResponse>('/api/movil/despacho/reporte/informes/' + id);
  }

  ActualizarInforme(informe: InformesTecnicosRequest){
    let json = JSON.stringify(informe);
    let params = 'json=' + json;
   

    return this.service.ejecutarQueryPost('/api/informestecnicos/actualizar', params);
  }
}
