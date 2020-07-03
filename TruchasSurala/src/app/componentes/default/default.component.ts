import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  title: string;
  constructor() {
    this.title = 'Bienvenido a la pagina de Trucha Surala';
  }

  ngOnInit(): void {
  }

}
