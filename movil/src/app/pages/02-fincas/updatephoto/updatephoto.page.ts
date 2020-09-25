import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatephoto',
  templateUrl: './updatephoto.page.html',
  styleUrls: ['./updatephoto.page.scss'],
})
export class UpdatephotoPage implements OnInit {

  idFinca : any;
  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idFinca = params.id;
       
      }
    );
  }
}
