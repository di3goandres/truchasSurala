import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListausuariosComponent } from '../../../componentes/06-Pedidos/listausuarios/listausuarios.component';
import { UserFinca } from '../../../models/fincas/fincas.user.response';
import { SeleccionarusuarioComponent } from '../../../componentes/02-Usuario/05-modalusuario/seleccionarusuario/seleccionarusuario.component';
import { Usuario } from '../../../models/usuarios.fincas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AlevinosPedidos } from '../../../models/alevinos/alevinos.pedidos';

@Component({
  selector: 'app-montaje-pedido',
  templateUrl: './montaje-pedido.component.html',
  styleUrls: ['./montaje-pedido.component.css']
})
export class MontajePedidoComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  usuario: UserFinca;
  pedido: AlevinosPedidos
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,

  ) { 
    this.usuario = new UserFinca();
    this.pedido = new AlevinosPedidos();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 8);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      cantidad: ['', [Validators.min(200)]],
      talla: ['', [Validators.min(10), Validators.max(300), Validators.required]] , // gramos 
      fecha: ['', Validators.required]
    });
  }

  openUsuarios() {
    const modalRef = this.modalService.open(ListausuariosComponent, { size: 'xl' });
    modalRef.componentInstance.alevinos = "ALEVINOS"
    modalRef.result.then((result: UserFinca) => {
      if(result!=null){
        this.stepper.next()
        this.pedido = new AlevinosPedidos();
        this.usuario = result;
        this.pedido.idUserFinca =  this.usuario.id


      }

    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }

}
