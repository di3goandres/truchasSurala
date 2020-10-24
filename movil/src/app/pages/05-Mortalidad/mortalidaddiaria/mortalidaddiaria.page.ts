import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Diario } from '../../../models/mortalidad/mortalidad.diario.response';
import { Pedido } from '../../../models/pedidos/pedidos.response';
import { DiarioRequest } from '../../../models/mortalidad/mortalidad.diario.request';
import { IonContent, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-mortalidaddiaria',
  templateUrl: './mortalidaddiaria.page.html',
  styleUrls: ['./mortalidaddiaria.page.scss'],
})
export class MortalidaddiariaPage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('slides') slides: IonSlides;


  reporteDias: Diario[] = []
  pedido: Pedido;
  Maximo = 0;
  request = new DiarioRequest();
  Guardo = true;
  recomendaciones: any[] = [
    'Tendras habilitados 12 dias, para ingresar la mortalidad diaria de tu incubacion.',
    'Podras registrar la mortalidad dia tras dia, o en el dia 12',
    'Una vez registrada y guardada la mortalida de un dia, ya no podra editarla'
  ]
  bloqueado = false;
  SinReportar = false;

  slideOpts = {
    initialSlide: 0,
    speed: 500,
  }
  idMortaliadad = 0;
  constructor(
    private route: ActivatedRoute,
    private servicio: PedidosService,


  ) { }

  ngOnInit() {

    this.cargar();
    this.Informacion()
  }

  calcularSuma() {
    let sum = 0
    this.reporteDias.forEach(dato => {
      sum = sum + dato.cantidad
    }

    )

    if (sum > this.Maximo) {
      this.bloqueado = true;

    } if (sum == this.Maximo) {
      this.SinReportar = true;

    } else {
      this.bloqueado = false;

    }
  }
  onBlur(item) {
    let inicial = item.cantidad;
    if (item.cantidad == "") {
      item.cantidad = 0;
    } else {
      item.cantidad = parseInt(item.cantidad)
    }

    this.calcularSuma();



  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idMortaliadad = params.id;

      }
    );
  }

  async Informacion() {

    await this.servicio.getReporteDiario(this.idMortaliadad).subscribe(
      OK => {
        console.log(OK)
        this.reporteDias = [];
        this.reporteDias.push(...OK.diario)
        this.pedido = new Pedido();
        this.pedido = OK.pedido
        this.Maximo = this.pedido.total
        this.calcularSuma()

      },
      ERROR => { console.log(ERROR) },
    )
  }

  doRefresh(event) {
    this.cargar()
  }

  onGuardar() {

    this.calcularSuma()
    if (!this.bloqueado) {





      this.request.diario = [];
      this.request.diario.push(...this.reporteDias);

      this.servicio.updateReportDiario(this.request).subscribe(
        OK => {
          this.Informacion()
          this.Guardo = true;
        },
        ERROR => { console.log(ERROR) },
      )
    }
  }



  slideChanged() {
    this.ionContent.scrollToTop(500)
  }
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  Reset(){
    this.Guardo=false;

    this.slides.slideTo(1);
  }
}
