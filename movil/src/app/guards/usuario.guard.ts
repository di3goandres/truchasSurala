import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad, CanActivate{
  constructor(public userService:UserService){

  }
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.validaToken();
  }
  canActivate():  boolean | Observable<boolean> | Promise<boolean>{
    return this.userService.validaToken();
  }

  
}
