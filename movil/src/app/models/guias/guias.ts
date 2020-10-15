import { Descripcion } from '../productos/medicamentos/medicamentos';
export class Guias{
    nombre: string;
    descripcion: string;
    icon: string;
    slides: SlidesGuias[]

}

export class SlidesGuias{
   
    titulo: string;
    descripciones: string[]
    imagen: string;

}


export class Politicas{
    descripciones: string[]
}