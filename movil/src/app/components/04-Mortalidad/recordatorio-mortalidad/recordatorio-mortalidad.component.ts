import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Politicas } from 'src/app/models/guias/guias';
import { GuiasService } from 'src/app/services/guias/guias.service';

@Component({
  selector: 'app-recordatorio-mortalidad',
  templateUrl: './recordatorio-mortalidad.component.html',
  styleUrls: ['./recordatorio-mortalidad.component.scss'],
})
export class RecordatorioMortalidadComponent implements OnInit {

  @Input() politicas: Politicas;
  descripciones: any[] = []
  constructor(
    
    public viewCtrl: ModalController,
    private guiasService: GuiasService,


  ) { }

  ngOnInit() {
    this.cargarRecordatorios()
  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'OK');
  }

  cargarRecordatorios() {
    console.log(this.descripciones)

    this.descripciones.push(...this.politicas.descripciones)


  }
 

  carcarPoliticass() {
    this.guiasService.getRecordatorio().subscribe(
      OK => {
        this.politicas = OK
        this.descripciones.push(...this.politicas.descripciones)
        console.log(this.descripciones)
      },
      ERROR => { console.log(ERROR) },
    )
  }

}
