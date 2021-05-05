import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArchivosAlevinos } from 'src/app/models/alevinos/alevinos.archivos';
import { VerfacturaComponent } from '../../02-Pedidos/verfactura/verfactura.component';

@Component({
  selector: 'app-lista-documentos-alevinos',
  templateUrl: './lista-documentos-alevinos.component.html',
  styleUrls: ['./lista-documentos-alevinos.component.scss'],
})
export class ListaDocumentosAlevinosComponent implements OnInit {

  _Archivos: ArchivosAlevinos[];
  _Id_Numero_Lote: number;

  @Input() existe: boolean;
  @Input() nombre: string;
  @Input() set Id_Numero_Lote(value: number) {
    this._Id_Numero_Lote = value;
  }

  @Input() set Archivos(value: ArchivosAlevinos[]) {
    if (value != null) {
      this._Archivos = []

      this._Archivos = value

      if (this._Archivos.length > 0)
        this.noMostrar = false;

    }

  }
  noMostrar = true;
  constructor(
    public viewCtrl: ModalController,
  ) { }

  ngOnInit() {

    console.log(this._Id_Numero_Lote)
  }

  async ver(item: ArchivosAlevinos) {


    const modal = await this.viewCtrl.create({
      component: VerfacturaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'nombreFactura': item.nombre,
        'idPedido': item.id_archivo,
        'pdfSrc': '/api/Programacion/Alevinos/pedido/pdf/'

      }
    });
    return await modal.present();


  }

  async CertificadoOrigen() {


    const modal = await this.viewCtrl.create({
      component: VerfacturaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'nombreFactura': this.nombre,
        'idPedido': this._Id_Numero_Lote,
        'pdfSrc': '/api/despacho/alevinos/certificado/',
        'Unparametro': true

      }
    });
    return await modal.present();


  }

}
