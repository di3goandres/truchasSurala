import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/models/Notificaciones/rutas.response';
import { NotificarService } from '../../../service/notificaciones/notificar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EnvioNotificacion } from '../../../models/Notificaciones/Notificacion.request';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../01-Comunes/registro-noexitoso/registro-noexitoso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-envionotificaciones',
  templateUrl: './envionotificaciones.component.html',
  styleUrls: ['./envionotificaciones.component.css']
})
export class EnvionotificacionesComponent implements OnInit {
  firstFormGroup: FormGroup;
  selected = new FormControl('valid', [
    Validators.required
  ]);

  notificacion = new EnvioNotificacion();
  rutas: Ruta[] = []
  constructor(
    private service: NotificarService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
  ) {

    this.firstFormGroup = this._formBuilder.group({
      Titulo: ['', Validators.required],
      Mensaje: ['', Validators.required],
      Ruta: ['', Validators.required],


    });

  }

  ngOnInit(): void {
    this.cargarRutas();
  }

  cargarRutas() {
    this.service.obtenerRutasDisponibles(10).subscribe(
      OK => {

        this.rutas = [];
        if (OK.rutas != null) {
          let TODAS = new Ruta()
          TODAS.nombre = "TODOS"
          this.rutas.push(TODAS);
          this.rutas.push(...OK.rutas)
          console.log(this.rutas)
        } else {
          let rutaSin = new Ruta()
          rutaSin.nombre = "Sin Usuarios Registrados en este Despacho"
          this.rutas.push(rutaSin);
          console.log(this.rutas)

        }

      },
      ERROR => { console.log(ERROR) },
    )
  }


  Notificar() {
    console.log(this.notificacion);
    this.service.enviarNotificacionPersonalizada(this.notificacion).subscribe(
      OK => { 
        this.registroExitoso()
      },
      ERROR => { 

        this.registroNoExitoso("Ohhh", "No hemos podido procesar tu solicitud, intentalo nuevamente")

       },
    )
  }


  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
     
    }, (reason) => {

      if (reason === 'OK') {


      }
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2200,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
