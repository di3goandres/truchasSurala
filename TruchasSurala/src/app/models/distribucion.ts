export interface Distribucion {
  id: number;
  id_lote: number;
  id_pedido: number;
  id_finca: number;
  remision: string;
  ovas_facturadas: number;
  ovas_adicionales: number;
  ovas_reposicion: number;
  total_ovas_enviadas: number;
  nombre_reclama: string;
  tipo_identificacion_reclama?: any;
  numero_identificacion_reclama?: any;
  telefono_reclama?: any;
  descripcion_adicionales?: any;
  created_at: string;
  updated_at: string;
}

export interface DistribucionRootObject {
  code: number;
  status: string;
  distribucion: Distribucion[];
}


export class DistribucionClass {
  constructor(
    // tslint:disable-next-line: variable-name
    public id_lote: number,
    // tslint:disable-next-line: variable-name
    public id_pedido: number,
    // tslint:disable-next-line: variable-name
    public id_finca: number,
    // tslint:disable-next-line: variable-name
    public remision: string,
    // tslint:disable-next-line: variable-name
    public ovas_facturadas: number,
    // tslint:disable-next-line: variable-name
    public ovas_adicionales: number,
    // tslint:disable-next-line: variable-name
    public ovas_reposicion: number,
    // tslint:disable-next-line: variable-name
    public total_ovas_enviadas: number,
    // tslint:disable-next-line: variable-name
    public nombre_reclama: string,
    // tslint:disable-next-line: variable-name
    public tipo_identificacion_reclama?: any,
    // tslint:disable-next-line: variable-name
    public numero_identificacion_reclama?: any,
    // tslint:disable-next-line: variable-name
    public telefono_reclama?: any,
    // tslint:disable-next-line: variable-name
    public descripcion_adicionales?: any,

  ) { }
}
