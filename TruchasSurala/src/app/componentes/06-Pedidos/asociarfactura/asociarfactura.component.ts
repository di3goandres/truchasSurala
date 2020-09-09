import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from '../../../service/pedidos/pedidos.service';
import { SaveFile } from '../../../models/pedidos/guardar.pdf.response';
import { Pedido } from '../../../models/pedidos';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asociarfactura',
  templateUrl: './asociarfactura.component.html',
  styleUrls: ['./asociarfactura.component.css']
})
export class AsociarfacturaComponent implements OnInit {
  @Input() pedido: Pedido;
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
    private pedidosService: PedidosService,
    private activeModal: NgbActiveModal,

  ) { }



  ngOnInit(): void {

    this.pdfSrc = this.pedido.nombre_factura === "pendiente"?
             "" : "/api/pedido/factura/"+ this.pedido.id +"/"+ this.pedido.nombre_factura;
  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
    }
    this.savefile = new SaveFile();
    this.savefile.id = this.pedido.id.toString()
    this.savefile.nombre = this.fileToUpload.name;
    this.savefile.type = this.fileToUpload.type;



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


  guardarArchivo() {


    this.pedidosService.postFile(this.savefile)
      .subscribe(
        response => {
          console.log(response);
          if (response.status == "OK")
            this.activeModal.close("OK")

        },
        error => {
          console.log(error)

        },

      )
  }
}
