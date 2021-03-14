import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';

@Component({
  selector: 'app-ver-certificado-origen',
  templateUrl: './ver-certificado-origen.component.html',
  styleUrls: ['./ver-certificado-origen.component.css']
})
export class VerCertificadoOrigenComponent implements OnInit {
  @Input() Despacho: any;
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
    private service: AlevinosService,
    private activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {
    this.pdfSrc = "/api/despacho/alevinos/certificado/" + this.Despacho.id_lote_numero
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
    this.close()
    // this.service.NoExitosoComun()

    this.service.NoExitoso("Error, Archivo NO existe", "No se ha cargado el archivo que estas intentado acceder");
    console.error('onError', event);
  }
  onProgress(event) {
    console.log('onProgress', event);
  }


  close() {
    this.activeModal.close("OK")
  }

}
