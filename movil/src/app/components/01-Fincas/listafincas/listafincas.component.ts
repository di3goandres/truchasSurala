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
  


  ionViewDidEnter(){
    console.log('entre ionViewDidEnter');
    // this.traerFincas();
    this.traerFincas();



  }

  ngOnInit() {
    this.traerFincas();

    this.changeDetectorRefs.detectChanges();

  }
  doRefresh(event) {
    this.traerFincas()
  

    setTimeout(() => {
  
      event.target.complete();
    }, 1000);
  }

  traerFincas() {
    this.userService.getFincasUsuario().subscribe(
      response => {
        console.log(response)
        this.fincas = [];
        this.fincas.push(...response.fincas);
        this.changeDetectorRefs.detectChanges()
      },
      error => {
        console.log(error)

      }
    )
    this.changeDetectorRefs.detectChanges();

  }
}
