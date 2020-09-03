import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../../models/pedidos';
import { UserService } from 'src/app/service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from '../../../service/pedidos/pedidos.service';

@Component({
  selector: 'app-editarpedido',
  templateUrl: './editarpedido.component.html',
  styleUrls: ['./editarpedido.component.css']
})
export class EditarpedidoComponent implements OnInit {

  @Input() pedido : Pedido;
   pedidoupdate = new  Pedido();

  constructor(
    private userService: PedidosService,
    private activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.pedidoupdate.id =  this.pedido.id;
    this.pedidoupdate.pedido =  this.pedido.pedido;
    this.pedidoupdate.porcentaje =  this.pedido.porcentaje;
    this.pedidoupdate.adicional =  this.pedido.adicional;
    this.pedidoupdate.reposicion =  this.pedido.reposicion;
    this.pedidoupdate.total =  this.pedido.total;
    this.pedidoupdate.nombre =  this.pedido.nombre;
    this.pedidoupdate.usuario =  this.pedido.usuario;



  }
  cerrar() {
    this.activeModal.dismiss();
  }
  registrarPedido(formulario): void {
    this.actualizar();

    this.userService.updatePedido(this.pedidoupdate).subscribe(
      response => {
        if (response.status == 'success') {
          formulario.reset();
      
          this.activeModal.close('OK');
        }
      },
      error => {
        console.log(error);

      }
    );


  }

  actualizar() {
    this.pedidoupdate.adicional = (this.pedidoupdate.pedido * this.pedidoupdate.porcentaje) / 100;
    this.pedidoupdate.total = this.pedidoupdate.adicional + this.pedidoupdate.reposicion + this.pedidoupdate.pedido;

  }
}
