import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy, HostListener } from '@angular/core';
import { Finca } from '../../../models/fincas.user';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';
import { PhotoProvider } from '../../../services/photo-provider.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-listafincas',
  templateUrl: './listafincas.component.html',
  styleUrls: ['./listafincas.component.scss'],
})
export class ListafincasComponent implements OnInit {
  @Input() fincas: Finca[] = []
  mySubscription: any;

  constructor(
    private userService: UserService,
  
    public _DomSanitizationService: DomSanitizer,
    private storage: Storage,
  
  
    private changeDetectorRefs: ChangeDetectorRef,

  ) { }
  

  guardarFincas() {
    this.storage.set('fincas', this.fincas)

  }


  async recargarFincas(){
    // this.fincas  = this.storage.get('fincas' )
    this.fincas = await this.storage.get('fincas') || []


  }

  ngOnInit() {
    this.recargarFincas();
    if(this.fincas.length == 0){
      this.traerFincas();

    }

    

  }
  doRefresh(event) {
    this.traerFincas()
  

    setTimeout(() => {
  
      event.target.complete();
    }, 500);
  }

  traerFincas() {
    this.userService.getFincasUsuario().subscribe(
      response => {
       
        this.fincas = [];
        this.fincas.push(...response.fincas);
        this.guardarFincas();
        this.fincas.forEach(item => {
          item.imagen = this.userService.getURl() + "/api/fincas/avatar/" +item.id + '/' + item.imagen;
        })
        // this.changeDetectorRefs.detectChanges()
      },
      error => {
        this.recargarFincas();
        console.log(error)

      }
    )
  

  }
}
