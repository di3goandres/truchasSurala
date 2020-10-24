import { Component, OnInit, Input } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-modalpdf',
  templateUrl: './modalpdf.component.html',
  styleUrls: ['./modalpdf.component.scss'],
})
export class ModalpdfComponent implements OnInit {

  @Input() nombrePdf: string;
  @Input() id: string;
  @Input() tipo = "";
  @Input() pdfSrc = "";

  mostrar = false;



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

    var filter =  ['pwa','desktop', 'mobileweb'];
    var platformfilter =[]

    this.platform.platforms().forEach(element => {
      
      this.tipo = this.tipo + '-' + element
    });
    let platforms= this.platform.platforms().filter(function(item) {
      for (var key in filter) {

       

        if (item == filter[key])
           platformfilter.push(item); 
      }
    
    });
  


    this.pdfSrc = this.pdfSrc + this.id + "/" + this.nombrePdf;

    if (platformfilter.length==0) {
      this.dowloadAndOpenPdf();

    } else {
      this.mostrar = true;
    }
  }

  dowloadAndOpenPdf() {

    let downloadUrl = this.service.getURl() + this.pdfSrc;


    let path = this.file.dataDirectory;

    const transfer = this.fileTransfer.create();
    transfer.download(downloadUrl, `${path}` + this.nombrePdf).then(entry => {
      let url = entry.toURL();
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {})


      } else {
        this.fileOpener.open(url, 'application/pdf');

      }
    });


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
        title: this.tipo
      }
      this.document.viewDocument(`${filePath}` + nombre, 'application/pdf', options)
    }
  }
  cerrar() {
    this.modalCtrl.dismiss("OK");
  }


}
