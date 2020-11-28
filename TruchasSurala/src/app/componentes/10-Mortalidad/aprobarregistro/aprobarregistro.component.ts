import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleMortalidadUsuario } from 'src/app/models/mortalidad/mortalidad.usuarios';
import { MortalidadAprobacionRequest } from '../../../models/mortalidad/mortalidad.aprobacion';
import { Select } from '../../../models/Datos.generales';
import { MortalidadService } from '../../../service/mortalidad/mortalidad.service';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../01-Comunes/registro-noexitoso/registro-noexitoso.component';

@Component({
  selector: 'app-aprobarregistro',
  templateUrl: './aprobarregistro.component.html',
  styleUrls: ['./aprobarregistro.component.css']
})
export class AprobarregistroComponent implements OnInit {

  @Input() Mortalidad: DetalleMortalidadUsuario
  firstFormGroup: FormGroup;
  aprobacion: Select[] = [
    { value: 'No Aprobada', viewValue: 'No Aprobada' },
    { value: 'Aprobada', viewValue: 'Aprobada' },
  ]
  Aprobado="Lamentamos que hayas pasado por esto, esta es la reposición aprobada."
  NoAprobado="Lamentamos que hayas pasado por esto, la reposición no fue aprobada nos comunicaremos contigo"

  request: MortalidadAprobacionRequest;
  constructor(private activeModal: NgbActiveModal,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private service: MortalidadService,
    private modalService: NgbModal,

  ) {

  }



  ngOnInit(): void {
    this.request = new MortalidadAprobacionRequest();
    this.request.id_mortalidad = this.Mortalidad.id_mortalidad;

    this.firstFormGroup = this._formBuilder.group({
      aprobado_Troutlodge: ['', [Validators.min(0), Validators.max(this.Mortalidad.total)]],
      aprobado_Surala: ['', [Validators.min(0), Validators.max(this.Mortalidad.total)]],
      estado: [Validators.required],

      Observaciones: [Validators.required],







    });
    this.MostrarValidaciones()
  }
  close() {
    this.activeModal.close("OK")
  }

  MostrarValidaciones() {
    if (this.Mortalidad.cantidad == 0) {
      this.openSnackBar("El Usuario no ha registrado la mortalidad diaria hasta el momento", "")
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  Aprobar() {
   
    
    this.service.Aprobar(this.request).subscribe(
      OK => {
      
        this.registroExitoso()
      },
      ERROR => {
       

        this.registroNoExitoso("Lo sentimos", "No Hemos podido guardar la aprobación, intentalo nuevamente")
      },
    )
  }

  registroExitoso() {
    this.close()
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
    
    }, (reason) => {

    });
  }

  registroNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  Cambio(event){
     if(event=="Aprobada"){
       this.request.Observaciones = this.Aprobado;
     }else{
      this.request.Observaciones = this.NoAprobado;

     }


  }
}


