export class AlevinosPedidos{
    constructor(){
        this.cantidad=200;
        this.talla = 0;
        this.peso = 0;
    }
    idUserFinca:    number;
    tipo:           string;
    cantidad:       number;
    talla:          number;
    peso:           number;
    fechaProbable:    Date;
    fechaProbableS:   string;

    /**
     * datos solo para mostrar en el front
     */
    semana:         number;
    dia:            string;
    repeticiones:   number;
    periodicidad:   string;



}


