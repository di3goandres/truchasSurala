import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';
import { LogoutService } from '../user/logout.service';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private Service: LogoutService,

  ) {

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
        }),
        catchError(Error => {
          if (Error.status == 401) {
            this.Service.logout();
          }
          this.Service.cerrarModal();

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
