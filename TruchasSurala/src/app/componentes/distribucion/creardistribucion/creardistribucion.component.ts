import { DistribucionClass } from './../../../models/distribucion';
import { Pedido } from './../../../models/pedidos';
import { CajaDistribucion, BandejaDistribucion, } from './../../../models/datosDistribucion';
import { Component, OnInit, Input } from '@angular/core';
import { Grupocaja } from '../../../models/datosDistribucion';


@Component({
  selector: 'app-creardistribucion',
  templateUrl: './creardistribucion.component.html',
  styleUrls: ['./creardistribucion.component.css']
})
export class CreardistribucionComponent implements OnInit {

  @Input() cajas: Grupocaja[] = [];
  @Input() bandeja: BandejaDistribucion[] = [];

  @Input() idCaja: number;

  bandejaMostrar: BandejaDistribucion[] = [];

  @Input() pedido: Pedido;


  nuevaDistribucion: DistribucionClass;
  title: string;
  constructor() { }


  ngOnInit(): void {
    this.title = 'Agregar Distribución';
    this.nuevaDistribucion = new DistribucionClass(0,
      this.pedido.id, this.pedido.id_despacho, '',
      this.pedido.pedido, this.pedido.adicional, this.pedido.reposicion, 0, '', 1, '', '', '');
    this.onChange(this.idCaja);
    console.log('crear', this.idCaja);
  }


  onChange(id) {
    // tslint:disable-next-line: radix
    id = parseInt(id);
     console.log('onchange', id);

    this.bandejaMostrar = this.bandeja.filter(function (bandejas) {
      return bandejas.id_lote === id;
    });

    console.log(this.bandejaMostrar)
  }
  onAdd(formulario) {


    this.bandejaMostrar = this.bandeja.filter(function (bandejas) {
      return bandejas.id_lote === 1;
    });



  }



}
