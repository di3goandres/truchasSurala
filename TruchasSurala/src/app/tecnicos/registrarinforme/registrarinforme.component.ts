import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListausuariosComponent } from '../../componentes/06-Pedidos/listausuarios/listausuarios.component';
import { UserFinca } from '../../models/fincas/fincas.user.response';
import { InformesTecnicosRequest } from '../../models/tecnicos/informes/informes.tecnicos.request';
import { AsociarinformesComponent } from '../asociarinformes/asociarinformes.component';
import { SaveFile } from '../../models/pedidos/guardar.pdf.response';

import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformeService } from '../../service/informe/informe.service';
import { MatStepper } from '@angular/material/stepper';
import { RegistroExitosoComponent } from '../../componentes/01-Comunes/registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-registrarinforme',
  templateUrl: './registrarinforme.component.html',
  styleUrls: ['./registrarinforme.component.css']
})
export class RegistrarinformeComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  color: ThemePalette;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  fecha: Date;
  colorCheck = "colorCheck";
  informe = new InformesTecnicosRequest();
  usuario = new UserFinca();
  fileInformeTecnico = new SaveFile();
  filePsr = new SaveFile();
  fileHistopatologia = new SaveFile();
  continuarGuardar = false;


  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: InformeService


  ) {
    this.color = 'primary'
    this.minDate = new Date();
    this.maxDate = new Date();
    this.fecha = new Date();
    this.minDate.setDate(this.minDate.getDate() - 60);
    this.maxDate.setDate(this.maxDate.getDate());

  }


  activarFormulario() {
    const stakeControl = this.firstFormGroup.get('finca');


    if (this.usuario.id != 0) {
      stakeControl.setValidators([Validators.nullValidator]);


    } else {
      stakeControl.setValidators([Validators.required]);

    }
    stakeControl.updateValueAndValidity();


  }


  desactivar() {
    const stakeControl = this.thirdFormGroup.get('fileInforme');
    stakeControl.setValidators([Validators.nullValidator]);
    stakeControl.updateValueAndValidity();


  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
    });


    this.secondFormGroup = this._formBuilder.group({
      fecha: ['', Validators.required],
      observaciones: ['', Validators.required],


    })
    this.thirdFormGroup = this._formBuilder.group({
      fileInforme: ['', Validators.required],



    })
  }

  openUsuarios() {
    const modalRef = this.modalService.open(ListausuariosComponent, { size: 'lg' });

    modalRef.result.then((result: UserFinca) => {
      console.log(result);
      //  this.pedido.id_finca = result.id
      this.usuario = result;
      this.informe.cedula = this.usuario.numeroIdentificacion;
      this.informe.finca_id = this.usuario.id;

      this.activarFormulario()
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
     this.reiniciarForumulario()
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2200,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  AsociarInforme(tipo) {
    if (this.fileInformeTecnico.file.length == 0 && tipo != 1) {
      this.openSnackBar("Recuerda Asociar el Informe Técnico", 'De Acuerdo!');

    } else {
      this.openSnackBar("Los informes de PSR e Histologia son Opcionales", 'wooo!');

    }

    const modalRef = this.modalService.open(AsociarinformesComponent, { size: 'lg' });
    modalRef.componentInstance.tipoInforme = tipo

    switch (tipo) {

      case 1:
        modalRef.componentInstance.file = this.fileInformeTecnico
        break;
      case 2:
        modalRef.componentInstance.file = this.filePsr;
        break;
      case 3:
        modalRef.componentInstance.file = this.fileHistopatologia
        break;

    }



    modalRef.result.then((result) => {

      switch (tipo) {

        case 1:
          this.fileInformeTecnico = result;
          this.continuarGuardar = true;
          this.desactivar();
          break;
        case 2:
          this.filePsr = result;
          break;
        case 3:
          this.fileHistopatologia = result;
          break;

      }

    }, (reason) => {

    });

  }

  Guardar() {
    this.informe.informes = [];
    console.log(this.informe)

    if (this.fileInformeTecnico.file.length != 0) {
      this.informe.informes.push(this.fileInformeTecnico);
    }
    if (this.filePsr.file.length != 0) {
      this.informe.informes.push(this.filePsr);
    }
    if (this.fileHistopatologia.file.length != 0) {
      this.informe.informes.push(this.fileHistopatologia);
    }

    this.service.guardar(this.informe).subscribe(
      OK => {
    
        this.reiniciarForumulario()

        this.registroExitoso();

      },
      ERROR => { console.log(ERROR) },
    )

  }

  reiniciarForumulario() {
    this.informe = new InformesTecnicosRequest();
    this.usuario = new UserFinca();
    this.fileInformeTecnico = new SaveFile();
    this.filePsr = new SaveFile();
    this.fileHistopatologia = new SaveFile();
    this.continuarGuardar = false;
    this.myStepper.reset();
    this.activarFormulario()

  }
}
