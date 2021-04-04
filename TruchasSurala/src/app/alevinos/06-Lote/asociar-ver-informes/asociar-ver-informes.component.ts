import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchivosAlevinos } from 'src/app/models/alevinos/alevinos.archivos';
import { AlevinosService } from '../../../service/alevinos/alevinos.service';
import { AsociarArchivoAlevinosComponent } from '../asociar-archivo-alevinos/asociar-archivo-alevinos.component';
import { SaveFile } from '../../../models/pedidos/guardar.pdf.response';
import { AlevinosArchivoRequest } from '../../../models/alevinos/alevinos.archivo.request';

@Component({
  selector: 'app-asociar-ver-informes',
  templateUrl: './asociar-ver-informes.component.html',
  styleUrls: ['./asociar-ver-informes.component.css']
})
export class AsociarVerInformesComponent implements OnInit {

  reporte: ArchivosAlevinos[];
  _idReporte: number;

  @Input() set idReporte(value: number) {
    this._idReporte = value
    if (value > 0)
      this.traerRerporte();

  }
  constructor(
    private service: AlevinosService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
  }
  traerRerporte() {
    this.service.GetReporteArchivos(this._idReporte).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200) {
          this.reporte = []
          this.reporte = OK.archivosAlevinos
        }
      },
      ERROR => { console.log(ERROR) },
    )
  }

  VerInforme(item: ArchivosAlevinos) {
    if (item.estado) {
      this.Agregar(item);

    }
    else {
      this.Agregar(item);
    }
  }

  Agregar(item: ArchivosAlevinos) {
    const modalRef = this.modalService.open(AsociarArchivoAlevinosComponent,
      {
        size: 'lg',
        windowClass: 'bounce-top'
      });
    modalRef.componentInstance.tipoInforme = item

    modalRef.result.then((result: SaveFile) => {

      this.GuardarArchivo(item, result);

    }, (reason) => {
      if (reason === 'OK') {

      }
    });
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  GuardarArchivo(item: ArchivosAlevinos, file: SaveFile) {
    let archivo = new AlevinosArchivoRequest();

    archivo.id_pedido_alevino = this._idReporte;
    archivo.archivos = [];
    archivo.archivos.push(file);
    this.service.GuardarArchivo(archivo).subscribe(
      OK => {
        this.traerRerporte();
        this.service.Exitoso();
        this.service.MostrarSnack("Registros exitoso.", "");


        let updateItem = this.reporte.find(this.findIndexToUpdate, item.id);

        let index = this.reporte.indexOf(updateItem);
        item.estado = true;

        this.reporte[index] = item;

      },
      ERROR => { console.log(ERROR) },
    )

  }

}
