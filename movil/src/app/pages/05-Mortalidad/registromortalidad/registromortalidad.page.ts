import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonSlides, ModalController, ToastController } from '@ionic/angular';
import { Mortalidad, Preguntas } from '../../../models/mortalidad/mortalidad.request';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PoliticasmortalidadComponent } from '../../../components/04-Mortalidad/politicasmortalidad/politicasmortalidad.component';
import { GuiasService } from 'src/app/services/guias/guias.service';
import { Politicas } from '../../../models/guias/guias';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { Pedido } from '../../../models/pedidos/pedidos.response';



@Component({
  selector: 'app-registromortalidad',
  templateUrl: './registromortalidad.page.html',
  styleUrls: ['./registromortalidad.page.scss'],
})
export class RegistromortalidadPage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;
  idPedido = 0;
  pedido: Pedido;
  minDate: any;
  maxDate: any;
  Temperatura: any[] = [9, 10, 11, 12, 13, 14, 15, 16]
  HORAS: any[] = [1, 2, 3, 4, 5, 6, 9]
  MINUTOS: any[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  Months = "Enero, Febrero, Marzo, Abril,Mayo, Junio, Julio, Agosto, Septiembre,Octubre,Noviembre,Diciembre";
  ShortMonths: "Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sept,Oct,Nov,Dic"
  customPickerOptions: any;
  rangoPorcentaje: any[] = ['0-10%', '11-20%', '21-30%',
    '31-40%', '41-50%', '51-60%',
    '61-70%', '71-80%', '81-90%',
    '91-100%']


  metodo: any[] = ['MANUAL', 'BOMBA']
  fuente: any[] = ['RIO', 'QUEBRADA', 'NACEDERO']
  origen: any[] = ['PRIMER USO', 'REUSO']
  USO: any[] = ['ABIERTO', 'CERRADO']
  METODOCONTEO: any[] = ['VON BAYER', 'PALETA OVACONT', 'OTRO']

  acepta = false;

  @ViewChild('slides') slides: IonSlides;
  politicas: Politicas;

  preguntas: Preguntas = new Preguntas();
  registro: Mortalidad = new Mortalidad();
  formGroupTemperatura: FormGroup;
  formGroupTemperatura2: FormGroup;
  formGroupSiembra: FormGroup;
  formGroupFechas: FormGroup;
  formGroupAdicionales: FormGroup;


  formValidar = 0;
  constructor(

    public modalController: ModalController,
    private guiasService: GuiasService,
    private datePicker: DatePicker,
    public toastController: ToastController,
    private route: ActivatedRoute,
    private servicio: PedidosService,



  ) { }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idPedido = params.id;

      }
    );
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  cargarPoliticas() {
    this.guiasService.getPoliticas().subscribe(
      OK => {
        this.politicas = OK
      },
      ERROR => { console.log(ERROR) },
    )
  }
  cargarPregunta(value, select, type: string, data?: any[]) {
    let pregunta = new Preguntas();
    pregunta.pregunta = value;
    pregunta.respuesta = '';
    pregunta.select = select;
    pregunta.type = type;

    if (select)
      pregunta.data = data;



    return pregunta;
  }


  moveFocus(actual, nextElement) {

    let regExp = new RegExp('^[0-9]*$');
    let newValue = actual.value;
    console.log(regExp.test(newValue))
    if (!regExp.test(newValue)) {
      actual.value = newValue.slice(0, -1);
    } else
      if (actual.value.length == 2) {
        nextElement.setFocus();

      }
  }
  moveFocus_3(actual, nextElement) {

    let regExp = new RegExp('^[0-9]*$');
    let newValue = actual.value;
    if (!regExp.test(newValue)) {
      actual.value = newValue.slice(0, -1);
    } else
      if (actual.value.length == 3) {
        nextElement.setFocus();

      }
  }
  cargarPreguntas() {
    this.preguntas.tipo_pregunta = 'INFORMACION DE LA SIEMBRA';

    this.preguntas.preguntas = []
    let rangoTemperatura: any[] = [9, 10, 11, 12, 13, 14, 15, 16]
    let rangoTemperaturaAgua: any[] = [0, 1, 2, 3, 4, 5, 6]
    let metodo: any[] = ['MANUAL', 'BOMBA']
    let fuente: any[] = ['RIO', 'QUEBRADA', 'NACEDERO']
    let origen: any[] = ['PRIMER USO', 'REUSO']
    let USO: any[] = ['ABIERTO', 'CERRADO']




    this.preguntas.preguntas.push(this.cargarPregunta('°C de las ovas al llegar', true, 'select', rangoTemperatura))
    this.preguntas.preguntas.push(this.cargarPregunta('°C del agua de incubación', true, 'select', rangoTemperaturaAgua))
    this.preguntas.preguntas.push(this.cargarPregunta('Método de aclimatación', true, 'select', metodo))
    this.preguntas.preguntas.push(this.cargarPregunta('Fuente de Agua de Incubación', true, 'select', fuente))
    this.preguntas.preguntas.push(this.cargarPregunta('¿Origen del agua de incubación', true, 'select', origen))
    this.preguntas.preguntas.push(this.cargarPregunta('Uso del agua de Incubación', true, 'select', USO))
    // this.preguntas.preguntas.push(this.cargarPregunta('Nivel de Oxígeno - agua de entrada y salida (ppm)', false, 'text', null))

  }


  bloquear() {
    // console.log('cargue')
    this.slides.lockSwipes(true);


  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex()
      .then(
        (index) => {
          console.log('Current index is', index);
          this.formValidar = index;
          return index;
        });
    //  console.log('Current index is', currentIndex);


  }

  next() {
    this.slideChanged()
    if (this.formValidar == 1) {
      if (this.formGroupTemperatura.valid) {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slideChanged()
        this.ionContent.scrollToTop(600)
        this.slides.lockSwipes(true);
      } else {
        console.log('Soy invalido y debo mostarr que lo soy');
      }
    } else {
      this.slides.lockSwipes(false);
      this.ionContent.scrollToTop(600)
      this.slides.slideNext();
      this.slideChanged()
      this.slides.lockSwipes(true);
    }
  }

  prev() {
    this.slides.lockSwipes(false);

    this.slides.slidePrev();
    this.ionContent.scrollToTop(600)
    this.slideChanged()
    this.slides.lockSwipes(true);


  }

  // slideOpts = {
  //   initialSlide: 0,
  //   speed: 400,
  //   // on: {
  //   //   beforeInit: function () {
   
  //   //     const overwriteParams = {
  //   //       slidesPerView: 1,
        
  //   //       centeredSlides: false,
  
  //   //     };

  //   //     this.params = Object.assign(this.params, overwriteParams);
  //   //     this.originalParams = Object.assign(this.originalParams, overwriteParams);
  //   //   },
  //   // }
  
  // }
  slideOpts = {
  on: {
    beforeInit() {
      const swiper = this;
      swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      swiper.params = Object.assign(swiper.params, overwriteParams);
      swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
    },
    setTranslate() {
      const swiper = this;
      const { $, slides, rtlTranslate: rtl } = swiper;
      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        let progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        const offset$$1 = $slideEl[0].swiperSlideOffset;
        const rotate = -180 * progress;
        let rotateY = rotate;
        let rotateX = 0;
        let tx = -offset$$1;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

         $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

         if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
        $slideEl
          .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      }
    },
    setTransition(duration) {
      const swiper = this;
      const { slides, activeIndex, $wrapperEl } = swiper;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;

          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  }
};

    async VerPoliticas() {


      const modal = await this.modalController.create({
        component: PoliticasmortalidadComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          'politicas': this.politicas
        }
      });

      modal.onDidDismiss()
        .then((data) => {
          console.log(data.role);
          if (data.role == "OK")
            this.AceptoPoliticas();
        });
      // const { data } = await modal.onWillDismiss();

      return await modal.present();

    }
  myDateNTime: Date;
    Calendario() {

      let time = new Date()
      this.datePicker.show({
        date: new Date(),
        minDate: time.setDate(time.getDate() - 3),
        maxDate: time.setDate(time.getDate() + 2),
        titleText: "Llegada de Ovas a la Finca",
        mode: 'datetime',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
        date => {
          console.log('Got date: ', date)
          this.myDateNTime = date// date.getDate()+"/"+date.toLocaleString('default', { month: 'long' })+"/"+date.getFullYear();
        },
        err => console.log('Error occurred while getting date: ', err)
      );

    }

  AceptoPoliticas() {
      this.acepta = true;
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slideChanged()
      this.slides.lockSwipes(true);
    }

  Guardar() {
      console.log("Datos", this.registro)
    }

  traerPedido() {
      this.servicio.obtenerPedidoMoralidad(this.idPedido).subscribe(
        OK => {
          console.log(OK)
          this.pedido = new Pedido();
          this.pedido = OK.pedidos[0];
          this.minDate = this.pedido.fecha_salida
          this.maxDate = this.pedido.fecha_maxima
        },
        ERROR => { console.log(ERROR) },
      )
    }
  ngOnInit() {

      this.cargar()
      this.traerPedido();

      this.cargarPoliticas();
      this.formGroupTemperatura = new FormGroup({
        inferior: new FormControl('', [Validators.min(0), Validators.max(40)]),
        mitad: new FormControl('', [Validators.min(0), Validators.max(40)]),
        superior: new FormControl('', [Validators.min(0), Validators.max(40)]),
        // inferior2: new FormControl('', [Validators.min(0), Validators.max(40)]),

        inferior2: new FormControl('', Validators.required),
        mitad2: new FormControl('', Validators.required),
        superior2: new FormControl('', Validators.required),
        transporte: new FormControl('', Validators.required),
        demora_llegada: new FormControl('', Validators.required),
        danio_cajas: new FormControl('', Validators.required),



      });

      this.formGroupSiembra = new FormGroup({
        temLlegada: new FormControl('', Validators.required),
        temLlegadaAgua: new FormControl('', Validators.required),
        metAclimatacion: new FormControl('', Validators.required),
        FuenteAgua: new FormControl('', Validators.required),
        OrigenAgua: new FormControl('', Validators.required),
        UsoAgua: new FormControl('', Validators.required),
        NivelOxigeno: new FormControl('', Validators.required),
        Horas: new FormControl('', Validators.required),
        Min: new FormControl('', Validators.required),



      })

      this.formGroupFechas = new FormGroup({
        llegada_ovas: new FormControl('', Validators.required),
        llegada_ovas_finca: new FormControl('', Validators.required),
        apertura_cajas: new FormControl('', Validators.required),
        inicio_hidratacion: new FormControl('', Validators.required),
        inicio_siembra: new FormControl('', Validators.required),
        finalizacion_siembra: new FormControl('', Validators.required),
        inicio_eclosion: new FormControl('', Validators.required),
        fin_eclosion: new FormControl('', Validators.required),
        fecha_inicioProblema: new FormControl('', Validators.required),
      })

      this.formGroupAdicionales = new FormGroup({
        cambioGranja: new FormControl('', Validators.required),
        distintas: new FormControl('', Validators.required),
        similar: new FormControl('', Validators.required),



      })

      this.cargarPreguntas();

    }
  }
