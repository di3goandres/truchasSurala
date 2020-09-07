import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy, HostListener } from '@angular/core';
import { Finca } from '../../../models/fincas.user';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listafincas',
  templateUrl: './listafincas.component.html',
  styleUrls: ['./listafincas.component.scss'],
})
export class ListafincasComponent implements OnInit, OnDestroy {
  @Input() fincas: Finca[] = []
  mySubscription: any;

  constructor(
    private userService: UserService,
  
    public _DomSanitizationService: DomSanitizer,
  
    private changeDetectorRefs: ChangeDetectorRef,

  ) { }
  
  @HostListener('unloaded')
  ngOnDestroy(): void {

    console.log('Items destroyed');
    if (this.mySubscription) {
       this.fincas = []

      this.mySubscription.unsubscribe();
    }
  }

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
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
