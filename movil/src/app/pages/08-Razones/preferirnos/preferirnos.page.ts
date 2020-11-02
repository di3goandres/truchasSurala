import { Component, OnInit, ViewChild } from '@angular/core';
import { GuiasService } from '../../../services/guias/guias.service';
import { Prefierenos, SlidesPrefierenos } from '../../../models/prefierenos/prefierenos';
import { IonContent, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-preferirnos',
  templateUrl: './preferirnos.page.html',
  styleUrls: ['./preferirnos.page.scss'],
})
export class PreferirnosPage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;

  @ViewChild(IonSlides, {static: false}) slidesUpdate: IonSlides;

  preferidos: Prefierenos[] = []
  slides: SlidesPrefierenos[] = []

  ionViewDidEnter(){
    this.slidesUpdate.update();
  }
  constructor(
    private service: GuiasService
  ) { }

  ngOnInit() {
    this.cargasPreferidos()
    console.log(this.preferidos)
  }

  subir(){
    this.ionContent.scrollToTop(500)

  }

  async cargasPreferidos() {
    this.service.getPrefierenos().subscribe(items => {
      
      this.preferidos.push(items)
      this.slides = this.preferidos[0].slides
      
    }
    );
  }

}
