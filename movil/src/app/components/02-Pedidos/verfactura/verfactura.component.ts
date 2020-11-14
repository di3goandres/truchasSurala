import { Component, OnInit, Input } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { UserService } from '../../../services/user.service';
import { LogoutService } from '../../../services/users/logout.service';
@Component({
  selector: 'app-verfactura',
  templateUrl: './verfactura.component.html',
  styleUrls: ['./verfactura.component.scss'],
})
export class VerfacturaComponent implements OnInit {
  @Input() nombreFactura: string;
  @Input() idPedido: string;
  @Input() pdfSrc = "";
  mostrar = false;

  tipo = '';
  enabled: true
  options: DocumentViewerOptions = {
    email: {
      enabled: true
    },
    print: {
      enabled: true
    },
    openWith: {
      enabled: true

    }
  }
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private file: File,
    private fileTransfer: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private service: UserService,
    private modalService: LogoutService,


  ) { }

  ngOnInit() {

    this.modalService.openModal()
    var filter = ['pwa', 'desktop', 'mobileweb'];
    var platformfilter = []

    this.platform.platforms().forEach(element => {

      this.tipo = this.tipo + '-' + element
    });
    let platforms = this.platform.platforms().filter(function (item) {
      for (var key in filter) {

        if (item == filter[key])
          platformfilter.push(item);
      }

    });



    this.pdfSrc = this.pdfSrc + this.idPedido + "/" + this.nombreFactura;


     if (platformfilter.length == 0) {
    this.dowloadAndOpenPdf();

    } else {
      this.mostrar = true;

    }
    this.modalService.cerrarModal()

  }

  async dowloadAndOpenPdf() {

    let downloadUrl = this.service.getURl() + this.pdfSrc;



    let path = this.file.dataDirectory;

    let exist = false;
    this.file.checkFile(`${path}`, this.nombreFactura).then(entry => {
      exist = entry;
    });


    await this.platform.ready().then(() => {
      this.file.listDir(path, '').then((result) => {


        for (let file of result) {
          if (file.isDirectory == true && file.name != '.' && file.name != '..') {
            // Code if its a folder
          } else if (file.isFile == true) {
            // Code if its a file
            let name = file.name // File name


            if (name == this.nombreFactura) {
              exist = true;
            }
          }
        }

        if (exist) {
          console.log("existe")

          this.openlocalPdf(this.nombreFactura)
        } else {

          console.log("No existe")
          const transfer = this.fileTransfer.create();
          transfer.download(downloadUrl, `${path}` + this.nombreFactura).then(entry => {
            let url = entry.toURL();
            if (this.platform.is('ios')) {
              this.cerrar()
              this.document.viewDocument(url, 'application/pdf', this.options)

              this.cerrar()
            } else {
              this.cerrar()
              this.fileOpener.open(url, 'application/pdf');
              this.cerrar()

            }
          });

        }
      })
    });





  }
  openlocalPdf(nombre) {
    let filePath = this.file.dataDirectory;

    if (this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, nombre, this.file.dataDirectory, `${fakeName}.pdf`).then(
        result => {
          this.fileOpener.open(result.nativeURL, 'application/pdf');
          this.cerrar()

        }
      )

    } else {

      this.document.viewDocument(`${filePath}/` + nombre, 'application/pdf', this.options)
      this.cerrar()

    }
  }
  cerrar() {
    this.modalCtrl.dismiss("OK");
    this.modalService.cerrarModal()

  }

}
