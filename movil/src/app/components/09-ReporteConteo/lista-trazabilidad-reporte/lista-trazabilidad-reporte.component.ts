import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConteoRequest } from 'src/app/models/conteo/conteo.request';
import { ReporteConteoService } from 'src/app/services/02-ReporteConteo/reporte-conteo.service';
import { MetodoConteo, ConteoTrazabilidad } from '../../../models/conteo/conteo.trazabilida';
import { ReportarTrazaComponent } from '../reportar-traza/reportar-traza.component';
import { PreviewConteoComponent } from '../preview-conteo/preview-conteo.component';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-trazabilidad-reporte',
  templateUrl: './lista-trazabilidad-reporte.component.html',
  styleUrls: ['./lista-trazabilidad-reporte.component.scss'],
})
export class ListaTrazabilidadReporteComponent implements OnInit {
  Metodo: number;
  idPedidoOvas: number;
  veces: number;
  porcentajePermitido: number;
  mostrar = true;
  NoGuardar = true;
  seleccionoConteo = false;
  mostrarResultado = false;
  metodoSeleccionado = new MetodoConteo();
  Total: number = 0
  TotalReportado: number = 0;
  porcentaje: number = 0;
  ConteoTrazabilidad: ConteoTrazabilidad[];
  metodoConteo: MetodoConteo[];
  formGuardar: FormGroup;
  @Input() set id(value: number) {
    this.idPedidoOvas = value;
    this.conteoRequest.id_pedido = this.idPedidoOvas;
    this.traerInformacion();
  }
  conteoRequest = new ConteoRequest();
  constructor(
    private servicio: ReporteConteoService,
    public modalCtrl: ModalController,
    private userService: UserService
  ) { }
  ngOnInit() {
    this.formGuardar = new FormGroup({
      metodo: new FormControl('', [Validators.required]),
      numeroCantida: new FormControl('', [ Validators.required, Validators.min(1)])
    });

  }
  traerInformacion() {
    this.servicio.GetTrazabilidad(this.idPedidoOvas).subscribe(
      OK => {
        console.log(OK)
        this.metodoConteo = [];
        this.metodoConteo.push(...OK.metodoConteo)
        this.ConteoTrazabilidad = [];
        this.ConteoTrazabilidad.push(...OK.ConteoTrazabilidad)
        this.mostrar = false
        this.porcentajePermitido = OK.porcentaje;
        this.presentTerminos(OK.porcentaje);
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
        'porcentaje': this.porcentajePermitido,


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

        }
        this.Verificar();
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

    if (this.mostrarResultado) {
      if (this.metodoSeleccionado.esOvacon) {
        this.NoGuardar = true;
      } else {
        let rango = 100 - this.porcentaje;
        if (rango <= this.porcentajePermitido) {
          this.NoGuardar = false;
          this.servicio.presentToast("Para el metodo Von Bayer, si el porcentaje estar entre 0% y " + this.porcentajePermitido + "%, No se hara reposición")
        } else {
          this.NoGuardar = true;
        }
      }
    }
    console.log(this.porcentaje, this.TotalReportado, this.Total)

  }

  Guardar() {

    this.conteoRequest.id_pedido = this.convertirInt(this.idPedidoOvas);
    this.conteoRequest.id_metodo = this.metodoSeleccionado.id;
    this.conteoRequest.NumeroConteoRealizado = this.convertirInt(this.veces);
    this.conteoRequest.ConteoTrazabilidad = [];
    this.conteoRequest.ConteoTrazabilidad.push(...this.ConteoTrazabilidad);
    console.log(JSON.stringify(this.conteoRequest));

    this.servicio.GuardarConteo(this.conteoRequest).subscribe(
      OK => {
        if (OK.code == 200 || OK.code == 201) {
          this.userService.ModalGenericoVolver("Exitoso", "Se ha registrado exitosamente tu reporte de conteo,  el cual puedes encontrar en los reportados", "pasarela-conteo")
          //pasarela-conteo

        } else if (OK.code == 201) {
          this.userService.ModalGenericoVolver("No Exitoso", "Se ha registrado previamente el reporte, el cual puedes encontrar en los reportarados", "pasarela-conteo")

        }

      },
      ERROR => { console.log(ERROR) },
    )


  }

  convertirInt(numero) {
    var x = numero
    var y: number = +x;
    return y;
  }


  async presentTerminos(porcentaje: number) {
    const modal = await this.modalCtrl.create({
      component: PreviewConteoComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'porcentaje': porcentaje,



      }

    });

    return await modal.present();
  }
}
