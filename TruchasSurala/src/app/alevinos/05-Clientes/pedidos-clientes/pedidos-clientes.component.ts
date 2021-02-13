import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { Usuario } from 'src/app/models/usuarios.fincas';
import { SeleccionarusuarioComponent } from '../../../componentes/02-Usuario/05-modalusuario/seleccionarusuario/seleccionarusuario.component';
import { AlevinosService } from '../../../service/alevinos/alevinos.service';

@Component({
  selector: 'app-pedidos-clientes',
  templateUrl: './pedidos-clientes.component.html',
  styleUrls: ['./pedidos-clientes.component.css']
})
export class PedidosClientesComponent implements OnInit {
  usuario: Usuario;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  DatosPedidos: AlevinosPedidos[] = [];
  PedidosOK: AlevinosPedidos[] = [];

  firstFormGroup: FormGroup;

  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private service: AlevinosService


  ) {

    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }
  Agregar() {

  }

  openUsuarios() {
    const modalRef = this.modalService.open(SeleccionarusuarioComponent, { size: 'xl' });
    modalRef.componentInstance.Todos = "ALEVINOS"

    modalRef.result.then((result: Usuario) => {
      this.DatosPedidos = [];
      this.PedidosOK = [];
      this.usuario = result;
      this.stepper.next();

      this.traerInformacion();
    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }

  traerInformacion() {
    this.DatosPedidos = [];
    this.PedidosOK = [];
    this.service.consultarPedidosUsuario(this.usuario.id).subscribe(
      OK => {
        console.log(OK);
        if (OK.code == 200) {
          this.DatosPedidos = [];
          this.PedidosOK = [];

          this.DatosPedidos.push(...OK.alevinosPedidos);
          this.PedidosOK.push(...OK.despachados);


        }
      },
      ERROR => { console.log(ERROR); },
    );
  }

  onNotificar(event) {
    if(event){
      this.traerInformacion();
    }
    console.log(event);
  }
}
