// Generated by https://quicktype.io

export class TopTrazabilidad {
    code:         number;
    status:       string;
    distribucion: DistribucionTrazabilidad[];
}

export class DistribucionTrazabilidad {
    contacto:     Contacto;
    trazabilidad: Trazabilidad[];
    InfoDespacho: InfoDespacho[];
}

export class InfoDespacho {
    Cantidad:       number;
    caja_numero:    number;
    bandeja_numero: number;
}

export class Contacto {
    FechaEntrega: string;
    Cliente:      string;
    Destino:      number;
    Finca:        string;
    Remision:     string;
    Facturado:    number;
    Adicionales:  number;
    Reposicion:   number;
    Total:        number;
    Total_enviado:number;
    Maximo:       number;
}

export class Trazabilidad {
    NumLote:       string;
    Fechadesove:   string;
    LineaGenetica: string;
    edad:          number;
    tamanio:       number;
    ovas_ml:       number;

}


export class InfoDespachoMostrar {
    constructor(cantidad, cajanumero, bandeja){
        this.Cantidad = cantidad;
        this.caja_numero = cajanumero;
        this.bandeja_numero = bandeja;

    }
    Cantidad:       string;
    caja_numero:    string;
    bandeja_numero: string;
}