import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Politicas } from 'src/app/models/guias/guias';
import { GuiasService } from 'src/app/services/guias/guias.service';
import { Router } from '@angular/router';
import { RecordatorioMortalidadComponent } from 'src/app/components/04-Mortalidad/recordatorio-mortalidad/recordatorio-mortalidad.component';

@Component({
  selector: 'app-pasarela-mortalidad',
  templateUrl: './pasarela-mortalidad.page.html',
  styleUrls: ['./pasarela-mortalidad.page.scss'],
})
export class PasarelaMortalidadPage implements OnInit {
  politicas: Politicas;

  constructor(
    public modalController: ModalController,
    private guiasService: GuiasService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.cargarPoliticas();
  }

  closeItem(item, reclamos: boolean) {
    item.close();
    if (reclamos)
      this.VerPoliticas();
  }


  async VerPoliticas() {


    const modal = await this.modalController.create({
      component: RecordatorioMortalidadComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'politicas': this.politicas
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data.role);
        if (data.role == "OK")
          this.router.navigate(['/mortalidadpedidos/1']);
      });
    // const { data } = await modal.onWillDismiss();

    return await modal.present();

  }

  cargarPoliticas() {
    this.guiasService.getRecordatorio().subscribe(
      OK => {
        this.politicas = OK
      },
      ERROR => { console.log(ERROR) },
    )
  }


}
