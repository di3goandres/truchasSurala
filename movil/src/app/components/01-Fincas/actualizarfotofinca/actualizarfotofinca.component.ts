import { Component, OnInit } from '@angular/core';
import { PhotoProvider } from '../../../services/photo-provider.service';

@Component({
  selector: 'app-actualizarfotofinca',
  templateUrl: './actualizarfotofinca.component.html',
  styleUrls: ['./actualizarfotofinca.component.scss'],
})
export class ActualizarfotofincaComponent implements OnInit {

  constructor(
    public photoService: PhotoProvider,
  ) { }

  ngOnInit() {}

}
