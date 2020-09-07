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
  pdfSrc = "/api/pedido/factura/1599326274cedulaPDF.pdf";
  options: DocumentViewerOptions = {
    title: 'Mi Factura'
  }
  constructor( public modalCtrl: ModalController) { }

  ngOnInit() {
 

  }

  cerrar(){
    this.modalCtrl.dismiss("OK");
  }

}
