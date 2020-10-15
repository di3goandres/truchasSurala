import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { LogoutService } from '../users/logout.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {


  loading: any;
  constructor(
    private Service: LogoutService,
     

  ) { 

    console.log('Interceptor')
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     this.Service.openModal();
   

  

    let token = localStorage.getItem('token');
    if (token != null)
      request = this.addToken(request, token)

 
 
    return next.handle(request)
      .pipe(
        
        tap(evt => {
         

          if (evt instanceof HttpResponse) {

            this.Service.cerrarModal();
          }
        

          // this.loading.onDidDismiss().then((dis) => {
          //   console.log('Loading dismissed! after 2 Seconds', dis);
          // });


        }),
        catchError(Error => {
          this.Service.cerrarModal();

          if (Error.status == 401) {
            this.Service.logout();
          }

          return throwError(Error)
        }));
  }
  private addToken(request: HttpRequest<any>, token: string) {
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return request.clone({
      headers,

    })

  }

}
