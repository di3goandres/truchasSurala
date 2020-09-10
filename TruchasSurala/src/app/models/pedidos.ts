
export interface Despacho {
  id: number;
  fecha: string;
  fecha_salida: string;

  numero_factura: string;
  Activo: number;
  porcentaje: number;
  numero_ovas: string;
  created_at: string;
  updated_at: string;
}

export class Pedido {
  constructor(){}
  id: number;
  id_despacho: number;
  id_finca: number;
  pedido: number;
  porcentaje: number;
  adicional: number;
  reposicion: number;
  total: number;
  created_at: string;
  updated_at: string;
  nombre: string;
  usuario: string;
 
  finca: string;
  nombre_factura: string;

  despacho: Despacho;
  genero_trazabilidad: boolean;
}

export interface PedidosRootObject {
  code: number;
  status: string;
  pedido: Pedido[];
}


export class PedidoClass {
  constructor(
    idDespacho: number,
    porcentaje: number


  ) { 

    this.id_despacho = idDespacho, 
    this.porcentaje = porcentaje
    this.pedido = 0;
    this.adicional = 0;
    this.reposicion = 0;
    this.total = 0;
  }
      // tslint:disable-next-line: variable-name
      public id_despacho: number;
      // tslint:disable-next-line: variable-name
      public id_finca: number;
      public pedido: number;
      public porcentaje: number;
      public adicional: number;
      public reposicion: number;
      public total: number;

}
