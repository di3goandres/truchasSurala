// Generated by https://quicktype.io

export interface DistribucionResponse {
    code:         number;
    status:       string;
    distribucion: DistribucionR[];
}

export interface DistribucionR {
    contacto:     Contacto;
    trazabilidad: Trazabilidad[];
    InfoDespacho: InfoDespacho[];
}

export interface InfoDespacho {
    Cantidad:       number;
    caja_numero:    number;
    bandeja_numero: number;
    ovas_ml:        number;
}

export interface Contacto {
    Remision:      string;
    FechaEntrega:  string;
    Cliente:       string;
    Destino:       number;
    Finca:         string;
    Facturado:     number;
    Adicionales:   number;
    Reposicion:    number;
    Total:         number;
    Total_enviado: number;
    Maximo:        number;
}

export interface Trazabilidad {
    NumLote:       string;
    Fechadesove:   string;
    LineaGenetica: string;
    edad:          number;
    tamanio:       number;
    ovas_ml:       number;
}


export class MostrarDistribucion{
    constructor(
        public item: number,
        public  cantidad: number,
        public  numeroCaja: number,
        public  bandeja_numero:number[],
    ){
     
    }
   

}

export class MostrarDistribucionTotal{
    constructor(
        public  item: number,
        public  cantidad: number,
        public  numeroCaja: number,
        public  bandeja_numero:number,
    ){
     
    }
   

}


export class InfoR {
    constructor(
        public Cantidad:       number,
        public caja_numero:    number,
        public bandeja_numero: number,    
        public oval_ml: number,
        public childrend?: InfoR[],
    ){
    }
    public position: number;
    public Nombre: string;
    public Finca: string;


   
}