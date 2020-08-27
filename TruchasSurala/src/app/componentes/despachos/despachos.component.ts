import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { DespachoRootObject, Despacho } from 'src/app/models/despacho';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistribuciongloballistComponent } from '../03-Distribucion/distribuciongloballist/distribuciongloballist.component';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  displayedColumns: string[] = ['position','Activo', 'FechaFactura', 'FechaSalida',
  'NumeroFactura', 'NumeroOvas',
  'Porcentaje',  'VerDespacho', 'VerPedidos','VerDistribucion'];

  public respuesta: DespachoRootObject;
  public dataSource = new MatTableDataSource<Despacho>();
  public actual: Despacho;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(
    private userService: UserService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.actual = new Despacho();
    this.userService.getDespachos().subscribe(
      resp => {
      
        console.log(resp)
      this.respuesta = resp;
     
     
     
      if (this.respuesta.status !== 'error') {

        
        this.dataSource = new MatTableDataSource(this.respuesta.despachos);
        this.actual = this.respuesta.despachos[0];
        this.dataSource.paginator = this.paginator;

      }


    });
  }

  openDistribucion(id){
    const modalRef = this.modalService.open(DistribuciongloballistComponent, {size: 'lg'});
    modalRef.componentInstance.idDespacho =id;
   modalRef.result.then((result) => {
     if(result==="OK"){
      //  this.openExitoso();
      //  this.cargaInicial()
     }
    
   }, (reason) => {
    
     if (reason === 'OK') {
    
      
     }
   });
  }


}
