import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-borrarlote',
  templateUrl: './borrarlote.component.html',
  styleUrls: ['./borrarlote.component.css']
})
export class BorrarloteComponent implements OnInit {



  subtitle ="Confirmación Borrado"
  TituloMOstrar ="¿Estas seguro de borrar esta caja?";
  constructor(
    public activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {
 
     
  
  }

  cerrar(){
    this.activeModal.dismiss();
  }
  borrar(){
    this.activeModal.close("BORRAR");
  }

}
