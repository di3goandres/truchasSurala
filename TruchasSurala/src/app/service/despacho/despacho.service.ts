import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Despacho, Despachosroot } from '../../models/despacho';
import { Observable } from 'rxjs';
import { SaveFile } from '../../models/pedidos/guardar.pdf.response';
import { DespachoLlegada } from '../../models/despacho.response';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';

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


  postFile(fileToUpload: SaveFile): Observable<any> {
  
 
    let json = JSON.stringify(fileToUpload);
    let params = 'json=' + json;
 
    return this.userService.ejecutarQueryPost('/api/despacho/subirarchivo', params);

  }
  getDespacho(id = null) {
    return this.userService.ejecutarQuery<Despachosroot>('/api/Despacho/' + id);
  }
  borrarLote(id) {
    return this.userService.ejecutarQuery<Despachosroot>('/api/Lotes/borrar/' + id);
  }


  registrarLlegada(data: DespachoLlegada){
  
 
    let json = JSON.stringify(data);
    let params = 'json=' + json;
 
    return this.userService.ejecutarQueryPostRetorno<Respuesta>('/api/movil/despachos/registrarLlegada', params);

  }

  
}
