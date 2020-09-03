import { Component, OnInit, ViewChild } from '@angular/core';


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

    this.service.getFincasUser().subscribe(resp => {

      if (resp.status !== 'error') {

        this.datasourceusuarios = [];
        this.datasourceusuarios.push(...resp.userFincas);
        this.show = true;
        this.dataSource = new MatTableDataSource(this.datasourceusuarios);
        this.dataSource.paginator = this.paginator;


      }



    });
  }

  Cerrar(){
    this.activeModal.dismiss("Nothing")
  }
  seleccionar(element: UserFinca ){
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
