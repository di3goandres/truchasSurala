import { Component, OnInit, ChangeDetectorRef, AfterContentInit, OnDestroy, HostListener, AfterViewInit, DoCheck } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DatamenuService } from '../../../services/datamenu.service';
import { UserService } from '../../../services/user.service';
import { Finca } from '../../../models/fincas.user';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoProvider } from '../../../services/photo-provider.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit, AfterContentInit, OnDestroy, AfterViewInit , DoCheck{
  fileToUpload: File = null;
  url: any;

  activar: boolean;
  mySubscription: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  fincas: Finca[] = []

  constructor(private dataService: DatamenuService,
    private userService: UserService,
    private menuCtrl: MenuController,
    public _DomSanitizationService: DomSanitizer,
    public navCtrl: NavController, public photoService: PhotoProvider,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router, private activatedRoute: ActivatedRoute

  ) {


    setInterval(() => {
      this.changeDetectorRefs.detectChanges();
     }, 5000);
 

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    }); 
  }
  ngDoCheck(): void {
     this.userService.getToken();
  }
  ngAfterViewInit(): void {
    // this.traerFincas();

    this.changeDetectorRefs.detectChanges();


  }
  @HostListener('unloaded')
  ngOnDestroy(): void {
  
    console.log('Items destroyed');
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  ngAfterContentInit(): void {
    // this.traerFincas();

    this.changeDetectorRefs.detectChanges();

  }



  ngOnInit() {

    this.traerFincas();
   
    this.changeDetectorRefs.detectChanges();

  }
 
  
  toggleMenu() {
    console.log(this.menuCtrl.getMenus())
    this.menuCtrl.toggle();
  }

  cambiarMenu() {

    this.menuCtrl.enable(this.activar, 'authenticated');
    this.menuCtrl.enable(!this.activar, 'unauthenticated');
   
    this.activar = !this.activar;


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
