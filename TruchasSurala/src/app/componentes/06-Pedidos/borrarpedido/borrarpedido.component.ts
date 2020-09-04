import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-borrarpedido',
  templateUrl: './borrarpedido.component.html',
  styleUrls: ['./borrarpedido.component.css']
})
export class BorrarpedidoComponent implements OnInit {

  @Input() borrarPedido: boolean;
  titilePedido="¿Estas seguro de borrar este pedido? ten encuenta que se borrara la trazabilidad, si esta ya fue creada";
  titilePedidoyTrazabilidad="¿Estas seguro de borrar la trazabilidad?";
  subtitle =";"
  TituloMOstrar ="";
  constructor(
    public activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {
 
      this.TituloMOstrar = this.borrarPedido ? this.titilePedido : this.titilePedidoyTrazabilidad
      this.subtitle = this.borrarPedido ? "Confirmación Borrado del pedido" : "Confirmación Borrado de trazabilidad"

  
  }

  cerrar(){
    this.activeModal.dismiss();
  }
  borrar(){
    this.activeModal.close("BORRAR");
  }

}
