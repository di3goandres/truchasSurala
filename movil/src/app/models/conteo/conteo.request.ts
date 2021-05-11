import { ConteoTrazabilidad } from "./conteo.trazabilida";

export class ConteoRequest {

    id_pedido:              number;
    id_metodo:              number;
    NumeroConteoRealizado:  number;
    ConteoTrazabilidad:     ConteoTrazabilidad[];

}