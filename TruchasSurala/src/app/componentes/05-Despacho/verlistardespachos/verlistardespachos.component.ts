import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { DespachoRootObject, Despacho } from 'src/app/models/despacho';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistribuciongloballistComponent } from '../../03-Distribucion/distribuciongloballist/distribuciongloballist.component';
import { EditardespachoComponent } from '../editardespacho/editardespacho.component';

@Component({
  selector: 'app-verlistardespachos',
  templateUrl: './verlistardespachos.component.html',
  styleUrls: ['./verlistardespachos.component.css']
})
export class VerlistardespachosComponent implements OnInit , OnChanges {


  displayedColumns: string[] = ['position', 'Activo', 'FechaFactura', 'FechaSalida',
    'NumeroFactura', 'NumeroOvas',
    'Porcentaje', 'Editar', 'VerDespacho', 'VerPedidos', 'VerDistribucion'];

  public respuesta: DespachoRootObject;
  public dataSource = new MatTableDataSource<Despacho>();
  public actual: Despacho;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this. cargaInicial();
  }


  cargaInicial(){
    this.userService.getDespachos().subscribe(
      resp => {

        console.log(resp)
        this.respuesta = resp;



        if (this.respuesta.status !== 'error') {


          this.dataSource = new MatTableDataSource(this.respuesta.despachos);
          this.actual = this.respuesta.despachos[0];
          this.dataSource.paginator = this.paginator;
          // this.changeDetectorRefs.detectChanges();
        }


      });
  }
  ngOnInit(): void {
    this.actual = new Despacho();
    this.cargaInicial();
  }

  openDistribucion(id) {
    const modalRef = this.modalService.open(DistribuciongloballistComponent, { size: 'lg' });
    modalRef.componentInstance.idDespacho = id;
    modalRef.result.then((result) => {
      if (result === "OK") {
        //  this.openExitoso();
        //  this.cargaInicial()
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  OpenEditar(element) {
    const modalRef = this.modalService.open(EditardespachoComponent, { size: 'lg' });
    modalRef.componentInstance.despacho = element;
    modalRef.result.then((result) => {
      
      if (result === "OK") {
        this.cargaInicial();
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


}
