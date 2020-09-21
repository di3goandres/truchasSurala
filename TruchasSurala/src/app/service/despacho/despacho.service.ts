import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Despacho } from '../../models/despacho';
import { Observable } from 'rxjs';
import { SaveFile } from '../../models/pedidos/guardar.pdf.response';

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
}
