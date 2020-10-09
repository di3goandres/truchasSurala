import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveFile } from '../../models/pedidos/guardar.pdf.response';


@Component({
  selector: 'app-asociarinformes',
  templateUrl: './asociarinformes.component.html',
  styleUrls: ['./asociarinformes.component.css']
})
export class AsociarinformesComponent implements OnInit {

  @Input() tipoInforme: number;
  @Input() file: SaveFile;
  NombreInforme = ""
  savefile: SaveFile = new SaveFile();
  contentInclude = "application/pdf";
  fileToUpload: File = null;
  pdfSrc = "";
  renderText = true;
  originalSize = false;
  fitToPage = false;
  showAll = true;
  autoresize = false;
  showBorders = true;
  renderTextModes = [0, 1, 2];
  renderTextMode = 1;
  rotation = 0;
  zoom = 1;
  zoomScale = 'page-width';
  zoomScales = ['page-width', 'page-fit', 'page-height'];
  pdfQuery = '';
  totalPages: number;
  deshabilitado = true;
  constructor(

    private activeModal: NgbActiveModal,

  ) { }



  ngOnInit(): void {

    switch (this.tipoInforme) {
      case 1:
        this.NombreInforme = "Informes Técnicos"
        break;
      case 2:
        this.NombreInforme = "Laboratorios PSR"
        break;
      case 3:
        this.NombreInforme = "Laboratorios HISTOPATOLOGIA"
        break;
    }

    if (this.file.file.length != 0) {
      this.pdfSrc = this.file.file;
    }

  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
    }
    this.savefile = new SaveFile();

    this.savefile.nombre = this.fileToUpload.name;
    this.savefile.type = this.fileToUpload.type;
    this.savefile.tipo = this.tipoInforme;

    const file = this.fileToUpload;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {

      this.savefile.file = reader.result;
      this.pdfSrc = e.target.result;
    };
    this.deshabilitado = false;
  }
  zoomIn() {
    this.zoom += 0.05;
  }

  zoomOut() {
    if (this.zoom > 0.05)
      this.zoom -= 0.05;
  }

  rotateDoc() {
    this.rotation += 90;
  }

  // Event for search operation

  callBackFn(event) {
    console.log('callBackFn', event);
    // Setting total number of pages
    this.totalPages = event._pdfInfo.numPages
  }
  pageRendered(event) {
    console.log('pageRendered', event);
  }
  textLayerRendered(event) {
    console.log('textLayerRendered', event);
  }
  onError(event) {
    console.error('onError', event);
  }
  onProgress(event) {
    console.log('onProgress', event);
  }

  cerrar(){
    this.activeModal.dismiss('sin archivo')

  }
  guardarArchivo() {


    this.activeModal.close(this.savefile)



  }

}
