import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveFile } from 'src/app/models/pedidos/guardar.pdf.response';
import { InformeResp } from '../../models/tecnicos/informes/informes.tecnicos.response';

@Component({
  selector: 'app-actualizarpdfinforme',
  templateUrl: './actualizarpdfinforme.component.html',
  styleUrls: ['./actualizarpdfinforme.component.css']
})
export class ActualizarpdfinformeComponent implements OnInit {

  @Input() informe: InformeResp;
  @Input() tipoInforme: number;

  NombreInforme = ""
  nombreArchivo = "";
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
        this.nombreArchivo = this.informe.informeTecnico
        this.pdfSrc = this.informe.informeTecnico== null ? "": '/api/movil/despacho/reporte/pdf/' + this.informe.id + "/" + this.nombreArchivo;

        break;
      case 2:
        this.NombreInforme = "Laboratorios PCR"
        this.nombreArchivo = this.informe.archivo_pcr
        this.pdfSrc = this.informe.archivo_pcr== null ? "": '/api/movil/despacho/reporte/pdf/' + this.informe.id + "/" + this.nombreArchivo;

        break;
      case 3:
        this.NombreInforme = "Laboratorios HISTOPATOLOGIA"
        this.nombreArchivo = this.informe.histopatologia
        this.pdfSrc = this.informe.histopatologia== null ? "": '/api/movil/despacho/reporte/pdf/' + this.informe.id + "/" + this.nombreArchivo;


        break;
      case 4:
        this.NombreInforme = "Laboratorios NUTRICIONAL"
        this.nombreArchivo = this.informe.laboratorioNutricional
        this.pdfSrc = this.informe.laboratorioNutricional== null ? "": '/api/movil/despacho/reporte/pdf/' + this.informe.id + "/" + this.nombreArchivo;


        break;
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

  cerrar() {
    this.activeModal.dismiss('sin archivo')

  }
  guardarArchivo() {


    this.activeModal.close(this.savefile)



  }

}
