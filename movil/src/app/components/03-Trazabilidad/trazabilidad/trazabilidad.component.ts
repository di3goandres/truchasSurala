import { Component, OnInit, Input } from '@angular/core';
import { Distribucion, InfoDespacho, Contacto, InfoDespachoMostrar } from '../../../models/trazabilidad/trazabilidad.response';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.scss'],
})
export class TrazabilidadComponent implements OnInit {
  numeroBandejas: number;

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

  validarNumeroCajas() {

    let conteo = 1;
    this.bandejas = this.bandejas.sort((a, b) => (a.Cantidad > b.Cantidad) ? 1 : ((b.Cantidad > a.Cantidad) ? -1 : 0));
    let agrego = false;

    conteo = this.bandejas.length;

    this.bandejas.forEach(element => {
      conteo--;
      this.MAXIMO = this.MAXIMO + element.Cantidad;
      if (this.contacto.Maximo == this.MAXIMO) {
        this.bandejasMostrar.push(new InfoDespachoMostrar(this.MAXIMO.toString(), "1", "1"))
        this.MAXIMO = 0;
        agrego = true;
      }
      if (this.contacto.Maximo > this.MAXIMO) {
        agrego = false
      } else {
        this.MAXIMO = this.MAXIMO - element.Cantidad;
        this.bandejasMostrar.push(new InfoDespachoMostrar(this.MAXIMO.toString(), "1", "1"))
        this.bandejasMostrar.push(new InfoDespachoMostrar(element.Cantidad.toString(), "1", "1"))
        this.MAXIMO = 0;
        agrego = true;
      }



      if (conteo == 0 && agrego == false) {
        if (this.MAXIMO > 0)
          this.bandejasMostrar.push(new InfoDespachoMostrar(this.MAXIMO.toString(), "1", "1"))
        this.MAXIMO = 0;
        agrego = true;
      }



    });

    this.numeroBandejas = this.bandejasMostrar.length
    this.bandejasMostrar = []

  }
  ponerCajas() {
    this.validarNumeroCajas();
    this.ponerHielo();
    let conteo = 0;
    this.bandejas = this.bandejas.sort((a, b) => (a.Cantidad > b.Cantidad) ? 1 : ((b.Cantidad > a.Cantidad) ? -1 : 0));
    let agrego = false;
    let ultimohielo = false;
    conteo = this.bandejas.length;

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
      } else {
        this.MAXIMO = this.MAXIMO - element.Cantidad;
        this.ponerValor(this.MAXIMO.toString())
        if (this.numeroBandejas == 4) {
          ultimohielo = this.ponerHieloAtiempo(3);
  
        }else if(this.numeroBandejas == 7){
          ultimohielo = this.ponerHieloAtiempo(5);
  
        }
        else {
          ultimohielo = this.ponerHieloAtiempo(4);
        }
        this.ponerValor(element.Cantidad.toString())
        this.MAXIMO = 0;
        agrego = true;
      }



      if (conteo == 0 && agrego == false) {
        if (this.MAXIMO > 0)
          this.ponerValor(this.MAXIMO.toString())

        this.MAXIMO = 0;
        agrego = true;
      }
      if (this.numeroBandejas == 4) {
        ultimohielo = this.ponerHieloAtiempo(3);

      }else if(this.numeroBandejas == 7){
        ultimohielo = this.ponerHieloAtiempo(5);

      }
      else {
        ultimohielo = this.ponerHieloAtiempo(4);
      }

    });
    if (!ultimohielo)
      this.ponerHielo()

    this.ponerVacia()
  }


  ponerHieloAtiempo(value) {
    if (this.bandejasMostrar.length % value == 0) {
      this.ponerHielo()
      return true;
    } else {
      return false;
    }
  }
  ponerVacia() {
    this.bandejasMostrar.push(new InfoDespachoMostrar("BANDEJA VACIA", this.bandejasMostrar.length + 1, "1"))

  }
  ponerValor(valor: string) {
    this.bandejasMostrar.push(new InfoDespachoMostrar(valor, this.bandejasMostrar.length + 1, "1"))
  }
  ponerHielo() {
    this.bandejasMostrar.push(new InfoDespachoMostrar("HIELO", this.bandejasMostrar.length + 1, "1"))
  }
}
