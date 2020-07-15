export interface CajaDistribucion {
  id: number;
  id_despacho: number;
  fecha_desove: string;
  caja_numero: number;
  linea_genetica: string;
  edad_tcu: number;
  tamanio: number;
  numero_bandejas: number;
  ovas_ml: number;
  total_lote: number;
  tamanio_usado: number;
  habilitado: boolean;
}

export interface Grupocaja {
  name: string;
  cajas: CajaDistribucion[];
}

export interface BandejaDistribucion {
  id: number;
  id_lote: number;
  tamanio_inicial: number;
  tamanio_final: number;
  numero_bandeja: number;

  lineaGenetica: string;
}

export interface DatosDistribucion {
  code: number;
  status: string;
  grupocajas: Grupocaja[];
  bandejas: BandejaDistribucion[];
}
