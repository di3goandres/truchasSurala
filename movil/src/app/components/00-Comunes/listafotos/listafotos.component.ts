import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { ImagenesReporte } from '../../../models/despacho/despacho.response';
import { UserService } from '../../../services/user.service';
import { LogoutService } from '../../../services/users/logout.service';

@Component({
  selector: 'app-listafotos',
  templateUrl: './listafotos.component.html',
  styleUrls: ['./listafotos.component.scss'],
})
export class ListafotosComponent implements OnInit {

 
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @Input() fotos : ImagenesReporte[]=[]; 
 

  constructor(
    public viewCtrl: ModalController,
    private userService: UserService,
    private modalService: LogoutService,
  

  ) { }

  ionViewDidEnter(){
    this.modalService.openModal()
    this.slides.update();
    this.modalService.cerrarModal()

  }
  slideOpts = {
    initialSlide: 0,
    speed: 400,

  };
  ngOnInit() {

    this.cargaFotos();
    
  }

  async cargaFotos(){
    this.modalService.openModal()

    await this.fotos.forEach(item => {
      item.imagen = this.userService.getURl() + "/api/despacho/reporte/imagen/" +item.id + '/' + item.archivo;
      
    })
    this.modalService.cerrarModal()

  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'cancel');
    }


}
