import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ConteoTrazabilidad, MetodoConteo } from 'src/app/models/conteo/conteo.trazabilida';

@Component({
  selector: 'app-reportar-traza',
  templateUrl: './reportar-traza.component.html',
  styleUrls: ['./reportar-traza.component.scss'],
})
export class ReportarTrazaComponent implements OnInit {
  formCantidad: FormGroup;
  formMilllitros: FormGroup;
  cantidadreportada: number= 0;
  mililitroreportada: number= 0;

  @Input() traza: ConteoTrazabilidad;
  @Input() metodo: MetodoConteo;
  constructor(
    public viewCtrl: ModalController,
  ) { }

  ngOnInit() {

    this.formCantidad = new FormGroup({
      cantidadReportada: new FormControl('', [Validators.min(1), Validators.max(this.traza.total_ovas_enviadas)]),
    });

    this.formMilllitros = new FormGroup({
      mililitros: new FormControl('', [Validators.min(1), Validators.required]),
      cantidadReportadaM: new FormControl('', [ Validators.required,Validators.min(1), Validators.max(this.traza.total_ovas_enviadas)]),

    });

    this.cantidadreportada = this.traza.cantidad_reportada;
   }


  Guardar(){
    var x = this.cantidadreportada;
    var y: number = +x;
    this.traza.cantidad_reportada = y
    this.viewCtrl.dismiss( this.traza, "OK");

  }

  dismiss(){
    
    this.viewCtrl.dismiss( this.traza, "NOK");

  }


  Calcular(){

    this.cantidadreportada = Math.round(this.traza.ovas_ml * this.mililitroreportada)
  }

}
