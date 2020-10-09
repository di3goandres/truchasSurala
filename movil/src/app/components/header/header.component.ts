import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() titulo: string;
  @Input() icon: string;
  @Input() ocultar: string;

  constructor(private menuCtrl: MenuController) { }

  ruta ="/"
  ngOnInit() {

    if(this.ocultar == null){
      this.ocultar = ''
    }
    if(this.icon == null){
      this.icon ="bulb-outline"
    }
    if(this.titulo=="Bienvenidos"){
      this.ruta = '';
      this.ocultar = 'animated fadeOut fast'
    


    }
    else{
      this.ruta = '/';
 
      this.ocultar = 'animated fadeIn fast'

    }

  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
  onClick(){
    this.ocultar = 'animated fadeOut fast'
  
    //this.ocultar = 'fadeOut fast'
    
  }
}
