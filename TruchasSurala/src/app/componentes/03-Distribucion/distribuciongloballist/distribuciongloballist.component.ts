import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DistribucionResponse, InfoR, MostrarDistribucionTotal, DistribucionR } from 'src/app/models/distribucion.response';
import { NestedTreeControl } from '@angular/cdk/tree';
import { UserService } from 'src/app/service/user/user.service';
import { DistriService } from '../../../service/distribucion/distri.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-distribuciongloballist',
  templateUrl: './distribuciongloballist.component.html',
  styleUrls: ['./distribuciongloballist.component.css']
})
export class DistribuciongloballistComponent implements OnInit {

  
  distribuciones: DistribucionResponse;
  mostrar: InfoR[] = []
  distribuciontotal: MostrarDistribucionTotal[] = []
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  displayedColumns: string[] = ['position', 'Nombre', 'Cantidad', 'Bandeja'];
  treeControl = new NestedTreeControl<InfoR>(node => node.childrend);
  dataSource = new MatTableDataSource<InfoR>();
  //InfoR[] = []

  @Input() idDespacho: number;
  constructor(
  private distriService: DistriService
  ) { }

  ngOnInit(): void {


    this.obtenerListaDistribucion();

  }

  hasChild = (_: number, node: DistribucionR) => !!node.InfoDespacho && node.InfoDespacho.length > 0;


  calcularCajas() {
    let children: InfoR[] = [];
    let Todos: InfoR[] = [];
    let index = 1;
    this.distribuciones.distribucion.forEach(item => {
      item.InfoDespacho.forEach(element => {
        children.push(
          new InfoR(
            element.Cantidad,
            element.caja_numero,
            element.bandeja_numero,
            element.Cantidad/element.ovas_ml))
      });
     let nuevoItem = new InfoR(item.contacto.Total_enviado, 0, 0, 0, children)
      nuevoItem.Nombre = item.contacto.Cliente
      nuevoItem.Finca = item.contacto.Finca

      Todos.push(nuevoItem);
      let conteo = 0;
      Todos.forEach(item=> {
        conteo+=1;
        item.position = conteo;
      })
      children = [];


    });

   console.log('Todos', Todos)
    this.dataSource =new MatTableDataSource(Todos)
    this.dataSource.paginator = this.paginator;

  }

  private obtenerListaDistribucion() {
    this.distriService.distribucionDespacho(this.idDespacho).subscribe(
      response => {


        console.log('En lista', response);

        // if(response.status!=='error'){
          this.distribuciones = response
        
          if (this.distribuciones.distribucion.length > 0) { this.calcularCajas() }
          console.log('Distribuciones', this.distribuciones)
        // }
       


      },
      error => { });
  }


}
