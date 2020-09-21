import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guiasmanejo',
  templateUrl: './guiasmanejo.page.html',
  styleUrls: ['./guiasmanejo.page.scss'],
})
export class GuiasmanejoPage implements OnInit {

  ocultar = ''
  constructor() { }

  ngOnInit() {
    this.ocultar = ''
    this.ocultar = 'animated fadeOut fast'
  }

}
