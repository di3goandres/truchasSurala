import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private router: Router,

  ) { }


  logout(){
    console.log('entrelog')
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    // redireccion a la pagina principal.
    this.router.navigate(['/surala/login']);
  }
}
