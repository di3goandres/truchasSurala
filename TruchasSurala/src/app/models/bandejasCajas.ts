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

export interface Bandeja {
  id: number;
  id_lote: number;
  tamanio_inicial: number;
  tamanio_final: number;
  created_at?: any;
  updated_at?: any;
}

export interface BandejasCajaObject {
  code: number;
  status: string;
  cajas: Caja;
  bandejas: Bandeja[];
}
