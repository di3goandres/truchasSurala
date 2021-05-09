import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchivosAlevinos } from 'src/app/models/alevinos/alevinos.archivos';
import { AlevinosService } from 'src/app/services/01-Alevinos/alevinos.service';

@Component({
  selector: 'app-alevinos-archivos',
  templateUrl: './alevinos-archivos.page.html',
  styleUrls: ['./alevinos-archivos.page.scss'],
})
export class AlevinosArchivosPage implements OnInit {
  reporte: ArchivosAlevinos[];

  idPedidoAlevino: number
  id_lote: number
  existe: boolean;
  nombre: string;
  constructor(
    private route: ActivatedRoute,
    private service: AlevinosService
    
  ) { }

  ngOnInit() {
    this.cargar();
    console.log(this.id_lote)
    this.traerRerporte();
  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idPedidoAlevino = params.id;
        this.id_lote = params.id_lote;
        this.nombre = params.nombre;
        this.existe = params.existe;

        console.log(params);
      }
    );
  }

  traerRerporte() {
    this.service.GetReporteArchivos(this.idPedidoAlevino).subscribe(
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

}
