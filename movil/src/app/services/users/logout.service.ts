import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
 
  loading: any;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    public loadingController: LoadingController,
    public navCtrl: NavController

    
  ) { }


  logout() {

    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('login');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
  
    });
    await this.loading.present();

   
  }

  async presentLoading2() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
  
  
    });
    await this.loading.present();
    const { role, data } = await this.loading.onDidDismiss();

   
  }


  openModal(){
    this.spinner.show();
    // this.presentLoading()
 
  }
  cerrarModal(){
    this.spinner.hide();

    // this.presentLoading2()


  }
}
