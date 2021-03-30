import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { InformeTecnico } from '../../../models/pedidos/informes.tecnicos.response';
import { ArchivosMostrar } from '../../../models/pedidos/archivos.tecnicos';
import { VerfacturaComponent } from '../verfactura/verfactura.component';

@Component({
  selector: 'app-modalreporte',
  templateUrl: './modalreporte.component.html',
  styleUrls: ['./modalreporte.component.scss'],
})

export class ModalreporteComponent implements OnInit {


  Mostrar: ArchivosMostrar[] = [];
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @Input() informe: InformeTecnico;
  constructor(
    public viewCtrl: ModalController,
  



  ) { }

  // ionViewDidEnter(){
  //   this.slides.update();
  // }
  slideOpts = {
    initialSlide: 0,
    speed: 400,

  };

  async verinforme(item, slidingItem){
    slidingItem.close();
    console.log(item)

    const modal = await this.viewCtrl.create({
      component: VerfacturaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'nombreFactura': item.nombre,
        'idPedido': item.id,
        'pdfSrc': '/api/movil/despacho/reporte/pdf/'

      }
    });
    return await modal.present();

  }
  ngOnInit() {
    console.log(this.informe);
    if (this.informe.informeTecnico != null) {
      this.Mostrar.push({ id: this.informe.id, nombre: this.informe.informeTecnico, titulo: "Informe Técnico" });
    }
    if (this.informe.archivo_pcr != null) {
      this.Mostrar.push({ id: this.informe.id, nombre: this.informe.archivo_pcr , titulo: "Laboratorio PCR" });
    }
    if (this.informe.histopatologia != null) {
      this.Mostrar.push({ id: this.informe.id, nombre: this.informe.histopatologia , titulo: "Laboratorio Histopatologia Técnico" });
    }

    if (this.informe.laboratorioNutricional != null) {
      this.Mostrar.push({ id: this.informe.id, nombre: this.informe.laboratorioNutricional, titulo: "Laboratorio Nutricional" });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'cancel');
  }


}
