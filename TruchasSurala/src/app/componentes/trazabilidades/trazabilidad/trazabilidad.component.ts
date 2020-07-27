import { Component, OnInit, Input } from '@angular/core';
import { DistribucionTrazabilidad, Contacto } from '../../../models/Trazabilidad';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css']
})
export class TrazabilidadComponent implements OnInit {

  @Input() traza: DistribucionTrazabilidad;
  contacto: Contacto;
  Lote: string;
  Fecha: string;
  lineaGenetica: string;
  edad:number;
  Tamanio: number;
  ovas_ml: number;
  Facturado: number;
  constructor() { }

  ngOnInit(): void {
    
    this.contacto = this.traza.contacto;
    this.traza.trazabilidad.forEach(info => {
      this.Lote = info.NumLote;
      this.Fecha= info.Fechadesove;
      this.lineaGenetica = info.LineaGenetica;
      this.edad = info.edad;
      this.Tamanio = info.tamanio;
      this.ovas_ml = info.ovas_ml
      this.Facturado = info.Facturado
    });
  }

}
