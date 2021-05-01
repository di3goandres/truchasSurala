import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../../models/Notificaciones/user.notificacion';
import { NotificarService } from '../../../../service/notificaciones/notificar.service';
import { EnvioNotificacion } from '../../../../models/Notificaciones/Notificacion.request';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-usuarios-notificar',
  templateUrl: './usuarios-notificar.component.html',
  styleUrls: ['./usuarios-notificar.component.css']
})
export class UsuariosNotificarComponent implements OnInit {

  @Output() notificado = new EventEmitter<Usuario>();
  @Input() seleccionarData: boolean
  @Input() titulo = "";
  source: Usuario[] = [];

  @Input() set filtro(value: string) {

  
    
    if (value == "TODOS") {
      this.dataSource = new MatTableDataSource(this.source);

    } else {
      let filtrado = this.source.filter(item =>
        item.nombre == value)
        this.dataSource = new MatTableDataSource(filtrado);
    }
 
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['position', 'nombre', 'apellidos', 'mail', 'numeroIdentificacion'];
  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  constructor(
    private service: NotificarService,
  ) { }

  ngOnInit(): void {
    this.consultarUsuarios();
    if (this.seleccionarData) {
      this.displayedColumns.push('seleccionar');
    }
  }

  consultarUsuarios() {
    this.service.ObtenerUsuariosActual().subscribe(
      OK => {
        if (OK.status !== 'error') {

          this.source = [];
          this.source.push(...OK.usuarios);

          if (OK.usuarios == null || OK.usuarios.length == 0) {
            this.service.MostrarSnack("No hay usuarios logueados en la aplicación")
          } else {

            this.service.MostrarSnack("Actualmente hay  " + OK.usuarios.length + " usuarios conectados ")
          }
          this.dataSource = new MatTableDataSource(this.source);
          this.dataSource.paginator = this.paginator;

        }

      },
      ERROR => { this.service.NoExitosoComun() },

    )
  }
  seleccionar(element: Usuario) {

    this.notificado.emit(element)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
