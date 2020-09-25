import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy, HostListener } from '@angular/core';
import { Finca } from '../../../models/fincas.user';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';

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
  
    private changeDetectorRefs: ChangeDetectorRef,

  ) { }
  



  ngOnInit() {
    this.traerFincas();

    this.changeDetectorRefs.detectChanges();

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

        this.fincas.forEach(item => {
          item.imagen = this.userService.getURl() + "/api/fincas/avatar/" +item.id + '/' + item.imagen;
        })
        this.changeDetectorRefs.detectChanges()
      },
      error => {
        console.log(error)

      }
    )
    this.changeDetectorRefs.detectChanges();

  }
}
