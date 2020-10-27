import { Component, OnInit } from '@angular/core';
import { Despacho } from 'src/app/models/despacho/despacho.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Storage } from '@ionic/storage';
import { VerfacturaComponent } from '../verfactura/verfactura.component';
import { ModalController } from '@ionic/angular';
import { ImagenesReporte } from '../../../models/despacho/despacho.response';
import { ListafotosComponent } from '../../00-Comunes/listafotos/listafotos.component';


@Component({
  selector: 'app-verdespachos',
  templateUrl: './verdespachos.component.html',
  styleUrls: ['./verdespachos.component.scss'],
})
export class VerdespachosComponent implements OnInit {

  noMostrar = true;
  total = 0;
  despachos: Despacho[] = []
  imagenes: ImagenesReporte[]=[]
  constructor(
    private servicio: PedidosService,
    private storage: Storage,
    public modalCtrl: ModalController,



  ) { }

  ngOnInit() {
    this.recargar();
    if (this.despachos.length == 0) {
      this.traerDespachos()

    }
  }


  async presentModal(dato: Despacho) {
    const modal = await this.modalCtrl.create({
      component: VerfacturaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'nombreFactura': dato.certificado,
        'idPedido': dato.id,
        'pdfSrc': '/api/despacho/certificado/'

      }
    });
    return await modal.present();
  }
  async conteo() {
    let total = await this.storage.get('despachos') || []
    this.total = total.length;

  }

  async recargar() {
    // this.fincas  = this.storage.get('fincas' )
    this.despachos = await this.storage.get('despachos') || []


  }
  guardarDespachos() {
    this.storage.set('despachos', this.despachos)
  }

  traerDespachos() {

    this.servicio.obtenerMisDespachos().subscribe(
      OK => {
        this.conteo();
      
        console.log(OK);
        if (this.total != OK.despachos.length) {
          this.despachos = []
          this.imagenes = []
          this.despachos.push(...OK.despachos)
          this.imagenes.push(...OK.imagenes)
          this.guardarDespachos();
        }


        this.noMostrar = false;
      },
      ERROR => {

        this.noMostrar = false;
        this.recargar()
        console.log(ERROR)},
    )
  }

  doRefresh(event) {

    this.traerDespachos()
    this.noMostrar = true;


    setTimeout(() => {

      event.target.complete();


    }, 500);
  }


  ValidarFotos(id){

   let value = this.imagenes.filter(item=> {
      return item.id_despacho == id
    })

    return value.length>0? true:false;

  }

  async verFotos(id){

    let fotos = this.imagenes.filter(item=> {
      return item.id_despacho == id
    })

  
    const modal = await this.modalCtrl.create({
      component: ListafotosComponent ,
  
      componentProps: {
        'fotos': fotos
      }
    });
    return await modal.present();
  }
}
