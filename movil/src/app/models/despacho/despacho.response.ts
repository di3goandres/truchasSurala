// Generated by https://quicktype.io

export interface DespachoResponse {
    code:      number;
    status:    string;
    despachos: Despacho[];
}

export interface Despacho {
    id:           number;
    fecha_salida: string;
    certificado:  string;

}
