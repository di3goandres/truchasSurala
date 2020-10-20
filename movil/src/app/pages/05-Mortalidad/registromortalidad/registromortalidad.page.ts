import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
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
        this.slides.lockSwipes(true);
      } else {
        console.log('Soy invalido y debo mostarr que lo soy');
      }
    } else {
      this.slides.lockSwipes(false);

      this.slides.slideNext();
      this.slideChanged()
      this.slides.lockSwipes(true);
    }
  }

  prev() {
    this.slides.lockSwipes(false);

    this.slides.slidePrev();

    this.slideChanged()
    this.slides.lockSwipes(true);


  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
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
        console.log(data);
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
      OK => { console.log(OK)
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

    this.cargarPreguntas();

  }
}
