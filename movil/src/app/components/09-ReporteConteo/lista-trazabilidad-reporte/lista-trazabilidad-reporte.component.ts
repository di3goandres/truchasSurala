import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReporteConteoService } from 'src/app/services/02-ReporteConteo/reporte-conteo.service';
import { MetodoConteo, ConteoTrazabilidad } from '../../../models/conteo/conteo.trazabilida';
import { ReportarTrazaComponent } from '../reportar-traza/reportar-traza.component';

@Component({
  selector: 'app-lista-trazabilidad-reporte',
  templateUrl: './lista-trazabilidad-reporte.component.html',
  styleUrls: ['./lista-trazabilidad-reporte.component.scss'],
})
export class ListaTrazabilidadReporteComponent implements OnInit {
  Metodo: number;
  idPedidoOvas: number;
  mostrar = true;
  seleccionoConteo = false;
  mostrarResultado = false;
  metodoSeleccionado = new MetodoConteo();

  Total: number = 0
  TotalReportado: number = 0;
  porcentaje: number = 0;

  ConteoTrazabilidad: ConteoTrazabilidad[];
  metodoConteo: MetodoConteo[];
  @Input() set id(value: number) {
    this.idPedidoOvas = value;
    this.traerInformacion();
  }
  constructor(
    private servicio: ReporteConteoService,
    public modalCtrl: ModalController,

  ) { }

  ngOnInit() { }

  traerInformacion() {
    this.servicio.GetTrazabilidad(this.idPedidoOvas).subscribe(
      OK => {


        this.metodoConteo = [];
        this.metodoConteo.push(...OK.metodoConteo)
        this.ConteoTrazabilidad = [];
        this.ConteoTrazabilidad.push(...OK.ConteoTrazabilidad)
        console.log(this.ConteoTrazabilidad)
        this.mostrar = false
      },
      ERROR => {

        this.mostrar = false
      },
    )
  }

  onSelectChange(selection: any) {
    this.seleccionoConteo = true;
    this.metodoConteo.filter(item => {
      if (item.id == this.Metodo)
        this.metodoSeleccionado = item;
    });

    this.ConteoTrazabilidad.forEach(item => {
      item.cantidad_reportada = 0;
      item.tiene_reporte_conteo = false
    })
    this.mostrarResultado = false

  }

  trackByMethod(index: number): number {
    return (index % 8) + 1;
  }

  async presentModal(traza: ConteoTrazabilidad) {
    const modal = await this.modalCtrl.create({
      component: ReportarTrazaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'traza': traza,
        'metodo': this.metodoSeleccionado,


      }

    });

    modal.onDidDismiss()
      .then((data) => {

        if (data.role == "OK") {
          this.ConteoTrazabilidad.forEach(item => {

            if (item.id == data.data.id) {
              item.cantidad_reportada = data.data.cantidad_reportada;
              item.tiene_reporte_conteo = true
            }
          })
          this.Verificar();
        }
      });


    return await modal.present();
  }

  //  verificar que todo esten reportados para mostrar un resultado y poder guardar.
  Verificar() {
    let existeAun = this.ConteoTrazabilidad.filter(item => {
      return item.tiene_reporte_conteo == false
    })
    this.mostrarResultado = existeAun.length == 0 ? true : false;
    this.Total = 0;
    this.TotalReportado = 0;
    this.ConteoTrazabilidad.forEach(item => {
      this.Total = this.Total + item.total_ovas_enviadas
      this.TotalReportado = this.TotalReportado + item.cantidad_reportada

    })
    this.porcentaje = (this.TotalReportado / this.Total) * 100;


    console.log(this.porcentaje, this.TotalReportado, this.Total)

  }

  Guardar() {

  }
}
