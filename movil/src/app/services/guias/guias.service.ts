import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicamentos } from 'src/app/models/productos/medicamentos/medicamentos';
import { Guias } from '../../models/guias/guias';

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
}
