import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatamenuService } from '../../../services/datamenu.service';
import { UserService } from '../../../services/user.service';
import { Finca } from '../../../models/fincas.user';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  fincas: Finca[]=[]
  activar: boolean;



  constructor( private dataService: DatamenuService,
                private userService: UserService,
               private menuCtrl: MenuController,
               private camera: Camera
               ) { }
  


  openCamera(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }
  ngOnInit() {
    this.dataService.enableAuthenticatedMenu();
    this.activar = false;

    this.traerFincas()

    
  }

  traerFincas(){
    this.userService.getFincasUsuario().subscribe(
      response=> {
        console.log(response)
        this.fincas.push(...response.fincas);
      },
      error=> {
        console.log(error)

      }
    )
  }
  toggleMenu() {
    console.log(this.menuCtrl.getMenus())
    this.menuCtrl.toggle();
  }

  cambiarMenu(){

    this.menuCtrl.enable(this.activar, 'authenticated');
    this.menuCtrl.enable(!this.activar, 'unauthenticated');
    console.log('quedo activ', this.menuCtrl.isEnabled('unauthenticated'))
    this.activar = !this.activar;


  }
}
