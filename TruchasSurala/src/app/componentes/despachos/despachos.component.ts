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

  displayedColumns: string[] = ['position','Activo', 'FechaFactura', 
  'NumeroFactura', 'NumeroOvas',
  'Porcentaje',  'VerDespacho', 'VerPedidos'];

  public respuesta: DespachoRootObject;
  public dataSource = new MatTableDataSource<any>();;
  public actual: Despacho;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.userService.getDespachos().subscribe(
      resp => {
      // console.log('noticias', resp );
      this.respuesta = resp;
      // console.log(resp);
      if (this.respuesta.status !== 'error') {

        
        this.dataSource = new MatTableDataSource(this.respuesta.despachos);
        this.actual = this.respuesta.despachos[0];
    //    this.despachos =  this.despachos.sort();


        return;
      }


    });
  }
  // tslint:disable-next-line: typedef


}
