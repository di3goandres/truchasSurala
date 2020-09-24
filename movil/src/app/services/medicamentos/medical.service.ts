import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicamentos } from '../../models/productos/medicamentos/medicamentos';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  constructor(
    private http: HttpClient,
  ) { }

  getMedicamentos() {
    return this.http.get<Medicamentos[]>('./assets/medicamentos/dataMedicamento.json');
  }
}
