import { Component, Input, OnInit } from '@angular/core';
import { PhotoProvider } from '../../../services/photo-provider.service';

@Component({
  selector: 'app-actualizarfotofinca',
  templateUrl: './actualizarfotofinca.component.html',
  styleUrls: ['./actualizarfotofinca.component.scss'],
})
export class ActualizarfotofincaComponent implements OnInit {
  @Input() idFinca: number;
  resultado = '';

  constructor(
    public photoService: PhotoProvider
  ) { }

  ngOnInit() {

   
  }

  enviarFoto() {
    this.photoService.postFileFinca(this.idFinca)
    
  }

}
