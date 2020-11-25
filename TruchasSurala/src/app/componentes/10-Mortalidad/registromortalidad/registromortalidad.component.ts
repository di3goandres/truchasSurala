import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Respuestas, RegistroDiario } from 'src/app/models/mortalidad/mortalidad.detalle';
import { Registro } from 'src/app/models/mortalidad/mortalidad.response';
import { DetalleMortalidadUsuario } from 'src/app/models/mortalidad/mortalidad.usuarios';
import { MortalidadService } from '../../../service/mortalidad/mortalidad.service';

@Component({
  selector: 'app-registromortalidad',
  templateUrl: './registromortalidad.component.html',
  styleUrls: ['./registromortalidad.component.css']
})
export class RegistromortalidadComponent implements OnInit {
  registros: Registro[];
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  displayedColumns: string[] = ['position', 'fecha', 'total_ovas', 'numero_ovas',
    'ovas_regalo', 'ovas_adicionales',
    'ovas_reposicion', 'cantidad', 'porcentaje', 'detalle'];

  displayedColumnsRegistros: string[] = ['position', 'fecha', 'nombre', 'finca',
    'total', 'cantidad', 'porcentaje', 'detalle'];
  public dataSource = new MatTableDataSource<Registro>();
  public dataSourceDetalle = new MatTableDataSource<DetalleMortalidadUsuario>();

  public actual: Registro;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  detalleUsuarios: DetalleMortalidadUsuario[];

  // Pantalla 3
  Respuestas : Respuestas;
  RegistroDiario: RegistroDiario[];
  fotos: any[];
  displayedColumnsDias: string[] = ['dia', 'cantidad', 'registrado']
  constructor(
    private service: MortalidadService
  ) { }

  ngOnInit(): void {
    this.cargainicial();
  }

  cargainicial() {
    this.service.traerInformacion().subscribe(
      OK => {

        this.registros = [];
        this.registros.push(...OK.registros)
        this.dataSource = new MatTableDataSource(this.registros);
        this.dataSource.paginator = this.paginator;
      },
      ERROR => { console.log(ERROR) },
    )
  }

  VerRegistros(registro: Registro) {
    this.service.traerRegistros(registro.id).subscribe(
      OK => {
        console.log(OK)

        this.detalleUsuarios = [];
        this.detalleUsuarios.push(...OK.detalleUsuarios)
        this.dataSourceDetalle = new MatTableDataSource(this.detalleUsuarios);
        this.dataSourceDetalle.paginator = this.paginator;
        this.stepper.next()

      },
      ERROR => { console.log(ERROR) },
    )
  }

  usuario: DetalleMortalidadUsuario;
  VerDetalle(usuario: DetalleMortalidadUsuario) {
    this.usuario = usuario;
    this.service.traerRegistrosDiarios(usuario.id_mortalidad).subscribe(
      OK => {
        console.log(OK)
        this.Respuestas = OK.Respuestas;
        this.RegistroDiario = [];
        this.RegistroDiario.push(...OK.RegistroDiario)
        this.stepper.next()
      },
      ERROR => { console.log(ERROR) },
    )
  }

}
