import { Component, Input, OnInit } from '@angular/core';
import { Finca } from '../../../models/fincas.user';
import { Photo } from '../../../models/photos';
import { PhotoProvider } from '../../../services/photo-provider.service';

@Component({
  selector: 'app-unicafinca',
  templateUrl: './unicafinca.component.html',
  styleUrls: ['./unicafinca.component.scss'],
})
export class UnicafincaComponent implements OnInit {

  @Input() finca : Finca
  photo:Photo;
  constructor(
    public photoService: PhotoProvider,
  ) { }

  ngOnInit() {
    this.photoService.loadSaved(this.finca.id);

  

  }

}
