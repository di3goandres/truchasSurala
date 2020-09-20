import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Medicamentos } from '../../../models/productos/medicamentos/medicamentos';
import { MedicalService } from '../../../services/medicamentos/medical.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
})
export class MedicamentosPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  tipo = '';
  mostrar = true;
  medicamentos: Observable<Medicamentos[]> 
  constructor(

    private service: MedicalService
  ) { }


  cargarMedicamentos() {
   
    this.medicamentos = this.service.getMedicamentos()
    this.tipo = 'Suplementos Alimenticios'
    this.mostrar = false;

  }

  ngOnInit() {
    this.cargarMedicamentos()


  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  segmentChange(event) {
    const valorSegmento = event.detail.value;
    this.tipo = valorSegmento;
    console.log(valorSegmento);
  }
}
