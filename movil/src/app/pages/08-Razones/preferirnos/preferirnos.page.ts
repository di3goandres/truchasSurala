import { Component, OnInit } from '@angular/core';
import { GuiasService } from '../../../services/guias/guias.service';
import { Prefierenos, SlidesPrefierenos } from '../../../models/prefierenos/prefierenos';

@Component({
  selector: 'app-preferirnos',
  templateUrl: './preferirnos.page.html',
  styleUrls: ['./preferirnos.page.scss'],
})
export class PreferirnosPage implements OnInit {

  preferidos: Prefierenos[] = []
  slides: SlidesPrefierenos[] = []

  constructor(
    private service: GuiasService
  ) { }

  ngOnInit() {
    this.cargasPreferidos()
    console.log(this.preferidos)
  }

 

  async cargasPreferidos() {
    this.service.getPrefierenos().subscribe(items => {
      
      this.preferidos.push(items)
      this.slides = this.preferidos[0].slides
      
    }
    );
  }

}
