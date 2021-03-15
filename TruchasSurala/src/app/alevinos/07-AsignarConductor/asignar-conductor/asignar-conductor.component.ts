import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatStepper } from '@angular/material/stepper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { Usuario } from '../../../models/Notificaciones/user.notificacion';

@Component({
  selector: 'app-asignar-conductor',
  templateUrl: './asignar-conductor.component.html',
  styleUrls: ['./asignar-conductor.component.css']
})
export class AsignarConductorComponent implements OnInit {
  conductor: Usuario
  @Input() entrada: AlevinosPedidos
  salida: AlevinosPedidos

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  firstFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: AlevinosService

  ) {

    this.conductor = new Usuario();
    this.salida = new AlevinosPedidos();

  }

  ngOnInit(): void {

    this.salida.id = this.entrada.id;

    this.firstFormGroup = this._formBuilder.group({
      temp_cargue: ['', [Validators.min(0), Validators.max(50), Validators.required]],
      alimento: ['', [Validators.required]],

      
    });
  }
  AsociarConductor(conductor: Usuario) {
    this.conductor = conductor;
    this.salida.conductor = this.conductor.id;
    this.stepper.next();
  }

  close() {
    this.activeModal.dismiss();
  }

  AsociarTemperatura() {
    this.service.AsociarConductor(this.salida).subscribe(
      OK => {
        console.log(OK)
        this.service.Exitoso();
        this.activeModal.close("OK");

      },
      ERROR => {
        this.service.NoExitosoComun();

        console.log(ERROR)
      },
    )

  }
}
