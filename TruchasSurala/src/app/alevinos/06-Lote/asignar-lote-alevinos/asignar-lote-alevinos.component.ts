import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { LotesPropio } from 'src/app/models/alevinos/lotes.propio.response';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { SeleccionarLoteComponent } from '../seleccionar-lote/seleccionar-lote.component';
import { ComplementoPedido } from '../../../models/alevinos/alevinos.agregar';

@Component({
  selector: 'app-asignar-lote-alevinos',
  templateUrl: './asignar-lote-alevinos.component.html',
  styleUrls: ['./asignar-lote-alevinos.component.css']
})
export class AsignarLoteAlevinosComponent implements OnInit {
  @Input() entrada: AlevinosPedidos;
  @Input() Despacho: number;

  pedido: AlevinosPedidos;
  loteseleccionado: LotesPropio;
  complementoPedido: ComplementoPedido;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  firstFormGroup: FormGroup;


  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,

    private _formBuilder: FormBuilder,
    private serviceAlevino: AlevinosService,) { }

  ngOnInit(): void {
    this.complementoPedido = new ComplementoPedido();
    this.complementoPedido.id_despacho = this.Despacho
    this.complementoPedido.id_pedido = this.entrada.id;

    this.firstFormGroup = this._formBuilder.group({
      // loteOvas: ['', Validators.required],
      loteAlevinos: ['', Validators.required],
      tratamientos: ['', Validators.required],
      duracion: ['', Validators.required],
      cantidadAlevinos: ['', [Validators.required, Validators.max(this.entrada.cantidad)]],
      peso: ['', [Validators.required, Validators.min(0), Validators.max(3000)]],
      talla: [{ value: '' }, [Validators.min(0), Validators.max(50), Validators.required]],




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
    this.serviceAlevino.AsociarPedido(this.complementoPedido).subscribe(
      OK => {
        console.log(OK)
        this.close();
      },
      ERROR => { console.log(ERROR) },
    )
    console.log(this.complementoPedido);

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
      this.complementoPedido.id_lote = this.loteseleccionado.id;
    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }
  AsociarLote(event) {
    this.loteseleccionado = event;
    this.complementoPedido.id_lote = this.loteseleccionado.id;

    this.stepper.next();
    console.log(this.complementoPedido);
  }
}
