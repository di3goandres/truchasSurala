import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';

@Component({
  selector: 'app-asignar-lote-alevinos',
  templateUrl: './asignar-lote-alevinos.component.html',
  styleUrls: ['./asignar-lote-alevinos.component.css']
})
export class AsignarLoteAlevinosComponent implements OnInit {
  @Input() entrada: AlevinosPedidos;
  pedido: AlevinosPedidos;
  firstFormGroup: FormGroup;


  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private serviceAlevino: AlevinosService,) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      loteOvas: ['', Validators.required],
      loteAlevinos: ['', Validators.required],
    });

    this.pedido = new AlevinosPedidos();
    this.pedido.id = this.entrada.id;
   
 
  }
  close() {
    this.activeModal.close("OK")
  }
  closeNOOK() {
    this.activeModal.dismiss();
  }

  Guardar(){
    this.close();
  }
  Calcular(){}

}
