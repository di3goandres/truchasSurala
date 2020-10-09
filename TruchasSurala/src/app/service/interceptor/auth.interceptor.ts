import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../../../../../movil/src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { LogoutService } from '../user/logout.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private Service: LogoutService
  ) {
    console.log('authService in AuthInterceptor');
  }



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // return next.handle(request)

    let token = localStorage.getItem('token');
    if (token != null)
       request = this.addToken(request, token)

    return next.handle(request)
      .pipe(catchError(Error => {
    
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
      headers   
    })

  }
}
