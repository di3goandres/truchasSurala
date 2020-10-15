import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() titulo: string;
  @Input() icon: string;
  @Input() ocultar: string;

  user: User;

  constructor(private menuCtrl: MenuController,
  private Service: UserService
  ) { }

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
   this.user = this.Service.getIdentity();


  }
  toggleMenu(){
    this.menuCtrl.toggle();
  }
  onClick(){
    this.ocultar = 'animated fadeOut fast'
  
    //this.ocultar = 'fadeOut fast'
    
  }
}
