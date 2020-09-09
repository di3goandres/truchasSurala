import { Component, OnInit, Input } from '@angular/core';
import { Distribucion, InfoDespacho, Contacto, InfoDespachoMostrar } from '../../../models/trazabilidad/trazabilidad.response';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.scss'],
})
export class TrazabilidadComponent implements OnInit {

  @Input() traza: Distribucion;

  bandejas: InfoDespacho[];
  bandejasMostrar: InfoDespachoMostrar[] = [];

  contacto: Contacto;
  Lote: string;
  Fecha: string;
  lineaGenetica: string;
  edad: number;
  MAXIMO: number = 0;


  Tamanio: number;
  ovas_ml: number;
  constructor() { }

  ngOnInit(): void {

    this.contacto = this.traza.contacto;

    this.bandejas = this.traza.InfoDespacho;
    this.traza.trazabilidad.forEach(info => {
      this.Lote = info.NumLote;
      this.Fecha = info.Fechadesove.replace(' 00:00:00', '');
      this.lineaGenetica = info.LineaGenetica;
      this.edad = info.edad;
      this.Tamanio = info.tamanio;
      this.ovas_ml = info.ovas_ml

    });
    this.ponerCajas();
  }

  ponerCajas() {
    this.bandejasMostrar.push(new InfoDespachoMostrar("HIELO", this.bandejasMostrar.length + 1, "1"))
    let conteo = 1;

    this.bandejas.sort((a, b) => b.Cantidad - a.Cantidad)
    let agrego = false;
    let ultimohielo = false;

    conteo = this.bandejas.length;
    console.log(this.bandejas)
    this.bandejas.forEach(element => {
      conteo--;

      this.MAXIMO = this.MAXIMO + element.Cantidad;


      if (this.contacto.Maximo == this.MAXIMO) {
        this.bandejasMostrar.push(new InfoDespachoMostrar(this.MAXIMO.toString(), this.bandejasMostrar.length + 1, "1"))
        this.MAXIMO = 0;
        agrego = true;

      }
      if (this.contacto.Maximo > this.MAXIMO) {
        agrego = false

      }else{
        this.MAXIMO = this.MAXIMO - element.Cantidad;
        this.bandejasMostrar.push(new InfoDespachoMostrar(this.MAXIMO.toString(), this.bandejasMostrar.length + 1, "1"))
        if (this.bandejasMostrar.length % 4 == 0) {

          this.bandejasMostrar.push(new InfoDespachoMostrar("HIELO", this.bandejasMostrar.length + 1, "1"))
          ultimohielo = true;
        } else {
          ultimohielo = false;
        }
        this.bandejasMostrar.push(new InfoDespachoMostrar(element.Cantidad.toString(),this.bandejasMostrar.length + 1, "1"))
        this.MAXIMO = 0;
        agrego = true;

      }

     

      if (conteo == 0 && agrego == false) {
        if (this.MAXIMO > 0)
          this.bandejasMostrar.push(new InfoDespachoMostrar(this.MAXIMO.toString(), this.bandejasMostrar.length + 1, "1"))
        this.MAXIMO = 0;
        agrego = true;
      }

      if (this.bandejasMostrar.length % 4 == 0) {

        this.bandejasMostrar.push(new InfoDespachoMostrar("HIELO", this.bandejasMostrar.length + 1, "1"))
        ultimohielo = true;
      } else {
        ultimohielo = false;
      }

    });
    if (!ultimohielo)
      this.bandejasMostrar.push(new InfoDespachoMostrar("HIELO", this.bandejasMostrar.length + 1, "1"))

    this.bandejasMostrar.push(new InfoDespachoMostrar("BANDEJA VACIA", this.bandejasMostrar.length + 1, "1"))
  }


}
