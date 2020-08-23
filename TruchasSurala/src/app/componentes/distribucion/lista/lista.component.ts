import { Component, OnInit, Input } from '@angular/core';
import { Distribucion } from '../../../models/distribucion';
import { UserService } from '../../../service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DistribucionResponse, MostrarDistribucion, MostrarDistribucionTotal, DistribucionR, InfoDespacho, InfoR } from '../../../models/distribucion.response';
import { Caja } from '../../../models/despacho';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  distribuciones: DistribucionResponse;
  mostrar: InfoR[] = []
  distribuciontotal: MostrarDistribucionTotal[] = []

  displayedColumns: string[] = ['position', 'Cantidad', 'Bandeja'];
  treeControl = new NestedTreeControl<InfoR>(node => node.childrend);
  dataSource: InfoR[] = []

  @Input() idPedido: number;
  constructor(
    private userService: UserService,
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
            element.bandeja_numero))
      });

      Todos.push(new InfoR(item.contacto.Total_enviado, 0, 0, children));
      children = [];





    });

    console.log(Todos);
    this.dataSource = Todos;
    //   var groups =  this.distribuciontotal.reduce(function(obj,item){
    //     obj[item.numeroCaja] = obj[item.numeroCaja]  || [];
    //     obj[item.numeroCaja].push(item);
    //     return obj;
    // }, {});


    // var myArray = Object.keys(groups).map(function(key){
    //     return {team: key, name: groups[key]};
    // });
    //   let numerosBandejas:number[]=[];
    //   let cajaNumero: number;
    //   let total: number;
    // myArray.forEach(element => {

    //   element.name.forEach(item => {
    //     numerosBandejas.push(item.bandeja_numero);
    //     total = item.cantidad ;
    //     cajaNumero = item.numeroCaja;
    //   });

    //   this.mostrar.push(new InfoR(1, total, cajaNumero, numerosBandejas))
    //   numerosBandejas = [];

    // });



  }

  private obtenerListaDistribucion() {
    this.userService.getDistribucion(this.idPedido).subscribe(
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
