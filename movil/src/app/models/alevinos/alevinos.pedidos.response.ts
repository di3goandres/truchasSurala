// Generated by https://quicktype.io

export interface AlevinosPedidosResponse {
    code:    number;
    status:  string;
    pedidos: PedidoAlevinos[];
}

export interface PedidoAlevinos {
    id:              number;
    conductor:       number;
    NombreConductor: string;
    tipo:            string;
    es_talla:        boolean;
    es_peso:         boolean;
    cantidad:        number;
    id_despacho:     number;
    id_lote_numero:  number;
    talla:           number;
    peso:            number;
    semana:          number;
    dia:             string;
    despachado:      number;
    fechaProbable:   string;
    nombre:          string;
    municipio:       string;
    departamento:    string;
    direccion:       string;
}
