import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';

@Component({
  selector: 'app-lista-pedido-alevinos',
  templateUrl: './lista-pedido-alevinos.component.html',
  styleUrls: ['./lista-pedido-alevinos.component.css']
})
export class ListaPedidoAlevinosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'FechaSalida', 'Semana',
    'dia', 'talla', 'peso', 'cantidad'];
  entrada: AlevinosPedidos[] = [];
  @Input() set id(value: AlevinosPedidos[]) {


    this.entrada = [];
    this.entrada.push(...value);
    this.dataSource = new MatTableDataSource(this.entrada);
    this.dataSource.paginator = this.paginator
  }

  public dataSource = new MatTableDataSource<AlevinosPedidos>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

}
