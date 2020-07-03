import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import {  DespachoRootObject, Despacho } from 'src/app/models/despacho';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  public respuesta: DespachoRootObject;
  public despachos: Despacho[]  = [];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDespachos().subscribe(resp => {
      // console.log('noticias', resp );
      this.respuesta = resp;
      console.log(this.respuesta);
      if (this.respuesta.status !== 'error') {

        this.despachos.push( ... this.respuesta.despachos)
        return;
      }


    });
  }
  // tslint:disable-next-line: typedef


}
