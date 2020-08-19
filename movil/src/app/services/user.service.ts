import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FincasUser } from '../models/fincas.user';
import { Respuesta } from '../models/Response';
import { Photo } from '../models/photos';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public json: string;
  public params: string;


  public identity;
  public token;

  public header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Autorization': this.token
  });
  user: User;
  constructor(public http: HttpClient,
             public navCtrl: NavController
              ) {
    this.url = environment.apiUrl;
    this.header = new HttpHeaders();
    this.getIdentity();
    this.getToken();

  }

    // tslint:disable-next-line: typedef
    getIdentity() {
      // tslint:disable-next-line: prefer-const
      let identity = JSON.parse(localStorage.getItem('identity'));
      // tslint:disable-next-line: triple-equals
      if (identity && (identity != 'undefined' || identity != null)) {
        this.identity = identity;
      } else {
        this.identity = null;
      }
      return this.identity;
    }
  
    // tslint:disable-next-line: typedef
    getToken() {
      // tslint:disable-next-line: prefer-const
      let token = localStorage.getItem('token');
      // tslint:disable-next-line: triple-equals
      if (token && (token != 'undefined' || token != null)) {
        this.token = token;
      } else {
        this.token = null;
      }
      return this.token;
    }

    validaToken() : Promise<boolean> {

      if(this.getIdentity()==null || this.getToken() == null){
    
        this.navCtrl.navigateRoot('login');
        Promise.resolve(false);
      }
      return new Promise(resolve=>{

        if(this.getIdentity()==null ||  this.getToken() == null){
          this.navCtrl.navigateRoot('login');
          resolve(false);
        }else{
          resolve(true);
        }
      })
    }



  // tslint:disable-next-line: typedef
  private ejecutarQuery<T>(query: string) {
    this.header = new HttpHeaders().set('Authorization', this.token);
    return this.http.get<T>(this.url + query, { headers: this.header });

  }

  // tslint:disable-next-line: typedef
  private ejecutarQueryPost<T>(query: string, params: FormData) {
    this.header = new HttpHeaders().set('Authorization', this.token)
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<T>(this.url + query, params, { headers: this.header });

  }


  getFincasUsuario(){
    
    return this.ejecutarQuery<FincasUser>('/api/datos/fincabytoken');

  }
  
  loginUser(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = 'true';
    }
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + '/api/login', this.params, { headers: this.header });
  }
  
  getUrlImage(nameImage){
    return this.url  + '/api/user/avatar/' + this.getToken() +  '/' + nameImage;
  }


  private  b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], 'Avatar.jpeg', { type: 'image/jpeg' });
    
    // return new Blob([ab], { type: 'image/jpeg' });
}
  postFile(fileToUpload: Photo) {
   
    let blob = this.b64toBlob(fileToUpload.base64);
  
 
    const formData: FormData = new FormData();
    
    formData.append('file0',blob);

    return this.ejecutarQueryPost<Respuesta>( '/api/user/upload',
    formData);
    
}
}
