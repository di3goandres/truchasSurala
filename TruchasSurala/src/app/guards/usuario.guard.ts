import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {
  constructor(public userService:UserService){
  }
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.validaToken();
  }

}
