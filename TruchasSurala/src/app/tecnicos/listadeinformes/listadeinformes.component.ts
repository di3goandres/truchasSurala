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

  public dataSource = new MatTableDataSource<InformeResp>();
  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  informes: InformeResp[] = []
  seleccionado: InformeResp;



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

  Ver(informe: InformeResp){
    this.seleccionado = informe;
    this.stepper.next()
  }
  VerInforme(tipo, informe: InformeResp) {


    const modalRef = this.modalService.open(ActualizarpdfinformeComponent, { size: 'lg' });
    modalRef.componentInstance.informe = informe
    modalRef.componentInstance.tipoInforme = tipo

  }
}
