
export class ComplementoPedido {
    constructor(){
        this.peso_promedio = 0;
        this.talla_promedio = 0;

    }
    id_despacho:                     number;
    id_pedido:                       number;

    id_lote:                         number;
    id_conductor:                    number;
    lote_alevinos:                   string;


    referencia_alimento:             string;
    tratamientos_veterinarios:       string;
    duracion_tratamiento:            number;
    temperatura_cargue:              number;
    cantidad_alevinos:               number;
    peso_promedio:                   number;
    talla_promedio:                  number;
}