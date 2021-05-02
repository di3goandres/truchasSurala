import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuestas, RegistroDiario } from 'src/app/models/mortalidad/mortalidad.detalle';
import { Registro } from 'src/app/models/mortalidad/mortalidad.response';
import { DetalleMortalidadUsuario } from 'src/app/models/mortalidad/mortalidad.usuarios';
import { MortalidadService } from '../../../service/mortalidad/mortalidad.service';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';
import { AprobarregistroComponent } from '../aprobarregistro/aprobarregistro.component';
import { RegistroNoexitosoComponent } from '../../01-Comunes/registro-noexitoso/registro-noexitoso.component';
import { UserService } from 'src/app/service/user/user.service';

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

  // datos usuario
  public identity;
  public token;
  public role;
  permitirAprobar = false;


  constructor(
    private service: MortalidadService,
    private modalService: NgbModal,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.cargainicial();
    this.loadUser();
  
  }


  loadUser(): void {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.role = this.userService.getRole();
    this.validarEnvioMensajes();
  }

  validarEnvioMensajes(){
    if(this.role =="ADMIN" || this.role =="OVAS"){
    
       this.permitirAprobar =true;
    }
 
   
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


  abrirAprobacion(){
    this.usuario
    const modalRef = this.modalService.open(AprobarregistroComponent, { size: 'md' });
    modalRef.componentInstance.Mortalidad = this.usuario;

    modalRef.result.then((result) => {
      
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  registroExitoso() {
   
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
}
