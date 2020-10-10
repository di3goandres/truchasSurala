import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService

  ) { }


  logout(){
   
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    // redireccion a la pagina principal.
    this.router.navigate(['/surala/login']);
  }

  openModal(){
    this.spinner.show();
  }
  cerrarModal(){
    this.spinner.hide();

  }
  
}
