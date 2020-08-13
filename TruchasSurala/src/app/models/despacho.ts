export class Despacho {
  constructor(){
    this.fecha =""
  }
  id: number;
  fecha: string;
  numero_factura: string;
  Activo: number;
  porcentaje: number;
  numero_ovas: string;
  created_at: string;
  updated_at: string;
}

export interface Caja {
  id: number;
  id_despacho: number;
  fecha_desove: string;
  linea_genetica: string;
  edad_tcu: number;
  tamanio: number;
  numero_bandejas: number;
  ovas_ml: number;
  total_lote: number;
  numero_lote: string;
  tamanio_usado: number;
  created_at: string;
  updated_at: string;
}

export class Despachosroot {
  constructor(){
    this.despacho = new Despacho()
  }
  code: number;
  status: string;
  despacho: Despacho;
  cajas: Caja[];
}

export interface DespachoRootObject {
  code: number;
  status: string;
  despachos: Despacho[];
}

export class DespachoClass {
  constructor(

    public fecha: string,
    // tslint:disable-next-line: variable-name
    public numero_factura: string,
    // tslint:disable-next-line: variable-name
    public numero_ovas: string,


    public porcentaje: number,

    public repetir: number,

  ){}


}
