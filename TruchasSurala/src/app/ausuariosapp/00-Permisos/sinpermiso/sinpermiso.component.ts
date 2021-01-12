import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sinpermiso',
  templateUrl: './sinpermiso.component.html',
  styleUrls: ['./sinpermiso.component.css']
})
export class SinpermisoComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  IrAlHome(){
    this.router.navigate(['Home']);
  }

}
