import { Component, OnInit, Input } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-verfactura',
  templateUrl: './verfactura.component.html',
  styleUrls: ['./verfactura.component.scss'],
})
export class VerfacturaComponent implements OnInit {
  @Input() nombreFactura: string;
  @Input() idPedido: string;
  @Input() pdfSrc = "";


  options: DocumentViewerOptions = {
    title: 'Mi Factura'
  }
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private file: File,
    private fileTransfer: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private service: UserService

  ) { }

  ngOnInit() {
    console.log(this.nombreFactura)
    console.log(this.idPedido)


    this.pdfSrc = this.pdfSrc + this.idPedido + "/" + this.nombreFactura;
    console.log('ruta', this.pdfSrc)
    this.dowloadAndOpenPdf();
  }

  dowloadAndOpenPdf() {

    let downloadUrl = this.service.getURl() + this.pdfSrc;


    let path = this.file.dataDirectory;
    // if (this.file.checkFile(`${path}`, this.nombreFactura)) {
    //   console.log("Existe archivo")
    //   this.openlocalPdf(this.nombreFactura)
    // }
    // else {
    //   console.log("No Existe archivo")

    const transfer = this.fileTransfer.create();
    transfer.download(downloadUrl, `${path}` + this.nombreFactura).then(entry => {
      let url = entry.toURL();
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {})


      } else {
        this.fileOpener.open(url, 'application/pdf');

      }
    });
    // }



  }
  openlocalPdf(nombre) {
    let filePath = this.file.dataDirectory;

    if (this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, nombre, this.file.dataDirectory, `${fakeName}.pdf`).then(
        result => {
          this.fileOpener.open(result.nativeURL, 'application/pdf');
        }
      )

    } else {
      const options: DocumentViewerOptions = {
        title: 'Mi Factura'
      }
      this.document.viewDocument(`${filePath}/` + nombre, 'application/pdf', options)
    }
  }
  cerrar() {
    this.modalCtrl.dismiss("OK");
  }

}
