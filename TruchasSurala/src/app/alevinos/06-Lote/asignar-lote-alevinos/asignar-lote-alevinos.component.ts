import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { LotesPropio } from 'src/app/models/alevinos/lotes.propio.response';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { SeleccionarLoteComponent } from '../seleccionar-lote/seleccionar-lote.component';

@Component({
  selector: 'app-asignar-lote-alevinos',
  templateUrl: './asignar-lote-alevinos.component.html',
  styleUrls: ['./asignar-lote-alevinos.component.css']
})
export class AsignarLoteAlevinosComponent implements OnInit {
  @Input() entrada: AlevinosPedidos;
  pedido: AlevinosPedidos;
  loteseleccionado: LotesPropio;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  firstFormGroup: FormGroup;


  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,

    private _formBuilder: FormBuilder,
    private serviceAlevino: AlevinosService,) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      // loteOvas: ['', Validators.required],
      loteAlevinos: ['', Validators.required],
    });
    this.loteseleccionado = new LotesPropio();
    this.pedido = new AlevinosPedidos();
    this.pedido.id = this.entrada.id;
  }
  close() {
    this.activeModal.close("OK")
  }
  closeNOOK() {
    this.activeModal.dismiss();
  }

  Guardar() {
    this.close();
  }
  Calcular() { }


  SeleccionarLote() {
    const modalRef = this.modalService.open(SeleccionarLoteComponent,
      {
        size: 'xl',
        windowClass: 'bounce-top'
      });
    modalRef.result.then((result: LotesPropio) => {
      console.log(result);
      this.loteseleccionado = result;
    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }
  AsociarLote(event) {
    this.loteseleccionado = event;
    this.stepper.next();
  }
}
