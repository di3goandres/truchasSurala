import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad, CanActivate {
  constructor(public userService: UserService) {

  }
  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.isAdmin();
  }
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.isAdmin();
  }

  
}
