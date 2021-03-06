import { Component, OnInit } from '@angular/core';
import { DespachadoAlevinos } from 'src/app/models/alevinos/alevinos.despachados.response';
import { AlevinosService } from 'src/app/services/01-Alevinos/alevinos.service';
import { ModalController } from '@ionic/angular';
import { InformeAlevinoComponent } from '../informe-alevino/informe-alevino.component';
import { GenericoVolverComponent } from '../../08-Modal/generico-volver/generico-volver.component';

@Component({
  selector: 'app-alevinos-despachados',
  templateUrl: './alevinos-despachados.component.html',
  styleUrls: ['./alevinos-despachados.component.scss'],
})
export class AlevinosDespachadosComponent implements OnInit {

  noMostrar = true;
  despachados: DespachadoAlevinos[];
  constructor(
    private service: AlevinosService,
    public modalController: ModalController
  ) { }

  ngOnInit() {

    this.traerPedidos();
  }
  
  close(item){
    item.close();

  }
  async Informe(despacho: DespachadoAlevinos, item) {

   item.close();
    const modal = await this.modalController.create({
      component: InformeAlevinoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'despacho': despacho
     
      }
    });
    return await modal.present();
  }
  traerPedidos() {
    this.service.traerPedidosDespachadosUsuario().subscribe(
      OK => {
        this.despachados = [];
        this.despachados.push(...OK.despachados);
        this.noMostrar = false;
        if(this.despachados.length == 0){

            this.service.ModalSinDatos("DESPACHOS", "En este momento no cuentas con despachos disponibles", "seleccionarTipo")
        }
        console.log(OK)
      },
      ERROR => { console.log(ERROR) },
    )
  }
  doRefresh(event) {
    this.noMostrar = true;

    this.traerPedidos();
  }



}
