import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { TrazabilidadResponse, Distribucion } from '../../../models/trazabilidad/trazabilidad.response';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-trazabilidades',
  templateUrl: './trazabilidades.page.html',
  styleUrls: ['./trazabilidades.page.scss'],
})
export class TrazabilidadesPage implements OnInit {
  noMostrar= true;
  id: string;
  traza: TrazabilidadResponse;
  distribucion: Distribucion[];
  mostrar: boolean;
  // constructor(

  //   private userService: UserService,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private cdRef: ChangeDetectorRef,
  //   private modalService: NgbModal

  // ) { }
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;

  constructor(
    private service: PedidosService,
    private route: ActivatedRoute,
    ) { }
    slideOpts = {
      initialSlide: 0,
      speed: 400
    };
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.mostrar=false;
    this.distribucion = [];

    this.CargarInicial();
   
    
  }
  async update(){
    await this.slides.update();

  }
 async CargarInicial()
  {
    await this.service.obtenerTrazabilidad(this.id ).subscribe(
       response => {

        
          if(response.status=="success"){
            this.traza= response;
            this.distribucion = this.traza.distribucion;
            this.noMostrar = false
           
            this.update();

          }
      
      },
      error => {
        console.log(error)

      }
    )
  }

}
