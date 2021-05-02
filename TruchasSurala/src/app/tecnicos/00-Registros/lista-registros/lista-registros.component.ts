import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { Usuario } from 'src/app/models/usuarios.fincas';
import { InformeService } from 'src/app/service/informe/informe.service';
import { InformeResp } from 'src/app/models/tecnicos/informes/informes.tecnicos.response';
import { ActualizarpdfinformeComponent } from '../../actualizarpdfinforme/actualizarpdfinforme.component';
import { SaveFile } from 'src/app/models/pedidos/guardar.pdf.response';
import { InformesTecnicosRequest } from 'src/app/models/tecnicos/informes/informes.tecnicos.request';

@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css']
})
export class ListaRegistrosComponent implements OnInit {

  displayedColumns: string[] = ['position', 'fecha_creacion','fecha_visita','usuario', 'identificacion', 'nombre',
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
    this.traerInformacion();

  }

  traerInformacion() {
    this.service.traerTodaInformacion().subscribe(
      OK => {
        this.informes = [];
        this.informes.push(...OK.informe)
        this.dataSource = new MatTableDataSource(OK.informe);
        this.seleccionado = null;
        this.dataSource.paginator = this.paginator
      },
      ERROR => { console.log(ERROR) },
    )
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

    console.log(this.informeUpdate)

    this.service.ActualizarInforme(this.informeUpdate).subscribe(
      OK => {
        this.reiniciarForumulario();
        this.service.Exitoso();
        console.log(OK)
      },
      ERROR => {

        this.service.NoExitoso("Lo sentimos", "No Hemos podido guardar el informe, intentalo nuevamente")

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


    this.traerInformacion()
    this.stepper.previous();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
