import { Component, OnInit, Input } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { NavParams, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-verfactura',
  templateUrl: './verfactura.component.html',
  styleUrls: ['./verfactura.component.scss'],
})
export class VerfacturaComponent implements OnInit {
  @Input() nombreFactura: string;
  @Input() idPedido: string;

  pdfSrc = "/api/pedido/factura/";
  options: DocumentViewerOptions = {
    title: 'Mi Factura'
  }
  constructor( public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.nombreFactura)
    console.log(this.idPedido)

 
    this.pdfSrc = this.pdfSrc + this.idPedido +  "/" + this.nombreFactura;

  }

  cerrar(){
    this.modalCtrl.dismiss("OK");
  }

}
