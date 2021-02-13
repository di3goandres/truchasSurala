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


    /** DATOS DE CONSULTA */

    nombre:            string;
    municipio:         string;
    departamento:      string;
    direccion:         string;

}
export class AlevinosPedidosRequest{
    idUserFinca:    number;
    alevinosPedidos: AlevinosPedidos[]
}

export class A_DiaDespachoRequest{
    fecha_salida: Date;
}

export class AlevinosPedidosResponse{
  code:    number;
  alevinosPedidos: AlevinosPedidos[];
  despachados: AlevinosPedidos[];
}




