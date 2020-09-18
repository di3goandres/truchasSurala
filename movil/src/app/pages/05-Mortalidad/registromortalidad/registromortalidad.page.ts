import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Mortalidad, Preguntas } from '../../../models/mortalidad/mortalidad.request';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registromortalidad',
  templateUrl: './registromortalidad.page.html',
  styleUrls: ['./registromortalidad.page.scss'],
})
export class RegistromortalidadPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;

  preguntas: Preguntas = new Preguntas();
  registro: Mortalidad = new Mortalidad();
  formGroupTemperatura: FormGroup;
  formGroupTemperatura2: FormGroup;

  formValidar = 0;
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  cargarPregunta(value, select, type: string,  data?: any[]) {
    let pregunta = new Preguntas();
    pregunta.pregunta = value;
    pregunta.respuesta = '';
    pregunta.select = select;
    pregunta.type = type;

    if (select)
      pregunta.data = data;



    return pregunta;
  }
  cargarPreguntas() {
    this.preguntas.tipo_pregunta = 'INFORMACION DE LA SIEMBRA';

    this.preguntas.preguntas = []
   let rangoTemperatura : any[] = [9,10,11,12,13,14,15,16]
   let rangoTemperaturaAgua : any[] = [0,1,2,3,4,5,6]
   let metodo : any[] = ['MANUAL', 'BOMBA']
   let fuente : any[] = ['RIO', 'QUEBRADA', 'NACEDERO']
   let origen : any[] = ['PRIMER USO', 'REUSO']
   let USO : any[] = ['ABIERTO', 'CERRADO']



     
    this.preguntas.preguntas.push(this.cargarPregunta('°C de las ovas al llegar', true,'select', rangoTemperatura ))
    this.preguntas.preguntas.push(this.cargarPregunta('°C del agua de incubación', true, 'select',rangoTemperaturaAgua))
    this.preguntas.preguntas.push(this.cargarPregunta('Método de aclimatación', true, 'select', metodo))
    this.preguntas.preguntas.push(this.cargarPregunta('Fuente de Agua de Incubación', true, 'select', fuente))
    this.preguntas.preguntas.push(this.cargarPregunta('¿Origen del agua de incubación', true, 'select', origen))
    this.preguntas.preguntas.push(this.cargarPregunta('Uso del agua de Incubación', true, 'select', USO ))
    // this.preguntas.preguntas.push(this.cargarPregunta('Nivel de Oxígeno - agua de entrada y salida (ppm)', false, 'text', null))

  }
  ngOnInit() {
    this.formGroupTemperatura = new FormGroup({
      inferior: new FormControl('', Validators.required),
      mitad: new FormControl('', Validators.required),
      superior: new FormControl('', Validators.required),
      inferior2: new FormControl('', Validators.required),
      mitad2: new FormControl('', Validators.required),
      superior2: new FormControl('', Validators.required)

   });
  
    this.cargarPreguntas();
     
  }

  bloquear()
{
  // console.log('cargue')
  this.slides.lockSwipes(true);

}  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex()
    .then(
      (index)=>{
        console.log('Current index is', index);
        this.formValidar = index;
        return index;
     });
    //  console.log('Current index is', currentIndex);
   
 
  }

  next() {
    this.slideChanged()
    if(this.formValidar==0){
      if(this.formGroupTemperatura.valid)
      {
        console.log('Soy valido');
       this.slides.lockSwipes(false);

        this.slides.slideNext();
        this.slideChanged()
       this.slides.lockSwipes(true);



      }else{
        console.log('Soy invalido');

      }
    }
  }

  prev() {
    this.slides.lockSwipes(false);

    this.slides.slidePrev();

    this.slideChanged()
    this.slides.lockSwipes(true);


  }

}
