import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListausuariosComponent } from '../../../componentes/06-Pedidos/listausuarios/listausuarios.component';
import { UserFinca } from '../../../models/fincas/fincas.user.response';
import { SeleccionarusuarioComponent } from '../../../componentes/02-Usuario/05-modalusuario/seleccionarusuario/seleccionarusuario.component';
import { Usuario } from '../../../models/usuarios.fincas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AlevinosPedidos } from '../../../models/alevinos/alevinos.pedidos';
import { AlevinosService } from '../../../service/alevinos/alevinos.service';
import { Select } from '../../../models/Datos.generales';

@Component({
  selector: 'app-montaje-pedido',
  templateUrl: './montaje-pedido.component.html',
  styleUrls: ['./montaje-pedido.component.css']
})
export class MontajePedidoComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  TipoCompra: Select[] = [
    { value: 'TALLA', viewValue: 'TALLA' },
    { value: 'PESO', viewValue: 'PESO' }

  ]
  usuario: UserFinca;
  pedido: AlevinosPedidos
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private serviceAlevino: AlevinosService

  ) {
    this.usuario = new UserFinca();
    this.pedido = new AlevinosPedidos();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 60);
  }
  Cambio(value) {
    console.log(value);
    const stakeTalla = this.secondFormGroup.get('talla');
    const stakePeso = this.secondFormGroup.get('Peso');
    if (value == "TALLA") {
      this.serviceAlevino.MostrarSnack("Mínimo 1, Máximo 50 Centimetros");

      stakeTalla.enable();
      stakePeso.disable()

    } else if (value == "PESO") {
      this.serviceAlevino.MostrarSnack("Mínimo 10, Máximo 3.000 gramos");


      stakeTalla.disable();
      stakePeso.enable()
    }

    stakeTalla.updateValueAndValidity();
    stakePeso.updateValueAndValidity();



  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      cantidad: ['', [Validators.min(200)]],
      Peso: [{ value: '', disabled: true }, [Validators.min(10), Validators.max(3000), Validators.required],], // gramos 
      talla: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(50), Validators.required]], // centimetros 

      fecha: ['', Validators.required],
      tipo: ['', Validators.required],


    });
  }

  openUsuarios() {
    const modalRef = this.modalService.open(ListausuariosComponent, { size: 'xl' });
    modalRef.componentInstance.alevinos = "ALEVINOS"
    modalRef.result.then((result: UserFinca) => {
      if (result != null) {
        this.stepper.next()
        this.pedido = new AlevinosPedidos();
        this.usuario = result;
        this.pedido.idUserFinca = this.usuario.id


      }

    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }

  guardar() {
    console.log(this.pedido);

    this.serviceAlevino.guardarPedido(this.pedido).subscribe(
      OK => { console.log(OK)

        this.serviceAlevino.Exitoso();

       },
      ERROR => { console.log(ERROR)
      
        this.serviceAlevino.NoExitosoComun();
      
      
      },
    )
  }

  setStakeValidators(): void {


  }
}
