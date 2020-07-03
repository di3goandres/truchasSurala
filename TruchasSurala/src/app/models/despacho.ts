export interface Despacho {
  id: number;
  fecha: string;
  numero_factura: string;
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
  created_at: string;
  updated_at: string;
}

export interface Despachosroot {
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
