import { Component, Input, OnInit, ViewChild } from '@angular/core';


import { FincasService } from '../../../service/fincas/fincas.service';
import { UserFinca } from 'src/app/models/fincas/fincas.user.response';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  @Input() alevinos: any;
  datasourceusuarios: UserFinca[] = [];

  pedidoMinimo: number;
  show: boolean;
  urlPeticion: string;
  displayedColumns: string[] = ['position', 'nombre', 'numeroIdentificacion',
    'nombreFinca',
    'Ubicacion', 'seleccionar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<UserFinca>();
  selectedValue: number;
  constructor(
    private service: FincasService,
    private activeModal: NgbActiveModal,


  ) { }

  ngOnInit(): void {
    this.consultar()
  }

  consultar() {

    if (this.alevinos != null) {
      this.service.getFincasUserAlevinos().subscribe(
        OK => {
          if (OK.status !== 'error') {

            this.datasourceusuarios = [];
            this.datasourceusuarios.push(...OK.userFincas);
            this.show = true;
            this.dataSource = new MatTableDataSource(this.datasourceusuarios);
            this.dataSource.paginator = this.paginator;

          }

        },
        ERROR => { this.service.NoExitosoComun() },
      )
    } else {
      this.service.getFincasUser().subscribe(
        OK => {
          if (OK.status !== 'error') {
            console.log(OK.userFincas);
            this.datasourceusuarios = [];
            this.datasourceusuarios.push(...OK.userFincas);
            this.show = true;
            this.dataSource = new MatTableDataSource(this.datasourceusuarios);
            this.dataSource.paginator = this.paginator;


          }

        },
        ERROR => { this.service.NoExitosoComun() },
      )
    }



  }

  Cerrar() {
    this.activeModal.dismiss("Nothing")
  }
  seleccionar(element: UserFinca) {
    this.activeModal.close(element)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
