import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AlevinoGuard  implements CanLoad, CanActivate {
  constructor(public userService:UserService){
  }
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.isAlevinos();
  }

  canActivate():  boolean | Observable<boolean> | Promise<boolean>{
    return this.userService.isAlevinos();
  }
  
  
}
