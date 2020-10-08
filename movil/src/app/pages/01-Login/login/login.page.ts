import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { IonSlides, MenuController } from '@ionic/angular';
import { Login } from '../../../models/login';

import { DatamenuService } from '../../../services/datamenu.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from '../../../services/user.service';
import { HomePage } from '../../00-Home/home/home.page';
import { HttpClient } from '@angular/common/http';
import { PushService } from '../../../services/push.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;
  public title: string;
  public user: Login;
  public status: string;
  public token: string;
  public identity;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private dataService: DatamenuService,
    private camera: Camera,
    private home: HomePage,
    private PushService: PushService,
    private _http: HttpClient

  ) { }



  openCamera() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  ngOnInit() {
    this.logOut();
    this.verificarLogueo();

    this.user = new Login('', '');
    this.title = 'Identificate';

    this.dataService.enableAuthenticatedMenu();


  }

  verificarLogueo() {
    if (this.userService.getIdentity() != null && this.userService.getToken() != null) {
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['home']);
      
      this.dataService.enableAuthenticatedMenu();
    }else{
      return this._http.get('login');

    }
  }

  onLogin(formulario) {



    this.userService.loginUser(this.user).subscribe(
      response => {
        this.userService.responseError();

    
        // tslint:disable-next-line: triple-equals
        if (response.status == null) {

          this.status = 'success';
          this.token = ''
          this.token = response;
          localStorage.setItem('token', this.token);
          this.ObtenerdatosUser();
        

        } else {
          this.status = 'error';

        }
      },
      error => {
    

        this.status = 'error';
      }

    );
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ObtenerdatosUser(): void {

    this.userService.loginUser(this.user, true).subscribe(
      response => {
        // tslint:disable-next-line: triple-equals

        this.status = 'success';
        this.identity = response;
        // localStorage.setItem('token', this.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.dataService.enableAuthenticatedMenu();
        // this.router.onSameUrlNavigation = 'reload';
        this.userService.getToken();
        this.userService.getIdentity();
        this.PushService.configuracionInicial()
        this.PushService.tagUsuarioLogeado();
        this.router.navigate(['homelogin']);
        
    


      },
      error => {
        this.status = 'error';
      }

    );
    // f

  }

  logOut(): void {
    this.route.params.subscribe(
      params => {
        let logout = +params.sure;
        if (logout === 1) {
          this.token = '';
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;
          this.PushService.configuracionInicial()
          this.PushService.tagNologueado();
          this.userService.logout();
         

          

        }

      }
    );
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
