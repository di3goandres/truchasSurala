import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicamentos } from 'src/app/models/productos/medicamentos/medicamentos';
import { Guias, Politicas } from '../../models/guias/guias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  constructor(
    private http: HttpClient,
  ) { }

  getGuias() {
    return this.http.get<Guias[]>('./assets/data/Guias/guias.json');
  }
  
  getPoliticas(){
    return this.http.get<Politicas>('./assets/data/mortalidad/politicas.json');
  }
}
