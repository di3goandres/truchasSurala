import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveFile } from 'src/app/models/pedidos/guardar.pdf.response';
import { ArchivosAlevinos } from '../../../models/alevinos/alevinos.archivos';

@Component({
  selector: 'app-asociar-archivo-alevinos',
  templateUrl: './asociar-archivo-alevinos.component.html',
  styleUrls: ['./asociar-archivo-alevinos.component.css']
})
export class AsociarArchivoAlevinosComponent implements OnInit {


  @Input() tipoInforme: ArchivosAlevinos;
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
    this.NombreInforme = this.tipoInforme.descripcion
  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
    }
    this.savefile = new SaveFile();

    this.savefile.nombre = this.fileToUpload.name;
    this.savefile.type = this.fileToUpload.type;
    this.savefile.tipo = this.tipoInforme.id;

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
    // console.log('callBackFn', event);
    // Setting total number of pages
    this.totalPages = event._pdfInfo.numPages
  }
  pageRendered(event) {
    // console.log('pageRendered', event);
  }
  textLayerRendered(event) {
    // console.log('textLayerRendered', event);
  }
  onError(event) {
    // console.error('onError', event);
  }
  onProgress(event) {
    // console.log('onProgress', event);
  }

  cerrar() {
    this.activeModal.dismiss('sin archivo')

  }
  guardarArchivo() {


    this.activeModal.close(this.savefile)



  }

}
