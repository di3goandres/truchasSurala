import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/users';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public json: string;
  public params: string;
  public header: HttpHeaders;

  public identity;
  public token;


  user: User;
  constructor(public http: HttpClient) {
    this.url = environment.apiUrl;
  }

  // tslint:disable-next-line: typedef
  test() {
    return 'Hola Munndo Test';

  }

  registerUser(user): Observable<any> {
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');



    return this.http.post('/api/register', this.params, { headers: this.header });
  }
  loginUser(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = 'true';
    }
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');



    return this.http.post('/api/login', this.params, { headers: this.header });
  }


  // tslint:disable-next-line: typedef
  getIdentity() {
    // tslint:disable-next-line: prefer-const
    let identity = JSON.parse(localStorage.getItem('identity'));
    // tslint:disable-next-line: triple-equals
    if (identity && (identity != 'undefined' || identity != null) ) {
      this.identity = identity;
    }else{
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
    }else{
      this.token = null;
    }
    return this.token;
  }
}






