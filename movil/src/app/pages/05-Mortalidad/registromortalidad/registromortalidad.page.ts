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
   
       this.slides.lockSwipes(false);

        this.slides.slideNext();
        this.slideChanged()
       this.slides.lockSwipes(true);



      }else{
        console.log('Soy invalido y debo mostarr que lo soy');

      }
    }else{
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
}
