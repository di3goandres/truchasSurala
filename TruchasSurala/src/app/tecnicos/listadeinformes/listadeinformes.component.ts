import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFinca } from '../../models/fincas/fincas.user.response';
import { ListausuariosComponent } from '../../componentes/06-Pedidos/listausuarios/listausuarios.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeleccionarusuarioComponent } from '../../componentes/02-Usuario/05-modalusuario/seleccionarusuario/seleccionarusuario.component';
import { Usuario } from '../../models/usuarios.fincas';
import { InformeService } from '../../service/informe/informe.service';
import { MatTableDataSource } from '@angular/material/table';
import { InformeResp } from '../../models/tecnicos/informes/informes.tecnicos.response';
import { MatPaginator } from '@angular/material/paginator';
import { ActualizarpdfinformeComponent } from '../actualizarpdfinforme/actualizarpdfinforme.component';
import { MatStepper } from '@angular/material/stepper';
import { SaveFile } from '../../models/pedidos/guardar.pdf.response';
import { InformesTecnicosRequest } from '../../models/tecnicos/informes/informes.tecnicos.request';
import { RegistroNoexitosoComponent } from '../../componentes/01-Comunes/registro-noexitoso/registro-noexitoso.component';
import { RegistroExitosoComponent } from '../../componentes/01-Comunes/registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-listadeinformes',
  templateUrl: './listadeinformes.component.html',
  styleUrls: ['./listadeinformes.component.css']
})
export class ListadeinformesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'fecha_visita', 'nombre',
    'observaciones', 'seleccionar'];
  usuario: Usuario;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ObservacionesNuevas = ""
  fileInformeTecnico = new SaveFile();
  filePsr = new SaveFile();
  fileHistopatologia = new SaveFile();
  fileNutricional = new SaveFile();
  Actualizar = false;
  public dataSource = new MatTableDataSource<InformeResp>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  informes: InformeResp[] = []
  seleccionado: InformeResp;

  informeUpdate = new InformesTecnicosRequest();

  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private service: InformeService,

  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      observaciones: ['', Validators.required],
    })
    this.dataSource = new MatTableDataSource(this.informes);
    this.dataSource.paginator = this.paginator

  }

  traerInformacion() {
    this.service.traerInformacion(this.usuario.id).subscribe(
      OK => {
        this.informes = [];
        this.informes.push(...OK.informe)
        this.dataSource = new MatTableDataSource(OK.informe);
        this.seleccionado = null;
        this.dataSource.paginator = this.paginator
        this.stepper.next()
      },
      ERROR => { console.log(ERROR) },
    )
  }
  openUsuarios() {
    const modalRef = this.modalService.open(SeleccionarusuarioComponent, { size: 'xl' });
    modalRef.result.then((result: Usuario) => {
      this.usuario = result;
      this.traerInformacion()
    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }

  Ver(informe: InformeResp) {
    this.seleccionado = informe;
    this.ObservacionesNuevas = informe.observaciones
    this.stepper.next()
    this.Actualizar = false;

  }
  VerInforme(tipo, informe: InformeResp) {


    const modalRef = this.modalService.open(ActualizarpdfinformeComponent, { size: 'lg' });
    modalRef.componentInstance.informe = informe
    modalRef.componentInstance.tipoInforme = tipo

    modalRef.result.then((result: SaveFile) => {

      console.log('es un tipo', result.tipo)
      switch (tipo) {

        case 1:
          this.fileInformeTecnico = result;
          break;
        case 2:
          this.filePsr = result;
          this.seleccionado.archivo_pcr = result.nombre
          this.Actualizar = true;
          break;
        case 3:
          this.fileHistopatologia = result;
          this.seleccionado.histopatologia = result.nombre
          this.Actualizar = true;
          break;
        case 4:
          this.fileNutricional = result;
          this.seleccionado.laboratorioNutricional = result.nombre
          this.Actualizar = true;
          break;

      }

    }, (reason) => {

    });

  }

  actualizarInforme() {
    this.informeUpdate.id = this.seleccionado.id;
    this.informeUpdate.finca_id = this.seleccionado.finca_id;
    this.informeUpdate.observaciones = this.ObservacionesNuevas;
    this.informeUpdate.user_id = this.seleccionado.user_id;

    this.informeUpdate.informes = []

    if (this.fileInformeTecnico.file.length > 0) {
      // actualizar el informe tecnico
      this.informeUpdate.informes.push(this.fileInformeTecnico);
    }

    if (this.filePsr.file.length > 0) {
      // actualizar el informe tecnico
      this.informeUpdate.informes.push(this.filePsr);

    }
    if (this.fileHistopatologia.file.length > 0) {
      // actualizar el informe tecnico
      this.informeUpdate.informes.push(this.fileHistopatologia);

    }
    if (this.fileNutricional.file.length > 0) {
      // actualizar el informe tecnico
      this.informeUpdate.informes.push(this.fileNutricional);
    }


    this.service.ActualizarInforme(this.informeUpdate).subscribe(
      OK => {
        this.reiniciarForumulario();
        this.registroExitoso();

      },
      ERROR => {

        this.registroNoExitoso("Lo sentimos", "No Hemos podido guardar el informe, intentalo nuevamente")

      },
    )

  }

  ActivarActualizar() {

    if (this.ObservacionesNuevas != this.seleccionado.observaciones) {
      this.Actualizar = true;

    } else {
      this.Actualizar = false;

    }
  }

  reiniciarForumulario() {
    this.informeUpdate = new InformesTecnicosRequest();

    this.fileInformeTecnico = new SaveFile();
    this.filePsr = new SaveFile();
    this.fileHistopatologia = new SaveFile();
    this.fileNutricional = new SaveFile();

    this.Actualizar = false;
    this.stepper.reset();


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
