import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../../models/Notificaciones/user.notificacion';
import { NotificarService } from '../../../../service/notificaciones/notificar.service';
import { EnvioNotificacion } from '../../../../models/Notificaciones/Notificacion.request';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-envio-general',
  templateUrl: './envio-general.component.html',
  styleUrls: ['./envio-general.component.css']
})
export class EnvioGeneralComponent implements OnInit {
  firstFormGroup: FormGroup;
  displayedColumns: string[] = ['position', 'nombre', 'apellidos', 'mail', 'numeroIdentificacion', 'seleccionar'];
  dataSource = new MatTableDataSource<Usuario>();
  datasourceusuarios: Usuario[] = [];
  notificacion = new EnvioNotificacion();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    private service: NotificarService,
    private _formBuilder: FormBuilder,

  ) {

    this.firstFormGroup = this._formBuilder.group({
      Titulo: ['', Validators.required],
      Mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.consultarUsuarios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  consultarUsuarios() {
    this.service.ObtenerUsuariosRegistrados().subscribe(
      OK => {
        if (OK.status !== 'error') {

          this.datasourceusuarios = [];
          this.datasourceusuarios.push(...OK.usuarios);

          if (OK.usuarios == null || OK.usuarios.length == 0) {
            this.service.MostrarSnack("No hay usuarios logueados en la aplicación")
          } else {

            this.service.MostrarSnack("Actualmente hay  " + OK.usuarios.length + " usuarios conectados ")
          }
          this.dataSource = new MatTableDataSource(this.datasourceusuarios);
          this.dataSource.paginator = this.paginator;

        }

      },
      ERROR => { this.service.NoExitosoComun() },

    )
  }

  seleccionar(element: Usuario) {
    this.notificacion.usuario = element.id
    console.log( this.notificacion.usuario)

    this.stepper.next()

  }

  Volver() {

    this.stepper.previous

  }

  Notificar() {

    this.service.enviarNotificacionPersonalizadaUsuario(this.notificacion).subscribe(
      OK => {
        this.service.Exitoso();
      },
      ERROR => {
        this.service.NoExitosoComun();

      },
    )
  }

}
