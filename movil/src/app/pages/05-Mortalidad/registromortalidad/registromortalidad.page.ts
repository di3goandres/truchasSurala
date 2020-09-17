import { Component, OnInit } from '@angular/core';
import { Mortalidad, Preguntas } from '../../../models/mortalidad/mortalidad.request';

@Component({
  selector: 'app-registromortalidad',
  templateUrl: './registromortalidad.page.html',
  styleUrls: ['./registromortalidad.page.scss'],
})
export class RegistromortalidadPage implements OnInit {

  preguntas: Preguntas = new Preguntas();
  registro: Mortalidad = new Mortalidad();


  constructor() { }

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

    this.cargarPreguntas();
  }

}
