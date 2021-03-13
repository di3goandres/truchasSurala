import { Component, OnInit } from '@angular/core';
import { MortalidadService } from '../../../service/mortalidad/mortalidad.service';

@Component({
  selector: 'app-descargar-mortalidades',
  templateUrl: './descargar-mortalidades.component.html',
  styleUrls: ['./descargar-mortalidades.component.css']
})
export class DescargarMortalidadesComponent implements OnInit {

  constructor(private service: MortalidadService) { }

  ngOnInit(): void {
  }

  descargar(){
    this.service.descargarMortalidades("Mortalidad");
   
  }
}
