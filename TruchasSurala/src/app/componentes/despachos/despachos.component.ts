import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { DespachoRootObject, Despacho } from 'src/app/models/despacho';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  displayedColumns: string[] = ['position','Activo', 'FechaFactura', 'FechaSalida',
  'NumeroFactura', 'NumeroOvas',
  'Porcentaje',  'VerDespacho', 'VerPedidos'];

  public respuesta: DespachoRootObject;
  public dataSource = new MatTableDataSource<Despacho>();
  public actual: Despacho;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.actual = new Despacho();
    this.userService.getDespachos().subscribe(
      resp => {
      
      this.respuesta = resp;
     

     
      if (this.respuesta.status !== 'error') {

        
        this.dataSource = new MatTableDataSource(this.respuesta.despachos);
        this.actual = this.respuesta.despachos[0];
        this.dataSource.paginator = this.paginator;

      }


    });
  }



}
