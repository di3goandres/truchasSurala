// Generated by https://quicktype.io
// Generated by https://quicktype.io

export interface PedidosResponse {
    code:    number;
    status:  string;
    pedidos: Pedido[];
}

export interface Pedido {
    id:             number;
    pedido:         number;
    porcentaje:     number;
    adicional:      number;
    reposicion:     number;
    total:          number;
    nombre_factura: string;
    fecha_salida:   string;
    nombre:         string;
    municipio:      string;
    departamento:   string;
}