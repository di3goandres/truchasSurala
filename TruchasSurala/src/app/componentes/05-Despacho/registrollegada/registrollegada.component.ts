import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../service/user/user.service';
import { Despacho, DespachoRootObject } from '../../../models/despacho';
import { ModalregistrollegadaComponent } from '../modalregistrollegada/modalregistrollegada.component';
import { DespachoService } from '../../../service/despacho/despacho.service';

@Component({
  selector: 'app-registrollegada',
  templateUrl: './registrollegada.component.html',
  styleUrls: ['./registrollegada.component.css']
})
export class RegistrollegadaComponent implements OnInit {

  
  displayedColumns: string[] = ['position', 'Activo', 'FechaFactura', 'FechaSalida',
    'NumeroFactura', 'NumeroOvas',
    'Porcentaje', 'Editar'];

  public respuesta: DespachoRootObject;
  public dataSource = new MatTableDataSource<Despacho>();
  public actual: Despacho;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(
    private userService: UserService,
    private service: DespachoService,
    private modalService: NgbModal,
   

  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this. cargaInicial();
  }


  cargaInicial(){
   
    this.userService.getDespachos().subscribe(
      resp => {
               this.respuesta = resp;
        if (this.respuesta.status !== 'error') {
          this.dataSource = new MatTableDataSource(this.respuesta.despachos);
          this.actual = this.respuesta.despachos[0];
          this.dataSource.paginator = this.paginator;
     
        }


      },
      error => {
       

      });
  }
  ngOnInit(): void {
    this.actual = new Despacho();
    this.cargaInicial();
  }


  OpenEditar(element) {
    const modalRef = this.modalService.open(ModalregistrollegadaComponent, { size: 'lg' });
    modalRef.componentInstance.despacho = element;
    modalRef.result.then((result) => {
      
      if (result === "OK") {
        // this.cargaInicial();
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


  


}
