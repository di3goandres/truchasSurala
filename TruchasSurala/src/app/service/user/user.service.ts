import { PediRootObject } from './../../models/pedido';
import { DatosDistribucion } from './../../models/datosDistribucion';
import { DistribucionRootObject } from './../../models/distribucion';
import { FincaRootObject } from './../../models/fincas';
import { BandejasCajaObject } from './../../models/bandejasCajas';
import { DespachoRootObject } from './../../models/despacho';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/users';
import { environment } from '../../../environments/environment';
import { Despachosroot } from '../../models/despacho';
import { PedidosRootObject } from '../../models/pedidos';
import { TopTrazabilidad } from '../../models/Trazabilidad';
import { DistribucionResponse } from '../../models/distribucion.response';
import { GeneralesRoot } from '../../models/Datos.generales';
import { UsuariosFincasResponse } from '../../models/usuarios.fincas';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FincasResponse } from '../../models/fincas.response';
import { DespachoResponseActual } from '../../models/despacho.response';



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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.url = environment.apiUrl;
    this.header = new HttpHeaders();
    this.getIdentity();
    this.getToken();


  }



  // tslint:disable-next-line: typedef
  public ejecutarQuery<T>(query: string) {
    if(this.token === null){
      this.getToken();
    }
    this.header = new HttpHeaders().set('Authorization', this.token);
    return this.http.get<T>(this.url + query, { headers: this.header });

  }

  // tslint:disable-next-line: typedef
  public ejecutarQueryPost(query: string, params: string) {
    this.header = new HttpHeaders().set('Authorization', this.token)
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + query, params, { headers: this.header });

  }

  

  // tslint:disable-next-line: typedef
  storeDespacho(despacho: any): Observable<any> {

    this.json = JSON.stringify(despacho);
    this.params = 'json=' + this.json;
    return this.ejecutarQueryPost('/api/Despacho', this.params);

  }

  // tslint:disable-next-line: typedef
  storeCajasLotes(cajas: any): Observable<any> {

    this.json = JSON.stringify(cajas);
    console.log(this.json);
    this.params = 'json=' + this.json;
    return this.ejecutarQueryPost('/api/CajasLotes', this.params);

  }

  storeDistribucion(distribucion: any): Observable<any> {

    this.json = JSON.stringify(distribucion);
    console.log(this.json);
    this.params = 'json=' + this.json;
    return this.ejecutarQueryPost('/api/Distribucion', this.params);

  }

  storePedidos(pedidos: any): Observable<any> {

    this.json = JSON.stringify(pedidos);
    console.log(this.json);
    this.params = 'json=' + this.json;
    return this.ejecutarQueryPost('/api/Pedidos', this.params);

  }
  // tslint:disable-next-line: typedef
  getDespacho(id = null) {
    return this.ejecutarQuery<Despachosroot>('/api/Despacho/' + id);
  }

  // tslint:disable-next-line: typedef
  getPedidos(id) {
    return this.ejecutarQuery<PedidosRootObject>('/api/Pedidos/' + id);
  }

  // tslint:disable-next-line: typedef
  getDistribucion(id) {
    return this.ejecutarQuery<DistribucionResponse>('/api/Distribucion/' + id);
  }


  getDatosDepartamentos() {
    return this.ejecutarQuery<GeneralesRoot>('/api/datos/departamentos');
  }
  // tslint:disable-next-line: typedef
  getDatosDistribucion(id) {
    return this.ejecutarQuery<DatosDistribucion>('/api/Distribucion/Obtenerdatos/' + id);
  }
  // tslint:disable-next-line: typedef
  getPedidoActual(id) {
    return this.ejecutarQuery<PediRootObject>('/api/Pedidos/ObtenerPedido/' + id);
  }
  // tslint:disable-next-line: typedef
  getDespachos() {

    return this.ejecutarQuery<DespachoRootObject>('/api/Despacho/');
  }


  getDespachoActual() {
    return this.ejecutarQuery<DespachoResponseActual>('/api/despacho/actual/');
  }
  getTrazabilidad(id) {
    return this.ejecutarQuery<TopTrazabilidad>('/api/Distribucion/' + id);
  }

  // tslint:disable-next-line: typedef
  getBandejasCaja(id) {

    // this.json = JSON.stringify(id);
    // this.header = new HttpHeaders().set('Authorization', this.token);
    // return this.http.get('/api/Despacho/'  + id, { headers: this.header });

    return this.ejecutarQuery<BandejasCajaObject>('/api/CajasLotes/' + id);


  }
  // tslint:disable-next-line: typedef
  test() {
    return 'Hola Munndo Test';

  }

  registerUser(user): Observable<any> {
    this.json = JSON.stringify(user);
    console.log(this.json);

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



    return this.http.post(this.url + '/api/login', this.params, { headers: this.header });
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


  validaToken(): Promise<boolean> {

    if (this.getIdentity() == null || this.getToken() == null) {
      this.router.navigate(['surala/login']);

      Promise.resolve(false);
    }
    return new Promise(resolve => {

      if (this.getIdentity() == null || this.getToken() == null) {
        this.router.navigate(['surala/login']);
        resolve(false);
      } else {
        resolve(true);
      }
    })
  }


  getFincasUser($id = null): Observable<any> {
    console.log($id)
    if ($id === null || $id === 0) {
      return this.ejecutarQuery<FincaRootObject>('/api/usuarios/fincas');

    } else {
      return this.ejecutarQuery<FincaRootObject>('/api/usuarios/fincas/' + $id);

    }

  }

  getUrlImage(nameImage) {
    return this.url + '/api/user/avatar/' + this.getToken() + '/' + nameImage;
  }



  getUsuarios(): Observable<UsuariosFincasResponse> {
    return this.ejecutarQuery<UsuariosFincasResponse>('/api/users/get');
  }

 
 getFincasUsuarios(id): Observable<FincasResponse> {
    return this.ejecutarQuery<FincasResponse>('/api/users/fincasget/' + id);
  }
  updatePassUser(user): Observable<any> {

    this.json = JSON.stringify(user);
    console.log(this.json);
    this.params = 'json=' + this.json;
    return this.ejecutarQueryPost('/api/user/resetadmin', this.params);
  }

  updateFinca(finca){
    this.json = JSON.stringify(finca);
    console.log(this.json);
    this.params = 'json=' + this.json;
    return this.ejecutarQueryPost('/api/fincas/update', this.params);
  }

}






