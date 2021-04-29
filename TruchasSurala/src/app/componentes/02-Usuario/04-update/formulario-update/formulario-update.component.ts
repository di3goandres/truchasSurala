import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-update',
  templateUrl: './formulario-update.component.html',
  styleUrls: ['./formulario-update.component.css']
})
export class FormularioUpdateComponent implements OnInit {

  @Input() idUsuario: number;

  @Input() perfil: string = "";
  @Input() correo: string = "";


  constructor() { }

  ngOnInit(): void {
    console.log(this.perfil)
  }

}
